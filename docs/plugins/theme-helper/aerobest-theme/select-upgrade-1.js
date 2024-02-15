import { preAuctionTopCoords  } from './pre-auction.js';
import { selectUpgradeBottomCoords  } from './select-upgrade.js';

export var selectUpgrade1Coords = Object.assign({}, preAuctionTopCoords, {
  'airline-logo': ['40,80,237,120'],
  'section-bar':  ['0,134,276,154'],
  'h1-text' : ['43,159,106,176', '200,159,267,176', '43,209,86,224', '205,209,267,224',
    '43,255,106,272', '200,255,267,272', '43,305,86,320', '205,305,267,320'],
  'p-text': ['43,177,102,204', '212,177,270,204', '43,223,102,242', '107,223,206,242', '229,223,269,242',
    '43,273,102,300', '212,273,270,300', '43,319,102,338', '107,319,206,338', '229,319,269,338' ],
  'airplane': ['135,166,180,210', '135,262,180,304'],
  'radio-button': ['6,185,37,218', '6,281,37,312'],
  'grid-cell': ['1,154,276,249', '1,250,276,345']
}, selectUpgradeBottomCoords); 