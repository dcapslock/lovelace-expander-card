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
                selector: { text: {} }
            },
            {
                name: 'icon',
                label: 'Icon',
                selector: { icon: {} }
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
                                selector: { boolean: {} }
                            },
                            {
                                name: 'animation',
                                label: 'Enable animation',
                                selector: { boolean: {} }
                            },
                            {
                                name: 'min-width-expanded',
                                label: 'Min width expanded',
                                selector: {
                                    number: {
                                        unit_of_measurement: 'px'
                                    }
                                }
                            },
                            {
                                name: 'max-width-expanded',
                                label: 'Max width expanded',
                                selector: {
                                    number: {
                                        unit_of_measurement: 'px'
                                    }
                                }
                            },
                            {
                                name: 'storage-id',
                                label: 'Storage ID',
                                selector: { text: {} }
                            },
                            {
                                name: 'expander-card-id',
                                label: 'Expander card ID',
                                selector: { text: {} }
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
                                selector: { text: {} }
                            },
                            {
                                name: 'icon-rotate-degree',
                                label: 'Icon rotate degree',
                                selector: { text: {} }
                            },
                            {
                                name: 'header-color',
                                label: 'Header color',
                                selector: { text: {} }
                            },
                            {
                                name: 'button-background',
                                label: 'Button background color',
                                selector: { text: {} }
                            },
                            {
                                name: 'expander-card-background',
                                label: 'Background',
                                selector: { text: {} }
                            },
                            {
                                name: 'expander-card-background-expanded',
                                label: 'Background when expanded',
                                selector: { text: {} }
                            },
                            {
                                name: 'expander-card-display',
                                label: 'Expander card display',
                                selector: { text: {} }
                            },
                            {
                                name: 'clear',
                                label: 'Clear border and background',
                                selector: { boolean: {} }
                            },
                            {
                                name: 'gap',
                                label: 'Gap',
                                selector: { text: {} }
                            },
                            {
                                name: 'padding',
                                label: 'Padding',
                                selector: { text: {} }
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
                                selector: { text: {} }
                            },
                            {
                                name: 'child-padding',
                                label: 'Card padding',
                                selector: { text: {} }
                            },
                            {
                                name: 'child-margin-top',
                                label: 'Card margin top',
                                selector: { text: {} }
                            },
                            {
                                name: 'clear-children',
                                label: 'Clear card border and background',
                                selector: { boolean: {} }
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
                                selector: { boolean: {} }
                            },
                            {
                                name: 'title-card-button-overlay',
                                label: 'Overlay expand button on title card',
                                selector: { boolean: {} }
                            },
                            {
                                name: 'overlay-margin',
                                label: 'Overlay margin',
                                selector: { text: {} }
                            },
                            {
                                name: 'title-card-padding',
                                label: 'Title card padding',
                                selector: { text: {} }
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
