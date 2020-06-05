import initialState from './initialState';

const scoutDataReducer = (draft, action) => {
  switch (action.type) {
    case 'fetch': {
      draft.zoneKeys = action.zoneKeys;
      draft.zoneData = action.zoneData;
      return;
    }
    case 'sdFetch': {
      draft.scoutData = action.newData;
      draft.scoutedZoneKeys = action.scoutedZoneKeys;
      return;
    }
    case 'map': {
      draft.showModal = true;
      draft.modalType = 'map';
      draft.mapZone = action.zone;
      draft.mapMark = action.mark;
      draft.markCoords = action.markCoords;
      draft.mapInstance = action.instance;
      return;
    }
    case 'modalSwitch': {
      draft.modalType = action.modalType;
      draft.showModal = true;
      return;
    }
    case 'logout': {
      draft.modalType = 'logout';
      draft.showModal = true;
      draft.isLoading = false;
      draft.authChecked = initialState.authChecked;
      draft.userData = initialState.userData;
      return;
    }
    case 'modal': {
      draft.showModal = false;
      draft.shared = false;
      draft.mapMark = '';
      draft.modalType = null;
      draft.radioChecked = initialState.radioChecked;
      draft.formError = initialState.formError;
      draft.formSuccess = initialState.formSuccess;
      draft.formNotification = initialState.formNotification;
      draft.formServer = initialState.formServer;
      draft.guideData = initialState.guideData;
      draft.slideIndex = initialState.slideIndex;
      return;
    }
    case 'route': {
      draft.routeData = action.route;
      draft.currentMark = action.mark;
      draft.totalStops = action.count;
      draft.currentStop = 0;
      return;
    }
    case 'nextMark': {
      draft.currentStop += 1;
      draft.currentMark = draft.routeData[draft.currentStop];
      return;
    }
    case 'prevMark': {
      draft.currentStop -= 1;
      draft.currentMark = draft.routeData[draft.currentStop];
      return;
    }
    case 'end': {
      draft.scoutData = initialState.scoutData;
      draft.routeData = initialState.routeData;
      draft.currentStop = initialState.currentStop;
      draft.totalStops = initialState.totalStops;
      draft.shared = initialState.shared;
      return;
    }
    case 'updateKey': {
      draft.cardKey = action.cardKey;
      return;
    }
    case 'clear': {
      draft.error = false;
      return;
    }
    case 'datacenter': {
      draft.datacenter = action.dc;
      draft.allWorlds = action.worlds;
      return;
    }
    case 'world': {
      draft.world = action.world;
      return;
    }
    case 'dataCenterURL': {
      draft.dataCenterURL = action.url;
      return;
    }
    case 'countSubtract': {
      draft.markCount = draft.markCount -= 1;
      return;
    }
    case 'log in': {
      draft.formCreate = false;
      draft.formLogin = true;
      return;
    }
    case 'create': {
      draft.formLogin = false;
      draft.formCreate = true;
      return;
    }
    case 'formReset': {
      draft.passLengthError = false;
      return;
    }
    case 'formServer': {
      draft.formServer = action.server;
      return;
    };
    case 'loading': {
      draft.isLoading = !draft.isLoading;
      return;
    };
    case 'formError': {
      draft.formError = true;
      draft.formNotification = action.error;
      return;
    }
    case 'formSuccess': {
      draft.formSuccess = true;
      draft.formNotification = action.message;
      draft.isLoading = false;
      return;
    }
    case 'cardError': {
      draft.cardError = true;
      draft.cardNotification = action.error;
      return;
    }
    case 'clearNotifications': {
      draft.formError = initialState.formError;
      draft.formSuccess = initialState.formSuccess;
      draft.formNotification = initialState.formNotification;
      draft.cardError = initialState.cardError;
      draft.cardNotification = initialState.cardNotification;
      return;
    }
    case 'user': {
      draft.userData = action.userData;
      draft.discord = action.discord;
      draft.authChecked = true;
      return;
    }
    case 'nav': {
      draft.showNav = !draft.showNav;
      return;
    }
    case 'radio': {
      draft.radioChecked = !draft.radioChecked;
      return;
    }
    case 'radioReset': {
      draft.radioChecked = false;
      return;
    }
    case 'config': {
      draft.uiConfig = action.config;
      return;
    }
    case 'mapZone': {
      draft.mapZone = action.zone;
      return;
    }
    case 'text': {
      draft.text = action.text;
      return;
    }
    case 'guideIndex': {
      draft.guideIndex = action.index;
      return;
    }
    case 'guideData': {
      draft.guideData = action.guideData;
      return;
    }
    case 'slide': {
      draft.slideIndex = action.slideIndex;
      return;
    }
    default:
      break;
  }
};

export default scoutDataReducer;
