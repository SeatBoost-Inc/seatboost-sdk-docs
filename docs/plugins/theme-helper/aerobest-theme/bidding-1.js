import { biddingTopCoords, biddingBottomCoords  } from './bidding.js';

export var bidding1Coords = Object.assign({}, biddingTopCoords, {
	'leaderboard-row': ['22,88,264,107', '22,106,264,125','22,124,264,143',
		'22,142,264,161', '22,160,264,179'], 
	'buy-instant-upgrade': ['132,183,264,207'], 
	'auction-timer': ['87,215,190,261'],
	'leaderboard-bar': ['0,228,87,249', '191,228,277,249'],
	'leaderboard-bg': ['0,64,277,228'],
	'msg-carousel': ['10,270,267,305'],
	'help-icon': ['236,560,268,591'],	
	'golden-paddle': ['96,438,180,592'],
	'left-paddle': ['10,475,96,599'],
	'right-paddle': ['182,475,268,599']
}, biddingBottomCoords); 