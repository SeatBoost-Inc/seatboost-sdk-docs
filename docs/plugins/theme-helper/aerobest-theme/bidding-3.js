import { biddingTopCoords, biddingBottomCoords  } from './bidding.js';

export var bidding3Coords = Object.assign({}, biddingTopCoords, {
	'leaderboard-row': ['22,106,264,126'],
	'auction-timer': ['87,166,190,211'],
	'leaderboard-bar': ['0,178,87,199', '191,178,277,199'],
	'final-round-text': ['2,238,78,286', '84,238,102,286', '182,238,194,286', '2,286,78,312', '101,286,182,312'],
	'final-round-text-field': ['101,238,182,286'],
	'final-round-paddle': ['189,220,276,368'],
	'place-bid': ['0,550,92,600'],
	'backspace': ['185,550,277,600'],
	'leaderboard-bg': ['0,64,277,178'],
}, biddingBottomCoords); 