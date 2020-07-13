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
};

interface Properties {
	mode: CheckoutMode;
	checkoutData?: CheckoutData;
}

interface ChangeEventDetail {
	value: string;
}

export type PaymentMode = "cash" | "bank_transfer" | "card" | "none";

export class ChangeEvent extends CustomEvent<ChangeEventDetail> {
	constructor(detail: ChangeEventDetail) {
		super("change", { detail });
	}
}

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		mode: host.mode !== undefined ? host.mode : DEFAULTS.mode,
		checkoutData: host.checkoutData !== undefined ? host.checkoutData : DEFAULTS.checkoutData,
	};

	const [checkoutData, setCheckoutData] = useState<CheckoutData>(new CheckoutData());

	const handleChange = (e: DC.Radio.ChangeEvent) => {
		const paymentMode = e.detail.itemId as PaymentMode;
		checkoutData.setPaymentMode(paymentMode);
		host.dispatchEvent(new CheckoutChangeEvent({ checkoutData }));
	};

	// TEMPLATE

	const normalTemplate = () => {
		return html`<div>
			<h1 class="text-2xl leading-tight font-semibold">Fizetési mód</h1>
			<div class="p-2 border bg-yellow-100">
				<div class="mb-2">
					<dc-radio
						.name=${"paymentMode"}
						.itemId=${"bank_transfer"}
						.content=${html`Átutalás`}
						@change=${handleChange}
					></dc-radio>
				</div>
				<div>
					<dc-radio
						.name=${"paymentMode"}
						.itemId=${"cash"}
						@change=${handleChange}
						.content=${html`<div>
							<div>Készpénz</div>
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
			<h1 class="text-2xl leading-tight font-semibold">Fizetési mód</h1>
			<div class="p-2 border bg-gray-100">
				Átutalás
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
