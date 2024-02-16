import { biddingTopCoords, biddingBottomCoords  } from './bidding.js';

export var bidding3Coords = Object.assign({}, biddingTopCoords, {
	'auction-timer': ['87,166,190,211'],
	'leaderboard-bar': ['0,178,87,199', '191,178,277,199'],
	'p-text': ['2,238,78,286', '84,238,102,286', '182,238,194,286', '2,286,78,312', '101,286,182,312'],
	'final-bid': ['101,238,182,286'],
	'golden-paddle': ['189,220,276,368'],
	'leaderboard-bg': ['0,64,277,178'],
}, biddingBottomCoords); 