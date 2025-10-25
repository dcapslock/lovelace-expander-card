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
import type { LovelaceCardConfig } from './types';

export interface ExpanderConfig {
    clear?: boolean;
    'clear-children'?: boolean;
    cards?: { type: string }[];
    gap: string;
    'expanded-gap': string;
    padding: string;
    title: string;
    'title-card'?: LovelaceCardConfig;
    'title-card-padding'?: string;
    'title-card-button-overlay'?: false;
    'title-card-clickable'?: boolean;
    'overlay-margin'?: string;
    'child-padding'?: string;
    'child-margin-top'?: string;
    expanded?: boolean;
    'expander-card-background'?: string;
    'expander-card-background-expanded'?: string;
    'header-color'?: string;
    'button-background': string;
    'arrow-color'?: string;
    'expander-card-display'?: string;
    'min-width-expanded'?: number;
    'max-width-expanded'?: number;
    icon?: string;
    'storgage-id'?: string;  // Deprecated as of 2.6.5
    'storage-id'?: string;
    'icon-rotate-degree'?: string;
    'show-button-users'?: { type: string }[];
    'start-expanded-users'?: { type: string }[];
    animation?: boolean;
    'expander-card-id'?: string;
}
