import * as React from "react";
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"dc-input": any;
			"dc-radio": any;
			"dc-select": any;
			"te-transport-modes": any;
			"te-payment-modes": any;
			"te-shipping-and-billing": any;
		}
	}
}

declare const __PATH_PREFIX__: string;
