import { TransportMode } from "../../cc/transport_modes";
import { PaymentMode } from "../../cc/payment_modes";
import { Phone } from "./Phone";
import { ShippingAddress } from "./ShippingAddress";
import { BillingAddress } from "./BillingAddress";
import { isEmpty, isNumeric, validateHungarianTaxNumber, validateEmail } from "../../util/helper";
import { ShoppingCart } from "./ShoppingCart";

export type CheckoutState = "TRANSPORT_MODES" | "PAYMENT_MODES" | "SHIPPING_AND_BILLING_INFO" | "SUMMARY";

export const CHECKOUT_STATES: CheckoutState[] = [
	"TRANSPORT_MODES",
	"PAYMENT_MODES",
	"SHIPPING_AND_BILLING_INFO",
	"SUMMARY",
];

export type ValidationKey =
	| "email"
	| "phone"
	| "shippingName"
	| "shippingStreet"
	| "shippingCity"
	| "shippingZip"
	| "shippingRemark"
	| "billingPersonalName"
	| "billingCompanyName"
	| "billingStreet"
	| "billingTaxNumber"
	| "billingCity"
	| "billingZip";

export class CheckoutData {
	public version = "v1";
	public creationDate: number = new Date().getTime();
	public checkoutState: CheckoutState = "TRANSPORT_MODES";
	public transportMode: TransportMode = "none";
	public paymentMode: PaymentMode = "none";
	public email!: string;
	public phone!: Phone;
	public shippingAddress: ShippingAddress = new ShippingAddress();
	public billingAddress: BillingAddress = new BillingAddress();
	public tAndCAccepted = false;

	public static setSelectedPlace(checkoutData: CheckoutData, place: string, zip: string) {
		if (checkoutData.shippingAddress === undefined) {
			checkoutData.shippingAddress = new ShippingAddress();
		}
		checkoutData.shippingAddress.city = place;
		checkoutData.shippingAddress.zip = zip;
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

	public static getValidationMessage = (field: ValidationKey, value: string) => {
		if (field === "shippingName") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (value.length > 200) {
				return "Maximum 200 karakter";
			} else {
				return undefined;
			}
		} else if (field === "shippingStreet") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (value.length > 200) {
				return "Maximum 200 karakter";
			} else {
				return undefined;
			}
		} else if (field === "shippingZip") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (!isNumeric(value)) {
				return "Csak számot tartalmazhat";
			} else if (value.length !== 4) {
				return "4 karakter lehet csak";
			} else {
				return undefined;
			}
		} else if (field === "shippingCity") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (value.length > 200) {
				return "Maximum 200 karakter";
			} else {
				return undefined;
			}
		} else if (field === "shippingRemark") {
			if (value !== undefined && value.length > 200) {
				return "Maximum 200 karakter";
			} else {
				return undefined;
			}
		} else if (field === "billingPersonalName") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (value.length > 200) {
				return "Maximum 200 karakter";
			} else {
				return undefined;
			}
		} else if (field === "billingCompanyName") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (value.length > 200) {
				return "Maximum 200 karakter";
			} else {
				return undefined;
			}
		} else if (field === "billingTaxNumber") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (!validateHungarianTaxNumber(value)) {
				return "Hibás adószám, helyes formátum: XXXXXXXC-Y-ZZ";
			} else {
				return undefined;
			}
		} else if (field === "billingStreet") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (value.length > 200) {
				return "Maximum 200 karakter";
			} else {
				return undefined;
			}
		} else if (field === "billingZip") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (!isNumeric(value)) {
				return "Csak számot tartalmazhat";
			} else if (value.length !== 4) {
				return "4 karakter lehet csak";
			} else {
				return undefined;
			}
		} else if (field === "billingCity") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (value.length > 200) {
				return "Maximum 200 karakter";
			} else {
				return undefined;
			}
		} else if (field === "email") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (!validateEmail(value)) {
				return "Email formátum hibás";
			} else {
				return undefined;
			}
		} else if (field === "phone") {
			if (value === undefined || value.length === 0) {
				return "Kötelező mező";
			} else if (!isNumeric(value)) {
				return "Telefonszám csak számokat tartalmazhat";
			} else if (value.length > 9) {
				return "Maximum 9 karakter";
			} else {
				return undefined;
			}
		}

		return undefined;
	};
}
