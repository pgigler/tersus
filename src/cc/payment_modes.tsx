import { useEffect, useState, component } from "haunted";
import { CheckoutMode, CheckoutChangeEvent } from "../pages/kosar";

import { html } from "lit-html";
import { HauntedFunc } from "../util/customhooks";
import "../ui/dc-components";
import * as DC from "../ui/dc-components-typing";

const observedAttributes: (keyof Properties)[] = [];
const useShadowDOM = false;
const name = "te-payment-modes";

const DEFAULTS: Properties = {
	mode: "HIDDEN",
	checkoutData: new CheckoutData(),
};

interface Properties {
	mode: CheckoutMode;
	checkoutData: CheckoutData;
}

export type PaymentMode = "cash" | "bank_transfer" | "card" | "none";

const PAYMENT_MODES: { [key in PaymentMode]: string } = {
	cash: "Készpénz",
	bank_transfer: "Banki átutalás",
	card: "Bankkártya",
	none: "Nincs kiválasztva",
};

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		mode: host.mode !== undefined ? host.mode : DEFAULTS.mode,
		checkoutData: host.checkoutData !== undefined ? host.checkoutData : DEFAULTS.checkoutData,
	};

	const [checkoutData, setCheckoutData] = useState<CheckoutData>(props.checkoutData);

	useEffect(() => {
		setCheckoutData(props.checkoutData);
	}, [props.checkoutData]);

	const handleChange = (e: DC.Radio.ChangeEvent) => {
		const paymentMode = e.detail.itemId as PaymentMode;
		CheckoutData.setPaymentMode(checkoutData, paymentMode);
		host.dispatchEvent(new CheckoutChangeEvent({ checkoutData }));
	};

	// TEMPLATE

	const header = () => {
		return html`<h1 class="text-2xl leading-tight font-semibold">Fizetési mód</h1>`;
	};

	const normalTemplate = () => {
		return html`<div>
			${header()}
			<div class="p-2 border bg-yellow-100">
				<div class="mb-2">
					<dc-radio
						.name=${"paymentMode"}
						.itemId=${"bank_transfer"}
						.checked=${checkoutData.paymentMode === "bank_transfer"}
						.content=${html`${PAYMENT_MODES.bank_transfer}`}
						@change=${handleChange}
					></dc-radio>
				</div>
				<div>
					<dc-radio
						.name=${"paymentMode"}
						.itemId=${"cash"}
						.checked=${checkoutData.paymentMode === "cash"}
						@change=${handleChange}
						.content=${html`<div>
							${PAYMENT_MODES.cash}
						</div>`}
					></dc-radio>
				</div>
				<!-- <div class="mb-2">
					<dc-radio
						.name=${"paymentMode"}
						.itemId=${"card"}
						@change=${handleChange}
						.content=${html`<div>
					<div>Kártya</div>
				</div>`}
					></dc-radio>
				</div> -->
			</div>
		</div> `;
	};

	const collapsedTemplate = () => {
		return html`<div>
			${header()}
			<div class="p-2 border bg-gray-100">
				${PAYMENT_MODES[checkoutData.paymentMode]}
			</div>
		</div> `;
	};

	if (props.mode === "OPEN") {
		return normalTemplate();
	} else if (props.mode === "COLLAPSED") {
		return collapsedTemplate();
	} else {
		return "";
	}
};

if (customElements.get(name) === undefined) {
	customElements.define(
		name,
		component<HTMLElement & Properties>(Component, {
			useShadowDOM,
			observedAttributes,
		})
	);
}

// React Wrapper

import React from "react";
import useCustomElement from "../util/useCustomElement";
import { CheckoutData } from "../models/v1/CheckoutData";

const PaymentModes = (props) => {
	const [ref] = useCustomElement(props);
	return (
		<div>
			<te-payment-modes ref={ref} />
		</div>
	);
};

export default PaymentModes;
