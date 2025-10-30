/* eslint-disable quote-props */
import { ExpanderConfig } from './configtype';

export const ExpanderCardEditorNulls: ExpanderConfig = {
    icon: '',
    'arrow-color': '',
    'icon-rotate-degree': '',
    'header-color': '',
    'button-background': '',
    'min-width-expanded': 0,
    'max-width-expanded': 0,
    'storage-id': '',
    'expander-card-id': '',
    'show-button-users': [],
    'start-expanded-users': [],
    'expander-card-background': '',
    'expander-card-background-expanded': '',
    'expander-card-display': '',
    gap: '',
    padding: '',
    'expanded-gap': '',
    'child-padding': '',
    'child-margin-top': '',
    'overlay-margin': '',
    'title-card-padding': ''
};

const iconSelector = { icon: {} };
const textSelector = { text: {} };
const booleanSelector = { boolean: {} };
const numberPxSelector = {
    number: {
        unit_of_measurement: 'px'
    }
};

// See https://www.home-assistant.io/docs/blueprint/selectors
export const ExpanderCardEditorSchema = [
    {
        type: 'expandable',
        label: 'Expander Card Settings',
        icon: 'mdi:arrow-down-bold-box-outline',
        schema: [
            {
                name: 'title',
                label: 'Title',
                selector: textSelector
            },
            {
                name: 'icon',
                label: 'Icon',
                selector: iconSelector
            },
            {
                type: 'expandable',
                label: 'Expander control',
                icon: 'mdi:cog-outline',
                schema: [
                    {
                        type: 'grid',
                        schema: [
                            {
                                name: 'expanded',
                                label: 'Start expanded',
                                selector: booleanSelector
                            },
                            {
                                name: 'animation',
                                label: 'Enable animation',
                                selector: booleanSelector
                            },
                            {
                                name: 'min-width-expanded',
                                label: 'Min width expanded',
                                selector: numberPxSelector
                            },
                            {
                                name: 'max-width-expanded',
                                label: 'Max width expanded',
                                selector: numberPxSelector
                            },
                            {
                                name: 'storage-id',
                                label: 'Storage ID',
                                selector: textSelector
                            },
                            {
                                name: 'expander-card-id',
                                label: 'Expander card ID',
                                selector: textSelector
                            }
                        ]
                    }
                ]
            },
            {
                type: 'expandable',
                label: 'Expander styling',
                icon: 'mdi:palette-swatch',
                schema: [
                    {
                        type: 'grid',
                        schema: [
                            {
                                name: 'arrow-color',
                                label: 'Icon color',
                                selector: textSelector
                            },
                            {
                                name: 'icon-rotate-degree',
                                label: 'Icon rotate degree',
                                selector: textSelector
                            },
                            {
                                name: 'header-color',
                                label: 'Header color',
                                selector: textSelector
                            },
                            {
                                name: 'button-background',
                                label: 'Button background color',
                                selector: textSelector
                            },
                            {
                                name: 'expander-card-background',
                                label: 'Background',
                                selector: textSelector
                            },
                            {
                                name: 'expander-card-background-expanded',
                                label: 'Background when expanded',
                                selector: textSelector
                            },
                            {
                                name: 'expander-card-display',
                                label: 'Expander card display',
                                selector: textSelector
                            },
                            {
                                name: 'clear',
                                label: 'Clear border and background',
                                selector: booleanSelector
                            },
                            {
                                name: 'gap',
                                label: 'Gap',
                                selector: textSelector
                            },
                            {
                                name: 'padding',
                                label: 'Padding',
                                selector: textSelector
                            }
                        ]
                    }
                ]
            },
            {
                type: 'expandable',
                label: 'Card styling',
                icon: 'mdi:palette-swatch-outline',
                schema: [
                    {
                        type: 'grid',
                        schema: [
                            {
                                name: 'expanded-gap',
                                label: 'Card gap',
                                selector: textSelector
                            },
                            {
                                name: 'child-padding',
                                label: 'Card padding',
                                selector: textSelector
                            },
                            {
                                name: 'child-margin-top',
                                label: 'Card margin top',
                                selector: textSelector
                            },
                            {
                                name: 'clear-children',
                                label: 'Clear card border and background',
                                selector: booleanSelector
                            }
                        ]
                    }
                ]
            },
            {
                type: 'expandable',
                label: 'Title card',
                icon: 'mdi:subtitles-outline',
                schema: [
                    {
                        label: 'Use YAML to specify a title card to replace the expander title',
                        type: 'constant'
                    },
                    {
                        name: 'title-card',
                        label: '',
                        selector: { object: {} }
                    },
                    {
                        type: 'grid',
                        schema: [
                            {
                                name: 'title-card-clickable',
                                label: 'Make title card clickable to expand/collapse',
                                selector: booleanSelector
                            },
                            {
                                name: 'title-card-button-overlay',
                                label: 'Overlay expand button on title card',
                                selector: booleanSelector
                            },
                            {
                                name: 'overlay-margin',
                                label: 'Overlay margin',
                                selector: textSelector
                            },
                            {
                                name: 'title-card-padding',
                                label: 'Title card padding',
                                selector: textSelector
                            }
                        ]
                    }
                ]
            },
            {
                type: 'expandable',
                label: 'User settings',
                icon: 'mdi:account-multiple-outline',
                schema: [
                    {
                        type: 'grid',
                        schema: [
                            {
                                name: 'show-button-users',
                                label: 'Show button users',
                                selector: {
                                    select: {
                                        multiple: true,
                                        mode: 'dropdown',
                                        custom: true, // to allow for unknown users
                                        options: ['[[users]]'] // to be populated dynamically
                                    }
                                }
                            },
                            {
                                name: 'start-expanded-users',
                                label: 'Start expanded users',
                                selector: {
                                    select: {
                                        multiple: true,
                                        mode: 'dropdown',
                                        custom: true, // to allow for unknown users
                                        options: ['[[users]]'] // to be populated dynamically
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
