import {
  TCustomEventNames,
  TCustomEventList,
  TCustomEventUI,
  TDetailOption,
  // TSubNameEventUI,
  // TSubEventUIList,
  // ICustomEventUIDetail
} from '../../modules/events/custom';

const defaultDetail: TDetailOption = {
  type: 'no-one',
  sours: null,
};

function getCustomEvent(
  eventName: TCustomEventNames /* eventDetail: TDetailOption */,
) {
  const eventOption = {
    bubbles: true,
    // detail: eventDetail
    detail: defaultDetail,
  };

  return new CustomEvent(eventName, eventOption);
}

const customEventList: TCustomEventList = {
  // login: new CustomEvent('login', { bubbles: true }),
  // anableUI: new CustomEvent('anableUI', { bubbles: true }),
  // disableUI: new CustomEvent('disableUI', { bubbles: true }),
  login: getCustomEvent.bind(null, 'login'),
  preLogout: getCustomEvent.bind(null, 'preLogout'),
  logout: getCustomEvent.bind(null, 'logout'),
  hideModal: getCustomEvent.bind(null, 'hideModal'),
  bookClose: getCustomEvent.bind(null, 'bookClose'),
  anableUI: getCustomEvent.bind(null, 'anableUI'),
  disableUI: getCustomEvent.bind(null, 'disableUI'),
};

const customEventsUI: TCustomEventUI = {
  anableUI: customEventList.anableUI,
  disableUI: customEventList.disableUI,
};

export { customEventList, customEventsUI };
