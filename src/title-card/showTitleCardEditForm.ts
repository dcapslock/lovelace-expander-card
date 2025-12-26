export type TitleCardConfig = {
    type?: string;
} & Record<string, unknown>;

export interface TitleCardEditFormParams {
    title: string;
    config?: TitleCardConfig;
    submit?: (config: TitleCardConfig) => void;
    cancel?: () => void;
    submitText?: string;
    cancelText?: string;
    lovelace?: unknown;
};

export const showTitleCardEditFormDialog = (
    element: HTMLElement,
    dialogParams: TitleCardEditFormParams
) =>
    new Promise<TitleCardConfig | null>((resolve) => {
        const origCancel = dialogParams.cancel;
        const origSubmit = dialogParams.submit;

        element.dispatchEvent(
            new CustomEvent('show-dialog',
                {
                    detail:{
                        dialogTag: 'expander-card-title-card-edit-form',
                        dialogImport: () => customElements.whenDefined('expander-card-title-card-edit-form'),
                        dialogParams: {
                            ...dialogParams,
                            cancel: () => {
                                resolve(null);
                                if (origCancel) {
                                    origCancel();
                                }
                            },
                            submit: (data: TitleCardConfig) => {
                                resolve(data);
                                if (origSubmit) {
                                    origSubmit(data);
                                }
                            }
                        }
                    },
                    bubbles: true,
                    composed: true
                }
            )
        );
    });
