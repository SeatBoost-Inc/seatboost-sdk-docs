import { selectUpgradeTopCoords, selectUpgradeBottomCoords  } from './select-upgrade.js';

export var selectUpgrade2Coords = Object.assign({}, selectUpgradeTopCoords, {
  'section-bar':  ['0,330,277,350', '0,437,277,457'],
  'radio-button': ['6,356,35,388', '6,399,35,431'], 
  'p-text': ['38,356,270,388', '38,399,270,431'],
  'text-field': ['14,467,263,503'],
  'help-icon': ['238,510,268,540'],
  'display-name-msg': ['9,516,211,538'],
  'grid-cell': ['1,349,276,437'],
  'form-bg': ['0,456,277,548']
}, selectUpgradeBottomCoords); 