import { Component } from '../layout/common/component';

export type TCustomEventNames =
  | 'login'
  | 'preLogout'
  | 'logout'
  | 'hideModal'
  | 'bookClose'
  | 'anableUI'
  | 'disableUI';
// export type TCustomEventValues = (detail: TDetailOption) => CustomEvent<TDetailOption>;
export type TCustomEventValues = () => CustomEvent<TDetailOption>;
export type TCustomEventList = Record<TCustomEventNames, TCustomEventValues>;

export type TCustomEventUINames = Extract<
  TCustomEventNames,
  'anableUI' | 'disableUI'
>;
export type TSubNameEventUI = 'all' | 'no-one' | 'only-me' | 'except-me';

type TAll = { type: Extract<TSubNameEventUI, 'all' | 'no-one'>; sours: null };
type TOther = {
  type: Exclude<TSubNameEventUI, 'all' | 'no-one'>;
  sours: Component;
};
export type TDetailOption = TAll | TOther;

export type TSubEventUIList = Record<
  TSubNameEventUI,
  CustomEvent<TDetailOption>
>;

export type TCustomEventUI = Record<TCustomEventUINames, TCustomEventValues>;
