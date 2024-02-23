import { preAuctionTopCoords  } from './pre-auction.js';
import { selectUpgradeBottomCoords  } from './select-upgrade.js';

export var selectUpgrade2Coords = Object.assign({}, preAuctionTopCoords, {
  'section-bar':  ['0,65,276,83', '0,179,276,198'],
  'h1-text' : ['43,89,106,106', '200,89,267,106', '43,139,86,154', '205,139,267,154', '43,202,97,218', '199,202,269,218'],
  'p-text' : ['43,107,102,134','212,107,270,134', '43,153,102,172', '229,154,269,173', 
    '107,155,206,171', '43,216,200,238', '204,216,267,238', '43,239,238,266'],
  'airplane': ['135,96,180,140'],
  'learn-more-button': ['43,268,265,300'],
  'no-colors-applied': ['43,306,180,324'],
  'radio-button': ['6,115,37,148', '6,247,37,280'],
  'help-icon': ['238,235,268,265'],
  'grid-cell': ['1,84,276,179', '1,197,276,336']
}, selectUpgradeBottomCoords); 