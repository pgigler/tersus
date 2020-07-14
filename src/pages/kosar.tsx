import React, { useEffect, useState, useMemo, useReducer } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ShoppingCart from "../components/shopping_cart";
import TransportModes from "../cc/transport_modes";
import PaymentModes from "../cc/payment_modes";
import { CheckoutData, CHECKOUT_STATES, CheckoutState } from "../models/v1/CheckoutData";
import { CheckoutManager } from "../util/CheckoutManager";
import ShippingAndBillingInfo from "../cc/shipping_and_billing_info";

export type CheckoutMode = "HIDDEN" | "OPEN" | "COLLAPSED";

interface CheckoutChangeEventDetail {
	checkoutData: CheckoutData;
}

export class CheckoutChangeEvent extends CustomEvent<CheckoutChangeEventDetail> {
	constructor(detail: CheckoutChangeEventDetail) {
		super("change", { detail });
	}
}

const checkoutDataReducer = (
	state: CheckoutData,
	action: { type: "next" | "previous" | "set"; value?: CheckoutData }
) => {
	let cd: CheckoutData;
	switch (action.type) {
		case "next":
			cd = { ...state, checkoutState: CheckoutData.getNextState(state) };
			break;
		case "previous":
			cd = { ...state, checkoutState: CheckoutData.getPreviousState(state) };
			break;
		case "set":
			cd = { ...state, ...action.value };
			break;
		default:
			throw new Error();
	}
	return cd;
};

const ShoppingCartPage = () => {
	const checkoutManager = useMemo(() => new CheckoutManager(window.sessionStorage), []);
	const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
	const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState(false);
	const [checkoutData, dispatchCheckoutData] = useReducer(checkoutDataReducer, checkoutManager.getCheckoutData());

	const getCheckoutMode = (elem: CheckoutState): CheckoutMode => {
		const currentIndex = CheckoutData.getCurrentStateIndex(checkoutData);
		const elemIndex = CHECKOUT_STATES.findIndex((state) => state === elem);
		if (currentIndex > elemIndex) {
			return "COLLAPSED";
		} else if (currentIndex === elemIndex) {
			return "OPEN";
		} else {
			return "HIDDEN";
		}
	};

	const handleCheckoutChange = (e: CheckoutChangeEvent) => {
		dispatchCheckoutData({ type: "set", value: e.detail.checkoutData });
	};

	useEffect(() => {
		checkoutManager.saveCheckoutData(checkoutData);
	}, [checkoutData]);

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
					<ShippingAndBillingInfo
						mode={getCheckoutMode("TRANSPORT_AND_BILLING_INFO")}
						checkoutData={checkoutData}
						onChange={handleCheckoutChange}
					/>
				</div>
				<div className="mb-4">
					{CheckoutData.getCurrentStateIndex(checkoutData) > 0 ? (
						<button
							className="btn btn-primary mr-4"
							onClick={() => {
								dispatchCheckoutData({ type: "previous" });
							}}
						>
							Vissza
						</button>
					) : (
						""
					)}
					{CheckoutData.getCurrentStateIndex(checkoutData) < CHECKOUT_STATES.length - 1 ? (
						<button
							className="btn btn-primary mr-4"
							disabled={!CheckoutData.nextStateIsEnabled(checkoutData)}
							onClick={() => {
								dispatchCheckoutData({ type: "next" });
							}}
						>
							Tovább
						</button>
					) : (
						""
					)}
					{checkoutData.checkoutState === "SUMMARY" ? (
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
