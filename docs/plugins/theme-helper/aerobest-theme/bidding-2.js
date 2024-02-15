import { biddingTopCoords, biddingBottomCoords  } from './bidding.js';

export var bidding2Coords = Object.assign({}, biddingTopCoords, {
	'auction-timer': ['87,185,190,229'],
	'leaderboard-bar': ['0,197,87,218', '191,197,277,218'],
	'leaderboard-bg': ['0,64,277,197'],
	'msg-carousel': ['10,240,267,275'],
	'help-icon': ['236,560,268,591'],
}, biddingBottomCoords); 