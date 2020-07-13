import { useEffect, useState, component } from "haunted";
import { CheckoutMode, CheckoutChangeEvent } from "../pages/kosar";

import { html } from "lit-html";
import { HauntedFunc } from "../util/customhooks";
import "../ui/dc-components";
import * as DC from "../ui/dc-components-typing";

const observedAttributes: (keyof Properties)[] = [];
const useShadowDOM = false;
const name = "te-transport-modes";

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

export type TransportMode = "personal_collection" | "home_delivery" | "none";

const TRANSPORT_MODES: { [key in TransportMode]: string } = {
	personal_collection: "Személyes átvétel",
	home_delivery: "Házhozszállítás",
	none: "Nincs kiválasztva",
};

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
		const transportMode = e.detail.itemId as TransportMode;
		checkoutData.setTransportMode(transportMode);
		host.dispatchEvent(new CheckoutChangeEvent({ checkoutData }));
	};

	// TEMPLATE

	const normalTemplate = () => {
		return html`<div>
			<h1 class="text-2xl leading-tight font-semibold">Szállítási mód</h1>
			<div class="p-2 border bg-yellow-100">
				<div class="mb-2">
					<dc-radio
						.name=${"deliveryMode"}
						.itemId=${"personal_collection"}
						.checked=${checkoutData.transportMode === "personal_collection"}
						@change=${handleChange}
						.content=${html`<div>
							<div>${TRANSPORT_MODES.personal_collection}</div>
						</div>`}
					></dc-radio>
				</div>
				<div>
					<dc-radio
						.name=${"deliveryMode"}
						.itemId=${"home_delivery"}
						.checked=${checkoutData.transportMode === "home_delivery"}
						.content=${html`${TRANSPORT_MODES.home_delivery}`}
						@change=${handleChange}
					></dc-radio>
				</div>
			</div>
		</div> `;
	};

	const collapsedTemplate = () => {
		return html`<div>
			<h1 class="text-2xl leading-tight font-semibold">Szállítási mód</h1>
			<div class="p-2 border bg-gray-100">
				${TRANSPORT_MODES[checkoutData.transportMode]}
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

const TransportModes = (props) => {
	const [ref] = useCustomElement(props);
	return (
		<div>
			<te-transport-modes ref={ref} />
		</div>
	);
};

export default TransportModes;
