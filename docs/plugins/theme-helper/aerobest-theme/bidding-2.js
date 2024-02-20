import { biddingTopCoords, biddingBottomCoords  } from './bidding.js';
import { leaderboardCoords  } from './leaderboard.js';

export var bidding2Coords = Object.assign({}, biddingTopCoords, leaderboardCoords, {
	'leaderboard-total': ['22,180,264,199'], 
	'auction-timer': ['87,203,190,247'],
	'leaderboard-bar': ['0,216,87,236', '191,216,277,236'],
	'leaderboard-bg': ['0,64,277,216'],
	'msg-carousel': ['10,257,267,292'],
	'golden-paddle': ['80,456,196,600'],
	'help-icon': ['236,560,268,591'],
}, biddingBottomCoords); 