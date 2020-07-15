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

	public setQuantity(itemId: string, quantity: number) {
		const filteredItems = this.items.filter((item) => item.id === itemId);
		if (filteredItems.length > 0) {
			const itemToChange = filteredItems[0];
			if (quantity < 1) {
				itemToChange.quantity = 1;
			} else if (quantity > 10) {
				itemToChange.quantity = 10;
			} else {
				itemToChange.quantity = quantity;
			}
		} else {
			throw new Error(`item not found: ${itemId}`);
		}
		this.lastUpdated = new Date().getTime();
	}

	public addProduct(product: Product, quantity: number) {
		if (quantity > 0) {
			const filteredItems = this.items.filter((item) => item.id === product.id);
			if (filteredItems.length > 0) {
				filteredItems[0].quantity += Math.min(10 - filteredItems[0].quantity, quantity);
			} else {
				this.items.push(new ShoppingCartItem(product, Math.min(quantity, 10)));
			}
			this.lastUpdated = new Date().getTime();
		}
	}

	public sum() {
		return this.items.reduce((aggr, curr) => {
			return aggr + curr.quantity;
		}, 0);
	}

	public priceSum() {
		return this.items.reduce((aggr, curr) => {
			return aggr + curr.quantity * parseFloat(curr.price);
		}, 0);
	}
}
