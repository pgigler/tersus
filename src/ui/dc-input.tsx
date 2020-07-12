import { useEffect, useState, component } from "haunted";
import "./dc-input.scss";

import { html } from "lit-html";
import { HauntedFunc } from "../util/customhooks";

const observedAttributes: (keyof Properties)[] = ["value", "label"];
const useShadowDOM = false;
const name = "dc-input";

const DEFAULTS: Properties = {
	label: "",
	placeholder: "",
	value: "",
	readonly: false,
};

interface Properties {
	label: string;
	placeholder: string;
	value: string;
	validationMessage?: string;
	readonly?: boolean;
}

interface ChangeEventDetail {
	value: string;
}

export class ChangeEvent extends CustomEvent<ChangeEventDetail> {
	constructor(detail: ChangeEventDetail) {
		super("change", { detail });
	}
}

interface KeyUpEventDetail {
	keyCode: number;
}

export class KeyUpEvent extends CustomEvent<KeyUpEventDetail> {
	constructor(detail: KeyUpEventDetail) {
		super("keyup", { detail });
	}
}

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		label: host.label !== undefined ? host.label : DEFAULTS.label,
		placeholder: host.placeholder !== undefined ? host.placeholder : DEFAULTS.placeholder,
		value: host.value !== undefined ? host.value : DEFAULTS.value,
		validationMessage: host.validationMessage,
		readonly: host.readonly !== undefined ? host.readonly : DEFAULTS.readonly,
	};

	// Event Handlers

	const onChange = (e: CustomEvent) => {
		if (!props.readonly) {
			e.stopPropagation();
			host.dispatchEvent(
				new ChangeEvent({
					value: (e.currentTarget as any).value,
				})
			);
		}
	};

	const onKeyUp = (e: KeyboardEvent) => {
		if (!props.readonly) {
			e.stopPropagation();
			host.dispatchEvent(
				new KeyUpEvent({
					keyCode: e.keyCode,
				})
			);
		}
	};

	// COMPONENT

	const [componentId, setComponentId] = useState<string>("");

	useEffect(() => {
		const elem = document.getElementById(componentId) as HTMLInputElement;

		if (elem) {
			elem.value = props.value;
		}
	}, [props.value]);

	useEffect(() => {
		const id = `_${name}_${Math.random().toString(36).substr(2, 9)}`;
		setComponentId(id);
	}, []);

	// TEMPLATE

	return html`
		${props.label !== undefined ? html`<label class="form-label">${props.label}</label>` : ""}
		<input
			id=${componentId}
			class=${props.validationMessage ? "invalid" : ""}
			value=${props.value}
			?readonly=${props.readonly}
			@change=${onChange}
			@keyup=${onKeyUp}
			placeholder=${props.placeholder}
		/>
		${props.validationMessage ? html` <div class="validation-result">${props.validationMessage}</div> ` : ""}
	`;
};

customElements.define(
	name,
	component<HTMLElement & Properties>(Component, {
		useShadowDOM,
		observedAttributes,
	})
);

// React

import React from "react";
import useCustomElement from "../util/useCustomElement";

const DCInput = (props) => {
	const [ref] = useCustomElement(props);
	return <dc-input ref={ref} />;
};

export default DCInput;
