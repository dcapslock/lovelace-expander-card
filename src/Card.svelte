<!--
/*
Copyright 2021-2022 Peter Repukat - FlatspotSoftware
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
-->
<!-- eslint-disable-next-line svelte/valid-compile -->
<svelte:options customElement='expander-sub-card' />

<script lang="ts">
    import { onMount } from 'svelte';
    import type { AnimationState, HomeAssistant, HuiCard, LovelaceCardConfig } from './types';

    const {
        type = 'div',
        config,
        hass,
        preview,
        marginTop ='0px',
        open,
        animation = true,
        animationState,
        clearCardCss = false
    }: {
        type?: string;
        config: LovelaceCardConfig;
        hass: HomeAssistant | undefined;
        preview: boolean;
        marginTop?: string;
        open: boolean;
        animation: boolean;
        animationState: AnimationState;
        clearCardCss: boolean;
    } = $props();

    let container = $state<HuiCard>();
    let loading = $state(true);
    let cardHeight = $state(0);
    const cardConfig = $state<LovelaceCardConfig>(JSON.parse(JSON.stringify(config)));
    $effect(() => {
        if (container) {
            container.hass = hass;
        }
    });
    $effect(() => {
        if (container) {
            container.preview = preview;
        }
    });
    $effect(() => {
        if (container) {
            container.hidden = !open;
            cardConfig.disabled = !open;
            // eslint-disable-next-line no-underscore-dangle
            container._element?.dispatchEvent(new CustomEvent('card-visibility-changed'));
        }
    });

    onMount(async () => {
        const el: HuiCard = document.createElement('hui-card') as HuiCard;
        el.hass = hass;
        el.preview = preview;
        el.hidden = !open;
        cardConfig.disabled = !open;
        el.config = cardConfig;
        el.load();

        if (!container) {
            return;
        }

        if (clearCardCss) {
            const observer = new MutationObserver(() => {
                clearHaCardStyle(el);
            });

            observer.observe(el, {
                childList: true,
                subtree: true
            });
        }

        if (animation) {
            const reszizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.contentBoxSize) {
                        const contentBoxSize = Array.isArray(entry.contentBoxSize)
                            ? entry.contentBoxSize[0]
                            : entry.contentBoxSize;
                        cardHeight = contentBoxSize.blockSize || cardHeight;
                    } else {
                        cardHeight = entry.contentRect.height || cardHeight;
                    }
                }
            });
            reszizeObserver.observe(el);
        }

        // eslint-disable-next-line svelte/no-dom-manipulating
        container.replaceWith(el);
        container = el;
        loading = false;
    });


    function clearHaCardStyle(el: HTMLElement, maxAttempts = 5) {
        let attempts = 0;
        const initHaCards = () => {
            const haCards: HTMLElement[] = [];

            function collectHaCards(node: Element | ShadowRoot) {
                if (node instanceof Element && node.tagName.toLowerCase() === 'ha-card') {
                    haCards.push(node as HTMLElement);
                    return;
                }

                if ((node as Element).shadowRoot) {
                    collectHaCards((node as Element).shadowRoot!);
                }

                const children = (node instanceof ShadowRoot || node instanceof Element)
                    ? Array.from((node as Element).children)
                    : [];

                children.forEach(collectHaCards);
            }

            collectHaCards(el);

            if (haCards.length > 0) {
                haCards.forEach((card) => {
                    card.style.setProperty('border', 'none', 'important');
                    card.style.setProperty('background', 'transparent', 'important');
                    card.style.setProperty('box-shadow', 'none', 'important');
                });
            } else {
                attempts++;
                if (attempts < maxAttempts) {
                    requestAnimationFrame(initHaCards);
                }
            }
        };

        initHaCards();
    }

</script>

<div class="outer-container{open ? ' open' : ' close'} {animationState} {animation ? 'animation' : ''}"
  style="margin-top: {open ? marginTop : '0px'};{cardHeight ? ` --expander-animation-height: -${cardHeight}px;` : ''}">
    <svelte:element this={type} bind:this={container}/>
    {#if loading}
        <span class="loading"> Loading... </span>
    {/if}
</div>


<style>
  .loading {
    padding: 1em;
    display: block;
  }
 .animation :global {
    hui-card {
        display: flex;
        flex-direction: column;
    }
  }
  .outer-container.animation {
    transition: margin-bottom 0.35s ease;
  }
  .outer-container.animation.open,
  .outer-container.animation.opening {
    margin-bottom: inherit;
  }
  .outer-container.animation.close,
  .outer-container.animation.closing {
    margin-bottom: var(--expander-animation-height, -100%);
  }
  .outer-container.animation.opening {
    animation: fadeInOpacity 0.5s forwards ease;
    -webkit-animation: fadeInOpacity 0.5s forwards ease;
  }
  .outer-container.animation.closing {
      animation: fadeOutOpacity 0.5s forwards ease;
      -webkit-animation: fadeOutOpacity 0.5s forwards ease;
  }
  @keyframes fadeInOpacity {
      0% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }
  @-webkit-keyframes fadeInOpacity {
      0% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }
    @keyframes fadeOutOpacity {
      0% {
          opacity: 1;
      }
      100% {
          opacity: 0;
      }
  }
  @-webkit-keyframes fadeOutOpacity {
      0% {
          opacity: 1;
      }
      100% {
          opacity: 0;
      }
  }
</style>
