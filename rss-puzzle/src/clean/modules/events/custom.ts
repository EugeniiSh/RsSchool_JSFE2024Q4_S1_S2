export type TCustomEventNames = 'login' | 'anableUI' | 'disableUI';
export type TCustomEventValues = CustomEvent<unknown>;
export type TCustomEventList = Record<TCustomEventNames, TCustomEventValues>;

export type TCustomEventsUI = Pick<TCustomEventList, 'anableUI' | 'disableUI'>;
