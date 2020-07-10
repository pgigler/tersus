import { ShoppingCartItem } from "./ShoppingCartItem";
import Product from "../interfaces/Product";

export class ShoppingCart {
	public creationDate: number = new Date().getTime();
	public items: ShoppingCartItem[] = [];

	constructor(obj?: ShoppingCart) {
		if (obj !== undefined) {
			Object.assign(this, obj);
		}
	}

	public addProduct(product: Product, quantity: number) {
		const filteredItems = this.items.filter((item) => item.id === product.id);
		if (filteredItems.length > 0) {
			this.items[0].quantity += quantity;
		} else {
			this.items.push(new ShoppingCartItem(product, quantity));
		}
	}
}
