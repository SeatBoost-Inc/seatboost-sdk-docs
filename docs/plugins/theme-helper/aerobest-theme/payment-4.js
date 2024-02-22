import { paymentTopCoords  } from './payment.js';

export var payment4TopCoords = Object.assign({}, paymentTopCoords, {
	'section-bar':  ['0,189,277,208']
});

export var payment4BottomCoords = {
	'payment-msg': ['15,455,261,535'],
	'submit-button': ['21,539,256,572'],
	'form-bg': ['0,156,277,599']
};

export var payment4AddPaymentCoords = Object.assign({}, payment4TopCoords, {
	'separator': ['0,240,276,249', '0,276,276,285'],
	'add-payment-button': ['4,252,273,274'],
}, payment4BottomCoords); 