import React, { useEffect, useState, useMemo } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ShoppingCart from "../components/shopping_cart";
import TransportModes from "../cc/transport_modes";
import PaymentModes from "../cc/payment_modes";
import { CheckoutData } from "../models/v1/CheckoutData";
import { CheckoutManager } from "../util/CheckoutManager";

type CheckoutState = "SHOPPING_CART" | "TRANSPORT_MODES" | "PAYMENT_MODES" | "TRANSPORT_AND_BILLING_INFO" | "SUMMARY";

export type CheckoutMode = "HIDDEN" | "OPEN" | "COLLAPSED";

const CHECKOUT_STATES: CheckoutState[] = [
	"SHOPPING_CART",
	"TRANSPORT_MODES",
	"PAYMENT_MODES",
	"TRANSPORT_AND_BILLING_INFO",
	"SUMMARY",
];

interface CheckoutChangeEventDetail {
	checkoutData: CheckoutData;
}

export class CheckoutChangeEvent extends CustomEvent<CheckoutChangeEventDetail> {
	constructor(detail: CheckoutChangeEventDetail) {
		super("change", { detail });
	}
}

const ShoppingCartPage = () => {
	const checkoutManager = useMemo(() => new CheckoutManager(window.sessionStorage), []);
	const [checkoutState, setCheckoutState] = useState<CheckoutState>("SHOPPING_CART");
	const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
	const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState(false);
	const [checkoutData, setCheckoutData] = useState<CheckoutData>(checkoutManager.getCheckoutData());

	const nextState = () => {
		const currentIndex = getCurrentIndex();
		if (currentIndex < CHECKOUT_STATES.length - 1) {
			setCheckoutState(CHECKOUT_STATES[currentIndex + 1]);
		}
	};

	const nextStateIsEnabled = (): boolean => {
		if (checkoutState === "SHOPPING_CART") {
			return true;
		} else if (checkoutState === "TRANSPORT_MODES") {
			return (
				(checkoutData.transportMode !== "none" && checkoutData.transportMode === "personal_collection") ||
				(checkoutData.transportMode === "home_delivery" && checkoutData.shippingAddress?.zip !== undefined)
			);
		} else if (checkoutState === "PAYMENT_MODES") {
			return checkoutData.paymentMode !== "none";
		} else if (checkoutState === "TRANSPORT_AND_BILLING_INFO") {
			return checkoutData.transportMode === "home_delivery" && checkoutData.shippingAddress !== undefined;
		} else {
			return false;
		}
	};

	const previousState = () => {
		const currentIndex = getCurrentIndex();
		if (currentIndex > 0) {
			setCheckoutState(CHECKOUT_STATES[currentIndex - 1]);
		}
	};

	const getCheckoutMode = (elem: CheckoutState): CheckoutMode => {
		const currentIndex = getCurrentIndex();
		const elemIndex = CHECKOUT_STATES.findIndex((state) => state === elem);
		if (currentIndex > elemIndex) {
			return "COLLAPSED";
		} else if (currentIndex === elemIndex) {
			return "OPEN";
		} else {
			return "HIDDEN";
		}
	};

	const getCurrentIndex = (): number => {
		return CHECKOUT_STATES.findIndex((state) => state === checkoutState);
	};

	const handleCheckoutChange = (e: CheckoutChangeEvent) => {
		setCheckoutData(e.detail.checkoutData);
	};

	return (
		<Layout>
			<SEO title="Kosár" />
			<div className="container px-4 py-4">
				<div className="mb-4">
					<ShoppingCart mode={getCheckoutMode("SHOPPING_CART")} />
				</div>
				<div className="mb-4">
					<TransportModes
						mode={getCheckoutMode("TRANSPORT_MODES")}
						checkoutData={checkoutData}
						onChange={handleCheckoutChange}
					/>
				</div>
				<div className="mb-4">
					<PaymentModes
						mode={getCheckoutMode("PAYMENT_MODES")}
						checkoutData={checkoutData}
						onChange={handleCheckoutChange}
					/>
				</div>
				<div className="mb-4">
					{getCurrentIndex() > 0 ? (
						<button
							className="btn btn-primary mr-4"
							onClick={() => {
								previousState();
							}}
						>
							Vissza
						</button>
					) : (
						""
					)}
					{getCurrentIndex() < CHECKOUT_STATES.length - 1 ? (
						<button
							className="btn btn-primary mr-4"
							disabled={!nextStateIsEnabled()}
							onClick={() => {
								nextState();
							}}
						>
							Tovább
						</button>
					) : (
						""
					)}
					{checkoutState === "SUMMARY" ? (
						<div>
							<div>Elfogadom a felhasználási feltételeket</div>
							<div>Elfogadom az adatkezelési tájékoztatót</div>
							<button
								className="btn btn-primary"
								onClick={() => {
									// eslint-disable-next-line no-console
									console.log("rendelés elküldve");
								}}
							>
								Rendelés elküldése
							</button>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</Layout>
	);
};

export default ShoppingCartPage;
