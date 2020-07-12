import Product from "../interfaces/Product";
import { ShoppingCart as ShoppingCartV1 } from "../models/v1/ShoppingCart";
import { Dispatch } from "react";
import { GlobalAction } from "../context/GlobalContextProvider";

const ONE_WEEK_IN_MILLISECONDS = 604800000;

export class CartManager {
	private localStorage: Storage;

	constructor(localStorage: Storage) {
		this.localStorage = localStorage;
	}

	private saveShoppingCart = (shoppingCart: ShoppingCartV1) => {
		this.localStorage.shoppingCart = JSON.stringify(shoppingCart);
		this.localStorage.shoppingCartVersion = shoppingCart.version;
	};

	private removeShoppingCart = () => {
		this.localStorage.removeItem("shoppingCart");
		this.localStorage.removeItem("shoppingCartVersion");
	};

	public removeItem = (itemId: string, globalDispatch: Dispatch<GlobalAction>) => {
		const shoppingCart = this.getShoppingCart();
		shoppingCart.removeItem(itemId);
		this.saveShoppingCart(shoppingCart);
		globalDispatch({ type: "SET_CART_ITEM_NUM", num: shoppingCart.items.length });
	};

	public addQuantity = (itemId: string, quantity: number) => {
		const shoppingCart = this.getShoppingCart();
		shoppingCart.addQuantity(itemId, quantity);
		this.saveShoppingCart(shoppingCart);
    };

    public setQuantity = (itemId: string, quantity: number) => {
		const shoppingCart = this.getShoppingCart();
		shoppingCart.setQuantity(itemId, quantity);
		this.saveShoppingCart(shoppingCart);
	};

	public addToCart = (product: Product, quantity: number, globalDispatch: Dispatch<GlobalAction>) => {
		const shoppingCart = this.getShoppingCart();
		shoppingCart.addProduct(product, quantity);
		this.saveShoppingCart(shoppingCart);
		globalDispatch({ type: "SET_CART_ITEM_NUM", num: shoppingCart.items.length });
	};

	public sum() {
		const shoppingCart = this.getShoppingCart();
		return shoppingCart.sum();
	}

	public getShoppingCart = (): ShoppingCartV1 => {
		if (this.localStorage.shoppingCart) {
			if (this.localStorage.shoppingCartVersion === "v1") {
				const shoppingCart = new ShoppingCartV1(JSON.parse(this.localStorage.shoppingCart));
				if (shoppingCart.lastUpdated < new Date().getTime() - ONE_WEEK_IN_MILLISECONDS) {
					this.removeShoppingCart();
					return new ShoppingCartV1();
				} else {
					return shoppingCart;
				}
			} else {
				this.removeShoppingCart();
				return new ShoppingCartV1();
			}
		} else {
			return new ShoppingCartV1();
		}
	};
}
