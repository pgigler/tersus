import React, { useReducer, createContext, Dispatch } from "react";
import { CartManager } from "../util/CartManager";

interface GlobalState {
	numberOfItems: number;
}

export interface GlobalAction {
	type: "SET_CART_ITEM_NUM";
	num: number;
}

export const GlobalStateContext = createContext({} as GlobalState);
export const GlobalDispatchContext = createContext({} as Dispatch<GlobalAction>);

const initialState: GlobalState = {
	numberOfItems: 0,
};

function reducer(state: GlobalState, action: GlobalAction) {
	switch (action.type) {
		case "SET_CART_ITEM_NUM":
			return {
				...state,
				numberOfItems: action.num,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}

const GlobalContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		numberOfItems: new CartManager(window.localStorage).getShoppingCart().items.length,
	});
	return (
		<GlobalStateContext.Provider value={state}>
			<GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
		</GlobalStateContext.Provider>
	);
};

export default GlobalContextProvider;
