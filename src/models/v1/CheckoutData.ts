import { TransportMode } from "../../cc/transport_modes";
import { PaymentMode } from "../../cc/payment_modes";
import { Address } from "./Address";
import { Phone } from "./Phone";

export class CheckoutData {
	public version = "v1";
	public creationDate: number = new Date().getTime();
	public lastUpdated: number = new Date().getTime();
	public transportMode!: TransportMode;
	public paymentMode!: PaymentMode;
	public email!: string;
	public phone!: Phone;
	public shippingAddress?: Address;
	public billingIsSameAsShippingAddress = false;
	public billingAddress?: Address;
	public remark?: string;

	constructor(obj?: CheckoutData) {
		if (obj !== undefined) {
			Object.assign(this, obj);
		}
	}

	public setTransportMode(transportMode: TransportMode) {
		this.transportMode = transportMode;
	}

	public setPaymentMode(paymentMode: PaymentMode) {
		this.paymentMode = paymentMode;
	}
}
