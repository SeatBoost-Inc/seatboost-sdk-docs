import { preAuctionTopCoords  } from './pre-auction-iphone16.js';
import { selectUpgradeBottomCoords  } from './select-upgrade-iphone16.js';

export var selectUpgrade3Coords = Object.assign({}, preAuctionTopCoords, {
  'section-bar':  ['0,333,277,353', '0,440,277,459'],
  'radio-button': ['8,360,35,390', '8,404,35,432'],
  'p-text': ['8,234,270,260', '30,264,96,288', '180,264,246,288', '38,360,270,390', '38,402,270,433'],
  'h1-text' : ['8,288,270,326'],
  'text-field': ['13,468,264,505', '98,263,180,287'],
  'help-icon': ['238,512,266,540'],
  'display-name-msg': ['9,516,204,538'],
  'grid-cell': ['0,352,277,396', '0,396,277,440'],
  'form-bg': ['0,458,277,550']
}, selectUpgradeBottomCoords); 