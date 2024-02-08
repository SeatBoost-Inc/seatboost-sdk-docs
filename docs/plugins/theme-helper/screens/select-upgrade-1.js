import { selectUpgradeTopCoords, selectUpgradeBottomCoords  } from './select-upgrade.js';

export var selectUpgrade1Coords = Object.assign({}, selectUpgradeTopCoords, {
  'section-bar':  ['0,65,276,83', '0,179,276,198'],
  'h1-text' : ['43,89,106,106', '200,89,267,106', '43,139,86,154', '205,139,267,154', '43,202,97,218', '199,202,269,218'],
  'p-text' : ['43,107,102,134','212,107,270,134', '43,153,102,172', '229,154,269,173', 
    '107,155,206,171', '43,217,211,242', '224,216,267,240', '43,241,242,364'],
  'airplane': ['135,96,180,140'],
  'time-left': ['43,364,195,382'],
  'radio-button': ['6,115,37,148', '6,276,37,309'],
  'help-icon': ['238,239,268,269'],
  'grid-cell': ['1,84,276,179', '1,197,276,386']
}, selectUpgradeBottomCoords); 