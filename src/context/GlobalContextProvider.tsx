import React, { useReducer, createContext, Dispatch } from "react";
import { CartManager } from "../util/CartManager";
import { isBrowser } from "../util/helper";
import { useEffect } from "../util/customhooks";

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
	useEffect(() => {
		dispatch({
			type: "SET_CART_ITEM_NUM",
			num: new CartManager(window.localStorage).getShoppingCart().sum(),
		});
	}, []);

	const [state, dispatch] = useReducer(reducer, {
		numberOfItems: 0,
	});
	return (
		<GlobalStateContext.Provider value={state}>
			<GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
		</GlobalStateContext.Provider>
	);
};

export default GlobalContextProvider;
