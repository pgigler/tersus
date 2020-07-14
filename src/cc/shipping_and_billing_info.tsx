import { useEffect, useState, component } from "haunted";
import { CheckoutMode, CheckoutChangeEvent } from "../pages/kosar";
import homeDeliveryPlaces from "../../data/home_delivery_places.json";

import { html } from "lit-html";
import { HauntedFunc } from "../util/customhooks";
import "../ui/dc-components";
import * as DC from "../ui/dc-components-typing";

const observedAttributes: (keyof Properties)[] = [];
const useShadowDOM = false;
const name = "te-shipping-and-billing";

const DEFAULTS: Properties = {
	mode: "HIDDEN",
	checkoutData: new CheckoutData(),
};

interface Properties {
	mode: CheckoutMode;
	checkoutData: CheckoutData;
}

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		mode: host.mode !== undefined ? host.mode : DEFAULTS.mode,
		checkoutData: host.checkoutData !== undefined ? host.checkoutData : DEFAULTS.checkoutData,
	};

	const [checkoutData, setCheckoutData] = useState<CheckoutData>(props.checkoutData);

	useEffect(() => {
		setCheckoutData(props.checkoutData);
	}, [props.checkoutData]);

	// const handleChange = (e: any) => {
	// 	host.dispatchEvent(new CheckoutChangeEvent({ checkoutData }));
	// };

	// TEMPLATE

	const normalTemplate = () => {
		return html`<div>
			<h1 class="text-2xl leading-tight font-semibold">Szállítási és számlázási infók</h1>
			<div class="p-2 border bg-yellow-100">
				Something N
			</div>
		</div> `;
	};

	const collapsedTemplate = () => {
		return html`<div>
			<h1 class="text-2xl leading-tight font-semibold">Szállítási és számlázási infók</h1>
			<div class="p-2 border bg-gray-100">
				Something C
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

const ShippingAndBillingInfo = (props) => {
	const [ref] = useCustomElement(props);
	return (
		<div>
			<te-shipping-and-billing ref={ref} />
		</div>
	);
};

export default ShippingAndBillingInfo;
