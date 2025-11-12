import { HuiCard } from '../types';
import { TimeoutError } from './promise-timeout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const promiseTimeout = (ms: number, promise: Promise<any> | any) => { // NOSONAR
    const timeout = new Promise((_resolve, reject) => {
        setTimeout(() => {
            reject(new TimeoutError(ms));
        }, ms);
    });

    // Returns a race between our timeout and the passed in promise
    return Promise.race([promise, timeout]);
};

export const computeCardSize = (
    card: HuiCard
): number | Promise<number> => {
    if (typeof card.getCardSize === 'function') {
        try {
            return promiseTimeout(500, card.getCardSize()).catch(
                () => 1
            ) as Promise<number>;
        } catch {
            return 1;
        }
    }
    if (customElements.get(card.localName)) {
        return 1;
    }
    return customElements
        .whenDefined(card.localName)
        .then(() => computeCardSize(card));
};
