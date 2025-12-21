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
    'title-card-padding': '',
    'style': ''
};

export const expanderCardEditorTemplates = [
    'expanded'
];

const iconSelector = { icon: {} };
const textSelector = { text: {} };
const multilineTextSelector = { text: { multiline: true } };
const booleanSelector = { boolean: {} };
const objectSelector = { object: {} };
const numberSelector = (unit_of_measurement: string) => ({
    number: {
        unit_of_measurement
    }
});

const iconField = (name: string, label: string) => ({
    name,
    label,
    selector: iconSelector
});

const textField = (name: string, label: string) => ({
    name,
    label,
    selector: textSelector
});

const multilineTextField = (name: string, label: string) => ({
    name,
    label,
    selector: multilineTextSelector
});

const booleanField = (name: string, label: string) => ({
    name,
    label,
    selector: booleanSelector
});

const objectField = (name: string, label: string) => ({
    name,
    label,
    selector: objectSelector
});

const numberField = (name: string, label: string, unit_of_measurement: string) => ({
    name,
    label,
    selector: numberSelector(unit_of_measurement)
});

const labelField = (label: string) => ({
    label,
    type: 'constant'
});

// See https://www.home-assistant.io/docs/blueprint/selectors
export const ExpanderCardEditorSchema = [
    {
        type: 'expandable',
        label: 'Expander Card Settings',
        icon: 'mdi:arrow-down-bold-box-outline',
        schema: [
            {
                ...textField('title', 'Title')
            },
            {
                ...iconField('icon', 'Icon')
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
                                ...booleanField('expanded', 'Start expanded')
                            },
                            {
                                ...booleanField('animation', 'Enable animation')
                            },
                            {
                                ...numberField('min-width-expanded', 'Min width expanded', 'px')
                            },
                            {
                                ...numberField('max-width-expanded', 'Max width expanded', 'px')
                            },
                            {
                                ...textField('storage-id', 'Storage ID')
                            },
                            {
                                ...textField('expander-card-id', 'Expander card ID')
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
                                ...textField('arrow-color', 'Icon color')
                            },
                            {
                                ...textField('icon-rotate-degree', 'Icon rotate degree')
                            },
                            {
                                ...textField('header-color', 'Header color')
                            },
                            {
                                ...textField('button-background', 'Button background color')
                            },
                            {
                                ...textField('expander-card-background', 'Background')
                            },
                            {
                                ...textField('expander-card-background-expanded', 'Background when expanded')
                            },
                            {
                                ...textField('expander-card-display', 'Expander card display')
                            },
                            {
                                ...booleanField('clear', 'Clear border and background')
                            },
                            {
                                ...textField('gap', 'Gap')
                            },
                            {
                                ...textField('padding', 'Padding')
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
                                ...textField('expanded-gap', 'Card gap')
                            },
                            {
                                ...textField('child-padding', 'Card padding')
                            },
                            {
                                ...textField('child-margin-top', 'Card margin top')
                            },
                            {
                                ...booleanField('clear-children', 'Clear card border and background')
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
                        ...labelField('Use YAML to specify a title card to replace the expander title')
                    },
                    {
                        ...objectField('title-card', '')
                    },
                    {
                        type: 'grid',
                        schema: [
                            {
                                ...booleanField('title-card-clickable', 'Make title card clickable to expand/collapse')
                            },
                            {
                                ...booleanField('title-card-button-overlay', 'Overlay expand button on title card')
                            },
                            {
                                ...textField('overlay-margin', 'Overlay margin')
                            },
                            {
                                ...textField('title-card-padding', 'Title card padding')
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
            },
            {
                type: 'expandable',
                label: 'Advanced styling',
                icon: 'mdi:brush-outline',
                schema: [
                    {
                        ...multilineTextField('style', 'Custom CSS style')
                    }
                ]
            },
            {
                type: 'expandable',
                label: 'Advanced templates',
                icon: 'mdi:code-brackets',
                schema: [
                    {
                        type: 'expandable',
                        label: 'Variables',
                        icon: 'mdi:variable',
                        schema: [
                            {
                                name: 'variables',
                                label: 'Variables',
                                selector: {
                                    object: {
                                        label_field: 'variable',
                                        multiple: true,
                                        fields: {
                                            variable: {
                                                label: 'Variable name',
                                                required: true,
                                                selector: { text: {} }
                                            },
                                            value_template: {
                                                label: 'Value template',
                                                required: true,
                                                selector: { text: { multiline: true } }
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: 'expandable',
                        label: 'Templates',
                        icon: 'mdi:code-brackets',
                        schema: [
                            {
                                name: 'templates',
                                label: 'Templates',
                                selector: {
                                    object: {
                                        label_field: 'template',
                                        multiple: true,
                                        fields: {
                                            template: {
                                                label: 'Config item',
                                                required: true,
                                                selector: {
                                                    select: {
                                                        mode: 'dropdown',
                                                        sort: true,
                                                        options: ['[[templates]]'] // to be populated dynamically
                                                    }
                                                }
                                            },
                                            value_template: {
                                                label: 'Value template',
                                                required: true,
                                                selector: { text: { multiline: true } }
                                            }
                                        }
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
