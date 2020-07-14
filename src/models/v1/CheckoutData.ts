import { TransportMode } from "../../cc/transport_modes";
import { PaymentMode } from "../../cc/payment_modes";
import { Address } from "./Address";
import { Phone } from "./Phone";

export type CheckoutState =
	| "SHOPPING_CART"
	| "TRANSPORT_MODES"
	| "PAYMENT_MODES"
	| "TRANSPORT_AND_BILLING_INFO"
	| "SUMMARY";

export const CHECKOUT_STATES: CheckoutState[] = [
	"SHOPPING_CART",
	"TRANSPORT_MODES",
	"PAYMENT_MODES",
	"TRANSPORT_AND_BILLING_INFO",
	"SUMMARY",
];

export class CheckoutData {
	public version = "v1";
	public creationDate: number = new Date().getTime();
	public checkoutState: CheckoutState = "SHOPPING_CART";
	public transportMode: TransportMode = "none";
	public paymentMode: PaymentMode = "none";
	public email!: string;
	public phone!: Phone;
	public shippingAddress?: Address;
	public billingIsSameAsShippingAddress = false;
	public billingAddress?: Address;
	public remark?: string;

	public static setTransportMode(checkoutData: CheckoutData, transportMode: TransportMode) {
		checkoutData.transportMode = transportMode;
	}

	public static setSelectedPlace(checkoutData: CheckoutData, place: string, zip: string) {
		if (checkoutData.shippingAddress === undefined) {
			checkoutData.shippingAddress = new Address();
		}
		checkoutData.shippingAddress.city = place;
		checkoutData.shippingAddress.zip = zip;
	}

	public static setPaymentMode(checkoutData: CheckoutData, paymentMode: PaymentMode) {
		checkoutData.paymentMode = paymentMode;
	}

	public static setCheckoutState(checkoutData: CheckoutData, checkoutState) {
		checkoutData.checkoutState = checkoutState;
	}

	public static getNextState = (checkoutData: CheckoutData) => {
		const currentIndex = CheckoutData.getCurrentStateIndex(checkoutData);
		if (currentIndex < CHECKOUT_STATES.length - 1) {
			return CHECKOUT_STATES[currentIndex + 1];
		} else {
			return CHECKOUT_STATES[currentIndex];
		}
	};

	public static nextStateIsEnabled = (checkoutData: CheckoutData): boolean => {
		if (checkoutData.checkoutState === "SHOPPING_CART") {
			return true;
		} else if (checkoutData.checkoutState === "TRANSPORT_MODES") {
			return (
				checkoutData.transportMode === "personal_collection" ||
				(checkoutData.transportMode === "home_delivery" && checkoutData.shippingAddress?.zip !== undefined)
			);
		} else if (checkoutData.checkoutState === "PAYMENT_MODES") {
			return checkoutData.paymentMode !== "none";
		} else if (checkoutData.checkoutState === "TRANSPORT_AND_BILLING_INFO") {
			return true;
		} else {
			return false;
		}
	};

	public static getPreviousState = (checkoutData: CheckoutData) => {
		const currentIndex = CheckoutData.getCurrentStateIndex(checkoutData);
		if (currentIndex > 0) {
			return CHECKOUT_STATES[currentIndex - 1];
		} else {
			return CHECKOUT_STATES[currentIndex];
		}
	};

	public static getCurrentStateIndex = (checkoutData: CheckoutData): number => {
		return CHECKOUT_STATES.findIndex((state) => state === checkoutData.checkoutState);
	};
}
