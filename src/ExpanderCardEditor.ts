/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ExpanderCardEditorNulls, ExpanderCardEditorSchema } from './editortype';
import { HomeAssistantUser } from './types';

let helpers = (window as any).cardHelpers;
const helperPromise = new Promise<void>((resolve) => {
    if (helpers) resolve();
    if ((window as any).loadCardHelpers) {
        (window as any).loadCardHelpers().then((loadedHelpers: any) => {
            helpers = loadedHelpers;
            (window as any).cardHelpers = helpers;
            resolve();
        });
    }
});

async function fetchUsers(): Promise<void> {
    const el = document.querySelector('home-assistant');
    const hass = (el as any)?.hass;
    if (!hass) return;
    const users = await hass.callWS({ type: 'config/auth/list' });
    return users
        .filter((user: HomeAssistantUser) => !user.system_generated)
        .map((user: HomeAssistantUser) => user.name);
}

const loader = async (): Promise<any> => {
    // create a temporary vertical-stack card to inherit from
    const verticalStackCard = await helperPromise.then(() =>
        helpers.createCardElement({ type: 'vertical-stack', cards: [] }));
    // get its editor class
    const verticalStackEditor = await verticalStackCard.constructor.getConfigElement();
    // fetch users
    const users = await fetchUsers();
    // return a new class that extends the vertical-stack editor
    return class ExpanderCardEditor extends verticalStackEditor.constructor {
        public constructor() {
            super();
            this._users = users;
        }

        // override setConfig to store config only and not assert stack editor config
        // we also upgrade any old config here if needed
        public setConfig(config: any): void {
            this._config = config;
        }

        // define _schema getter to return our own schema
        public get _schema(): any {
            const schema = ExpanderCardEditorSchema;
            const schemaJSON = JSON.stringify(schema);
            const usersEscaped = this._users
                .map((u: string) => u.replace(/\\/g, '\\\\').replace(/"/g, '\\"'))
                .join('","');
            const populatedSchemaJSON = schemaJSON.replace(/\[\[users\]\]/g, usersEscaped);
            const populatedSchema = JSON.parse(populatedSchemaJSON);
            return populatedSchema;
        }

        // _schema setter does nothing as we want to use our own schema
        public set _schema(_) {
            // do nothing
        }

        // override _computeLabelCallback to show label or name
        public _computeLabelCallback = (item: any): string => item.label ?? item.name ?? '';

        // override _valueChanged to remove null values from config before storing and firing event
        public _valueChanged = (ev: CustomEvent): void => {
            const config = ev.detail.value;
            Object.entries(ExpanderCardEditorNulls).forEach(([key, value]) => {
                if (typeof value === 'object' && Array.isArray(value) && Array.isArray(config[key])) {
                    if (JSON.stringify(config[key]) === JSON.stringify(value)) {
                        delete config[key];
                    }
                    return;
                }
                if (config[key] === value) {
                    delete config[key];
                    return;
                }
            });
            this._config = config;
            this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
        };
    };
};

export const loadExpanderCardEditor = (async () => {
    // Wait for scoped customElements registry to be set up
    while (customElements.get('home-assistant') === undefined)
        await new Promise((resolve) => window.setTimeout(resolve, 100));

    if (!customElements.get('expander-card-editor')) {
        const expanderCardEditor = await loader();
        customElements.define('expander-card-editor', expanderCardEditor);
    }
});
