import { paymentTopCoords  } from './payment-iphone16.js';

export var payment4TopCoords = Object.assign({}, paymentTopCoords, {
	'section-bar':  ['0,193,277,212']
});

export var payment4BottomCoords = {
	'payment-msg': ['10,496,268,538'],
	'submit-button': ['22,542,255,574'],
	'form-bg': ['0,162,277,602']
};

export var payment4AddPaymentCoords = Object.assign({}, payment4TopCoords, {
	'separator': ['0,240,276,249', '0,276,276,285'],
	'add-payment-button': ['4,252,273,274'],
}, payment4BottomCoords); 