import HomeAssistantJavaScriptTemplates, { HomeAssistant, HomeAssistantJavaScriptTemplatesRenderer } from 'home-assistant-javascript-templates';

export function getJSTemplateRenderer(variables: Record<string, unknown> = {}, refs: Record<string, unknown> = {}): Promise<HomeAssistantJavaScriptTemplatesRenderer> {
    return new HomeAssistantJavaScriptTemplates(
        document.querySelector('home-assistant') as HomeAssistant,
        {
            autoReturn: false,
            variables,
            refs,
            refsVariableName: 'variables'
        }
    ).getRenderer();
}

export function isJSTemplate(template: string | undefined): boolean {
    if (!template || typeof template !== 'string') return false;
    return String(template).trim().startsWith('[[[') && String(template).trim().endsWith(']]]');
}

export function renderJSTemplate(
    templatesRenderer: Promise<HomeAssistantJavaScriptTemplatesRenderer>,
    template: string,
    variables: Record<string, unknown> = {}) {
    if (!isJSTemplate(template)) {
        throw new Error('Not a valid JS template');
    }
    template = String(template).trim().slice(3, -3);
    void templatesRenderer.then((renderer) => renderer.renderTemplate(template, { variables } ));
}

export function trackJSTemplate(
    templatesRenderer: Promise<HomeAssistantJavaScriptTemplatesRenderer>,
    callback: (result: unknown) => void,
    template: string,
    variables: Record<string, unknown> = {}) {
    if (!isJSTemplate(template)) {
        throw new Error('Not a valid JS template');
    }
    template = String(template).trim().slice(3, -3);
    void templatesRenderer.then((renderer) => {
        renderer.trackTemplate(template, callback, { variables });
    });
}

export function setJSTemplateRef(
    templatesRenderer: Promise<HomeAssistantJavaScriptTemplatesRenderer>,
    refName: string,
    refValue: unknown) {
    void templatesRenderer.then((renderer) => {
        renderer.refs[refName] = refValue;
    });
}
