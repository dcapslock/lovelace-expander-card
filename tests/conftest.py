"""Expander-card-specific pytest configuration.

Sets environment-variable defaults consumed by the ``ha_testcontainer``
pytest plugin so that tests run against a properly configured Home Assistant
instance with the expander card loaded.

All session-scoped HA container fixtures (``ha``, ``ha_url``, ``ha_token``,
``ha_lovelace_url_path``, ``ha_browser_context``, ``ha_page``) are provided
automatically by ``ha_testcontainer.pytest_plugin``, which is registered via
the ``pytest11`` entry-point and requires no explicit import.

Environment variables
---------------------
HA_VERSION
    Docker image tag to use.  Defaults to ``stable``.
    Set to ``beta``, ``dev``, or a pinned version such as ``2024.6.0``.
HA_URL
    Base URL of a **pre-running** Home Assistant instance (e.g.
    ``http://localhost:12345``).  When set together with ``HA_TOKEN``, the
    test session connects to that instance instead of starting a new Docker
    container — eliminating the boot-time overhead for fast iterative work.
    Start a persistent instance with ``make ha_up``.
HA_TOKEN
    Long-lived access token for the pre-running HA instance.  Required when
    ``HA_URL`` is set.
HA_PLUGINS_YAML
    Path to an alternative ``plugins.yaml``.  Defaults to
    ``tests/plugins.yaml``.
"""

from __future__ import annotations

import os
import shutil
import warnings
from pathlib import Path

import pytest
import yaml

# ---------------------------------------------------------------------------
# Expander-card-specific env-var defaults — consumed by ha_testcontainer
# ---------------------------------------------------------------------------
# Set at module import time so they are visible to the session-scoped ``ha``
# fixture before it runs.  os.environ.setdefault() leaves any externally-set
# value (e.g. from ``source .ha_env``) unchanged.

_REPO_ROOT = Path(__file__).parent.parent

os.environ.setdefault("HA_CONFIG_PATH", str(_REPO_ROOT / "tests" / "ha-config"))
os.environ.setdefault("HA_PLUGINS_YAML", str(_REPO_ROOT / "tests" / "plugins.yaml"))

# ---------------------------------------------------------------------------
# Copy the locally-built expander-card.js into the HA config www/ directory
# so the test container can serve it at /local/expander-card.js.
#
# The built file is produced by ``pnpm run build`` and lives at
# ``dist/expander-card.js``.  It is not committed to git; run the build step
# before running the tests.
# ---------------------------------------------------------------------------

_DIST_JS = _REPO_ROOT / "dist" / "expander-card.js"
_WWW_DIR = _REPO_ROOT / "tests" / "ha-config" / "www"
_WWW_JS = _WWW_DIR / "expander-card.js"

if _DIST_JS.exists():
    _WWW_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copy2(_DIST_JS, _WWW_JS)
else:
    warnings.warn(
        f"Built card file not found at {_DIST_JS}. "
        "Run 'pnpm run build' before running the tests. "
        "Visual tests will fail because the card cannot be loaded.",
        stacklevel=1,
    )


# ---------------------------------------------------------------------------
# Register Lovelace resources after the HA container starts.
#
# Because configuration.yaml uses ``lovelace: mode: storage`` (not
# ``resource_mode: yaml``), resources cannot be declared in a static YAML
# file.  Instead, they are registered once per session via the HA WebSocket
# ``lovelace/resources/create`` command after the container is up.
#
# This keeps plugins.yaml as the single source of truth for ALL third-party
# plugins: ha_testcontainer's ``ha`` fixture downloads them into www/ and
# this fixture then registers them as Lovelace resources alongside the
# locally-built expander-card.js.
# ---------------------------------------------------------------------------


@pytest.fixture(scope="session", autouse=True)
def _ha_lovelace_resources(ha) -> None:
    """Register expander-card.js and any plugins.yaml entries as Lovelace resources.

    Runs once per test session after the HA container is ready.  Using the
    WebSocket Lovelace resource API (storage mode) means any plugin added to
    ``tests/plugins.yaml`` is automatically registered here in addition to
    the locally-built ``expander-card.js`` — no changes to
    ``configuration.yaml`` or static resource YAML files are required.
    """
    # Always include the locally-built card.
    resources: list[str] = ["/local/expander-card.js"]

    # Also include every plugin downloaded by ha_testcontainer's ha fixture.
    plugins_yaml_env = os.environ.get("HA_PLUGINS_YAML", "").strip()
    if plugins_yaml_env:
        plugins_yaml_path = Path(plugins_yaml_env)
        if plugins_yaml_path.exists():
            plugins = yaml.safe_load(plugins_yaml_path.read_text()) or []
            if isinstance(plugins, list):
                for plugin in plugins:
                    if isinstance(plugin, dict) and "filename" in plugin:
                        resources.append(f"/local/{plugin['filename']}")

    for idx, url in enumerate(resources, start=1):
        try:
            ha._ws_call({
                "id": idx,
                "type": "lovelace/resources/create",
                "res_type": "module",
                "url": url,
            })
        except Exception as exc:  # noqa: BLE001
            warnings.warn(
                f"Could not register Lovelace resource {url!r}: {exc}",
                stacklevel=1,
            )

