import { useEffect, useState, component } from "haunted";
import { CheckoutMode } from "../pages/kosar";

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
}

interface ChangeEventDetail {
	value: string;
}

export class ChangeEvent extends CustomEvent<ChangeEventDetail> {
	constructor(detail: ChangeEventDetail) {
		super("change", { detail });
	}
}

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		mode: host.mode !== undefined ? host.mode : DEFAULTS.mode,
	};

	const handleChange = (e: DC.Radio.ChangeEvent) => {
		// eslint-disable-next-line no-console
		console.log(e.detail.itemId);
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
						@change=${handleChange}
						.content=${html`<div>
							<div>Személyes átvétel</div>
						</div>`}
					></dc-radio>
				</div>
				<div>
					<dc-radio
						.name=${"deliveryMode"}
						.itemId=${"home_delivery"}
						.content=${html`Házhozszállítás`}
						@change=${handleChange}
					></dc-radio>
				</div>
			</div>
		</div> `;
	};

	const collapsedTemplate = () => {
		return html`<div>
			<h1 className="text-2xl leading-tight font-semibold">Szállítási mód</h1>
			<div class="p-2 border bg-yellow-100">
				Személyes
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

customElements.define(
	name,
	component<HTMLElement & Properties>(Component, {
		useShadowDOM,
		observedAttributes,
	})
);

// React Wrapper

import React from "react";
import useCustomElement from "../util/useCustomElement";

const TransportModes = (props) => {
	const [ref] = useCustomElement(props);
	return (
		<div>
			<te-transport-modes ref={ref} />
		</div>
	);
};

export default TransportModes;
