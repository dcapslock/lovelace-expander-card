// Allowed types are from iOS HIG.
// https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/feedback/#haptics
// Implementors on platforms other than iOS should attempt to match the patterns (shown in HIG) as closely as possible.
export type HapticType = 'success' | 'warning' | 'failure' | 'light' | 'medium' | 'heavy' | 'selection' | 'none';

declare global {
    // for fire event
    interface HASSDomEvents {
        haptic: HapticType;
    }
}

export const forwardHaptic = (node: HTMLElement, hapticType: HapticType) => {
    node.dispatchEvent?.(
        new CustomEvent('haptic',
            { detail: hapticType, bubbles: true, composed: true }
        )
    );
};
