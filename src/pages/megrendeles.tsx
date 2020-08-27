import React, { useEffect, useState, useMemo, useContext } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ShoppingCart from "../components/shopping_cart";
import TransportModes from "../cc/transport_modes";
import PaymentModes from "../cc/payment_modes";
import { CheckoutData, CHECKOUT_STATES, CheckoutState } from "../models/v1/CheckoutData";
import { CheckoutManager } from "../util/CheckoutManager";
import ShippingAndBillingInfo from "../cc/shipping_and_billing_info";
import DCCheckbox from "../ui/dc-checkbox";
import * as DC from "../ui/dc-components-typing";
import { CartManager } from "../util/CartManager";
import { GlobalStateContext } from "../context/GlobalContextProvider";
import { isBrowser } from "../util/helper";
import { navigate, withPrefix } from "gatsby";
import { useApiClient } from "../util/customhooks";

export type CheckoutMode = "HIDDEN" | "OPEN" | "COLLAPSED";

export type ActionType = "validate_and_next" | "none";

export interface ActionFinishedEventDetail {
	validationResult?: boolean;
}

export interface ActionFinishedEvent {
	detail: ActionFinishedEventDetail;
}

export interface CheckoutChangeEventDetail {
	checkoutData: CheckoutData;
}

export interface CheckoutChangeEvent {
	detail: CheckoutChangeEventDetail;
}

const CheckoutPage = () => {
	const globalState = useContext(GlobalStateContext);
	const [checkoutData, setCheckoutData] = useState<CheckoutData>();
	const [actionShippingAndBilling, setActionShippingAndBilling] = useState<ActionType>("none");
	const [actionTransportModes, setActionTransportModes] = useState<ActionType>("none");
	const [actionPaymentModes, setActionPaymentModes] = useState<ActionType>("none");
	const [validationMessage, setValidationMessage] = useState<string>();
	const apiClient = useApiClient();
	const cartManager = useMemo(() => new CartManager(window.localStorage), []);

	const getCheckoutMode = (elem: CheckoutState): CheckoutMode => {
		if (checkoutData) {
			const currentIndex = CheckoutData.getCurrentStateIndex(checkoutData);
			const elemIndex = CHECKOUT_STATES.findIndex((state) => state === elem);
			if (currentIndex > elemIndex) {
				return "COLLAPSED";
			} else if (currentIndex === elemIndex) {
				return "OPEN";
			} else {
				return "HIDDEN";
			}
		} else {
			return "HIDDEN";
		}
	};

	const handleCheckoutChange = (e: CheckoutChangeEvent) => {
		setCheckoutData({ ...e.detail.checkoutData });
	};

	useEffect(() => {
		if (checkoutData) {
			new CheckoutManager(window.sessionStorage).saveCheckoutData(checkoutData);
		}
	}, [checkoutData]);

	useEffect(() => {
		setCheckoutData(new CheckoutManager(window.sessionStorage).getCheckoutData());
	}, []);

	const actionButtonTemplate = () => {
		if (checkoutData?.checkoutState === "SUMMARY") {
			return (
				<button
					className="btn btn-primary btn-green mb-2 md:mb-0"
					onClick={async () => {
						if (checkoutData) {
							if (!checkoutData.tAndCAccepted) {
								setValidationMessage("Kérem fogadja el az Általános szerződési feltételeket");
							} else {
								setValidationMessage("");

								try {
									const result = await apiClient.post("/api/orders/add.php", {
										checkoutData,
										shoppingCart: cartManager.getShoppingCart(),
									});

									const orderId = result.resp.orderId;

									// new CartManager(window.localStorage).removeShoppingCart();
									// globalDispatch({ type: "SET_CART_ITEM_NUM", num: 0 });

									// // reset state
									// setCheckoutData({
									// 	...checkoutData,
									// 	checkoutState: "TRANSPORT_MODES",
									// });

									await navigate(`/visszaigazolas?orderId=${orderId}`);
								} catch (error) {
									setValidationMessage("Hiba történt a mentés során");
								}
							}
						}
					}}
				>
					Rendelés elküldése
				</button>
			);
		} else {
			return (
				<button
					className="btn btn-primary mb-2 md:mb-0"
					onClick={() => {
						if (checkoutData) {
							if (checkoutData.checkoutState === "SHIPPING_AND_BILLING_INFO") {
								setActionShippingAndBilling("validate_and_next");
							} else if (checkoutData.checkoutState === "TRANSPORT_MODES") {
								setActionTransportModes("validate_and_next");
							} else if (checkoutData.checkoutState === "PAYMENT_MODES") {
								setActionPaymentModes("validate_and_next");
							} else {
								setCheckoutData({
									...checkoutData,
									checkoutState: CheckoutData.getNextState(checkoutData),
								});
							}
						}
					}}
				>
					Tovább
				</button>
			);
		}
	};

	const checkoutTemplate = (
		<div>
			<div className="mb-4">
				<ShoppingCart summary={true} />
			</div>
			<div className="mb-4">
				<TransportModes
					mode={getCheckoutMode("TRANSPORT_MODES")}
					checkoutData={checkoutData}
					onChange={handleCheckoutChange}
					actionTriggered={actionTransportModes}
					actionFinished={(e: ActionFinishedEvent) => {
						setActionTransportModes("none");
						if (e.detail.validationResult === true) {
							setValidationMessage(undefined);
							if (actionTransportModes === "validate_and_next") {
								if (checkoutData) {
									setCheckoutData({
										...checkoutData,
										checkoutState: CheckoutData.getNextState(checkoutData),
									});
								}
							}
						}
					}}
				/>
			</div>
			<div className="mb-4">
				<PaymentModes
					mode={getCheckoutMode("PAYMENT_MODES")}
					checkoutData={checkoutData}
					onChange={handleCheckoutChange}
					actionTriggered={actionPaymentModes}
					actionFinished={(e: ActionFinishedEvent) => {
						setActionPaymentModes("none");
						if (e.detail.validationResult === true) {
							setValidationMessage(undefined);
							if (actionPaymentModes === "validate_and_next") {
								if (checkoutData) {
									setCheckoutData({
										...checkoutData,
										checkoutState: CheckoutData.getNextState(checkoutData),
									});
								}
							}
						}
					}}
				/>
			</div>
			<div className="mb-4">
				<ShippingAndBillingInfo
					mode={getCheckoutMode("SHIPPING_AND_BILLING_INFO")}
					checkoutData={checkoutData}
					onChange={handleCheckoutChange}
					actionTriggered={actionShippingAndBilling}
					actionFinished={(e: ActionFinishedEvent) => {
						setActionShippingAndBilling("none");
						if (e.detail.validationResult === true) {
							setValidationMessage(undefined);
							if (actionShippingAndBilling === "validate_and_next") {
								if (checkoutData) {
									setCheckoutData({
										...checkoutData,
										checkoutState: CheckoutData.getNextState(checkoutData),
									});
								}
							}
						} else {
							setValidationMessage("Hibás adatok, kérem ellenőrizze.");
						}
					}}
				/>
			</div>
			{checkoutData?.checkoutState === "SUMMARY" ? (
				<div className="mb-4">
					<div className="flex items-center">
						<div className="w-8">
							<DCCheckbox
								checked={checkoutData?.tAndCAccepted}
								onChange={(e: DC.Checkbox.ChangeEvent) => {
									if (checkoutData) {
										setCheckoutData({
											...checkoutData,
											tAndCAccepted: !e.detail.checked,
										});
									}
								}}
							></DCCheckbox>
						</div>
						<div>
							Elfogadom az{" "}
							<a className="link" href={withPrefix("/altalanos-szerzodesi-feltetelek")} target="_blank">
								Általános szerződési feltételek
							</a>
							-et (ÁSZF) és az{" "}
							<a className="link" href={withPrefix("/adatvedelmi-tajekoztato")} target="_blank">
								Adatvédelmi tájékoztató
							</a>
							-t
						</div>
					</div>
				</div>
			) : (
				""
			)}
			<div className="mb-4">
				<div className="flex flex-wrap flex-col sm:flex-row sm:flex-no-wrap justify-end">
					<button
						className="btn btn-primary btn-light mb-2 mr-0 sm:mr-2 md:mb-0"
						onClick={() => {
							if (checkoutData) {
								setValidationMessage("");
								if (checkoutData.checkoutState === "TRANSPORT_MODES") {
									navigate("/kosar");
								} else {
									setCheckoutData({
										...checkoutData,
										checkoutState: CheckoutData.getPreviousState(checkoutData),
									});
								}
							}
						}}
					>
						Vissza
					</button>
					{actionButtonTemplate()}
				</div>
				<div className="text-red-500">{validationMessage}</div>
			</div>
		</div>
	);

	return (
		<Layout>
			<SEO title="Megrendelés" />
			<div className="container px-4 py-4">
				{isBrowser() ? globalState.numberOfItems > 0 ? checkoutTemplate : <ShoppingCart summary={true} /> : ""}
			</div>
		</Layout>
	);
};

export default CheckoutPage;
