import { ShoppingCartItem } from "./ShoppingCartItem";
import Product from "../../interfaces/Product";

export class ShoppingCart {
	public creationDate: number = new Date().getTime();
	public lastUpdated: number = new Date().getTime();
	public version = "v1";
	public items: ShoppingCartItem[] = [];

	constructor(obj?: ShoppingCart) {
		if (obj !== undefined) {
			Object.assign(this, obj);
		}
	}

	public removeItem(itemId: string) {
		this.items = this.items.filter((item) => item.id !== itemId);
		this.lastUpdated = new Date().getTime();
	}

	public addQuantity(itemId: string, quantity: number) {
		const filteredItems = this.items.filter((item) => item.id === itemId);
		if (filteredItems.length > 0) {
			const itemToChange = filteredItems[0];
			itemToChange.quantity += quantity;
			// Quantity can beetween 0-10 (inclusive)
			if (itemToChange.quantity < 0) {
				itemToChange.quantity = 0;
			}
			if (itemToChange.quantity > 10) {
				itemToChange.quantity = 10;
			}
		} else {
			throw new Error(`item not found: ${itemId}`);
		}
		this.lastUpdated = new Date().getTime();
	}

	public setQuantity(itemId: string, quantity: number) {
		const filteredItems = this.items.filter((item) => item.id === itemId);
		if (filteredItems.length > 0) {
			if (quantity >= 0 && quantity < 11) {
				const itemToChange = filteredItems[0];
				itemToChange.quantity = quantity;
			}
		} else {
			throw new Error(`item not found: ${itemId}`);
		}
		this.lastUpdated = new Date().getTime();
	}

	public addProduct(product: Product, quantity: number) {
		const filteredItems = this.items.filter((item) => item.id === product.id);
		if (filteredItems.length > 0) {
			filteredItems[0].quantity += quantity;
		} else {
			this.items.push(new ShoppingCartItem(product, quantity));
		}
		this.lastUpdated = new Date().getTime();
	}

	public sum() {
		return this.items.reduce((aggr, curr) => {
			return aggr + curr.quantity * parseFloat(curr.price);
		}, 0);
	}
}
