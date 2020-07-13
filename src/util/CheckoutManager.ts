import { CheckoutData as CheckoutDataV1 } from "../models/v1/CheckoutData";
import { TransportMode } from "../cc/transport_modes";
import { PaymentMode } from "../cc/payment_modes";

export class CheckoutManager {
	private sessionStorage: Storage;

	constructor(sessionStorage: Storage) {
		this.sessionStorage = sessionStorage;
	}

	public saveCheckoutData = (checkoutData: CheckoutDataV1) => {
		this.sessionStorage.checkoutData = JSON.stringify(checkoutData);
		this.sessionStorage.checkoutDataVersion = checkoutData.version;
	};

	public removeCheckoutData = () => {
		this.sessionStorage.removeItem("checkoutData");
		this.sessionStorage.removeItem("checkoutDataVersion");
	};

	public setTransportMode(transportMode: TransportMode) {
		const checkoutData = this.getCheckoutData();
		checkoutData.setTransportMode(transportMode);
		this.saveCheckoutData(checkoutData);
	}

	public setPaymentMode(paymentMode: PaymentMode) {
		const checkoutData = this.getCheckoutData();
		checkoutData.setPaymentMode(paymentMode);
		this.saveCheckoutData(checkoutData);
	}

	public getCheckoutData = (): CheckoutDataV1 => {
		if (this.sessionStorage.checkoutData) {
			if (this.sessionStorage.checkoutDataVersion === "v1") {
				const checkoutData = new CheckoutDataV1(JSON.parse(this.sessionStorage.checkoutData));
				return checkoutData;
			} else {
				this.removeCheckoutData();
				return new CheckoutDataV1();
			}
		} else {
			return new CheckoutDataV1();
		}
	};
}
