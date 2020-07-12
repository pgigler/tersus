import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ShoppingCart from "../components/shopping_cart";
import TransportModes from "../cc/transport_modes";

type CheckoutState = "SHOPPING_CART" | "TRANSPORT_MODES" | "PAYMENT_TYPES" | "TRANSPORT_AND_BILLING_INFO" | "SUMMARY";

export type CheckoutMode = "HIDDEN" | "OPEN" | "COLLAPSED";

const CHECKOUT_STATES: CheckoutState[] = [
	"SHOPPING_CART",
	"TRANSPORT_MODES",
	"PAYMENT_TYPES",
	"TRANSPORT_AND_BILLING_INFO",
	"SUMMARY",
];

const ShoppingCartPage = () => {
	const [checkoutState, setCheckoutState] = useState<CheckoutState>("SHOPPING_CART");

	const nextState = () => {
		const currentIndex = CHECKOUT_STATES.findIndex((state) => state === checkoutState);
		if (currentIndex < CHECKOUT_STATES.length - 1) {
			setCheckoutState(CHECKOUT_STATES[currentIndex + 1]);
		}
	};

	const getCheckoutMode = (elem: CheckoutState): CheckoutMode => {
		const currentIndex = CHECKOUT_STATES.findIndex((state) => state === checkoutState);
		const elemIndex = CHECKOUT_STATES.findIndex((state) => state === elem);
		if (currentIndex > elemIndex) {
			return "COLLAPSED";
		} else if (currentIndex === elemIndex) {
			return "OPEN";
		} else {
			return "HIDDEN";
		}
	};

	return (
		<Layout>
			<SEO title="Kosár" />
			<div className="container px-4 py-4">
				<ShoppingCart mode={getCheckoutMode("SHOPPING_CART")} />
				<TransportModes mode={getCheckoutMode("TRANSPORT_MODES")} />
				<button
					className="mt-4 btn btn-primary"
					onClick={() => {
						nextState();
					}}
				>
					Tovább
				</button>
			</div>
		</Layout>
	);
};

export default ShoppingCartPage;
