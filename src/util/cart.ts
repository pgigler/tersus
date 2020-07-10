import Product from "../interfaces/Product";
import { ShoppingCart } from "./ShoppingCart";
import { Dispatch } from "react";
import { GlobalAction } from "../context/GlobalContextProvider";

const saveShoppingCart = (shoppingCart: ShoppingCart) => {
	window.localStorage.shoppingCart = JSON.stringify(shoppingCart);
};

export const addToCart = (product: Product, quantity: number, globalDispatch: Dispatch<GlobalAction>) => {
	const shoppingCart = getShoppingCart();
	shoppingCart.addProduct(product, quantity);
	saveShoppingCart(shoppingCart);
	globalDispatch({ type: "SET_CART_ITEM_NUM", num: shoppingCart.items.length });
};

export const getShoppingCart = (): ShoppingCart => {
	if (window.localStorage.shoppingCart) {
		return new ShoppingCart(JSON.parse(window.localStorage.shoppingCart));
	} else {
		return new ShoppingCart();
	}
};
