import { TCustomEventList, TCustomEventsUI } from '../../modules/events/custom';

const customEventList: TCustomEventList = {
  login: new CustomEvent('login', { bubbles: true }),
  anableUI: new CustomEvent('anableUI', { bubbles: true }),
  disableUI: new CustomEvent('disableUI', { bubbles: true }),
};

const customEventsUI: TCustomEventsUI = {
  anableUI: customEventList.anableUI,
  disableUI: customEventList.disableUI,
};

export { customEventList, customEventsUI };
