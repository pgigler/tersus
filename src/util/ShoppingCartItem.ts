import Product from "../interfaces/Product";

export class ShoppingCartItem {
	public id: string;
	public name: string;
	public subtitle: string;
	public imagename: string;
	public price: string;
	public quantity: number;

	public constructor(product: Product, quantity: number) {
		this.id = product.id;
		this.name = product.name;
		this.subtitle = product.subtitle;
		this.imagename = product.imagename;
		this.price = product.price;
		this.quantity = quantity;
	}
}
