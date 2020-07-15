import React, { useEffect, useState, useMemo, useContext } from "react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import { getProducts, getFixed, formatMoney } from "../util/helper";
import Product from "../interfaces/Product";
import { CartManager } from "../util/CartManager";
import { ShoppingCartItem } from "../models/v1/ShoppingCartItem";
import Img from "gatsby-image";
import { GlobalDispatchContext, GlobalStateContext } from "../context/GlobalContextProvider";
import DCInput, { ChangeEvent } from "../ui/dc-input";

const ShoppingCart = ({ summary }: { summary?: boolean } = { summary: false }) => {
	const data = useStaticQuery(graphql`
		query ShoppingCartPageQuery {
			allFile(filter: { extension: { regex: "/(jpg)|(png)|(jpeg)/" }, relativeDirectory: { eq: "products" } }) {
				edges {
					node {
						relativePath
						childImageSharp {
							fixed(width: 100) {
								...GatsbyImageSharpFixed
							}
						}
					}
				}
			}
			allMarkdownRemark(filter: { frontmatter: { title: { eq: "products" } } }) {
				edges {
					node {
						frontmatter {
							content {
								code
							}
						}
					}
				}
			}
		}
	`);

	const setQuantity = (itemIndex: number, val: string) => {
		setQuantities(
			quantities.map((q, i) => {
				if (itemIndex === i) {
					return val;
				} else {
					return q;
				}
			})
		);
	};

	useEffect(() => {
		const products = getProducts(data.allMarkdownRemark.edges[0].node);
		setProducts(products);
	}, []);

	const globalDispatch = useContext(GlobalDispatchContext);
	const globalState = useContext(GlobalStateContext);
	const [, setProducts] = useState<Product[]>([]);
	const cartManager = useMemo(() => new CartManager(window.localStorage), []);

	const [shoppingCart, setShoppingCart] = useState(cartManager.getShoppingCart());
	const [quantities, setQuantities] = useState<string[]>(
		cartManager.getShoppingCart().items.map((item) => item.quantity.toString())
	);

	useEffect(() => {
		const tempShoppingCart = cartManager.getShoppingCart();
		const newQuantities = quantities.map((q, i) => {
			let newQuantity = tempShoppingCart.items[i].quantity;
			newQuantity = parseInt(q, 10);
			if (isNaN(newQuantity)) {
				newQuantity = tempShoppingCart.items[i].quantity;
			} else if (tempShoppingCart.items[i].quantity !== newQuantity) {
				tempShoppingCart.setQuantity(tempShoppingCart.items[i].id, newQuantity);
				if (tempShoppingCart.items[i].quantity !== newQuantity) {
					newQuantity = tempShoppingCart.items[i].quantity;
				}
			}

			return newQuantity.toString();
		});
		cartManager.saveShoppingCart(tempShoppingCart);
		setShoppingCart(cartManager.getShoppingCart());
		globalDispatch({ type: "SET_CART_ITEM_NUM", num: tempShoppingCart.sum() });
		if (quantities.filter((q, i) => newQuantities[i] !== q).length > 0) {
			setQuantities(newQuantities);
		}
	}, [quantities]);

	const summaryTemplate = (item: ShoppingCartItem) => (
		<div key={item.id} className="flex p-2 border bg-gray-100 mb-2">
			<div className="px-2 w-full flex justify-between">
				<div>
					<span className="checkout-data">{item.name}</span>
				</div>
				<div>
					<span className="checkout-data">
						{item.quantity} X {formatMoney(item.price)}
					</span>
				</div>
			</div>
		</div>
	);

	const itemTemplate = (item: ShoppingCartItem, itemIndex: number) => (
		<div key={item.id} className="flex p-2 border bg-yellow-100 mb-2">
			<div>
				<Img fixed={getFixed(data.allFile.edges, item.imagename)} alt={item.name} />
			</div>
			<div className="px-2 w-full flex flex-col justify-between">
				<div className="flex justify-between">
					<div>{item.name}</div>
					<div>
						<button
							onClick={() => {
								cartManager.removeItem(item.id, globalDispatch);
								setShoppingCart(cartManager.getShoppingCart());
							}}
						>
							<svg
								className="h-6 w-6 fill-current"
								viewBox="0 0 1792 1792"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
							</svg>
						</button>
					</div>
				</div>
				<div className="flex justify-between items-end flex-wrap pb-4">
					<div className="flex items-center">
						<div>
							<button
								className="mr-2 rounded-full bg-brand-blue w-10 h-10 border font-bold focus:outline-none"
								onClick={() => {
									setQuantity(itemIndex, (shoppingCart.items[itemIndex].quantity - 1).toString());
								}}
							>
								-
							</button>
						</div>
						<div className="w-12 mr-2">
							<DCInput
								embedded={true}
								value={quantities[itemIndex]}
								onChange={(e: ChangeEvent) => {
									setQuantity(itemIndex, e.detail.value);
								}}
							></DCInput>
						</div>
						<div>
							<button
								className="rounded-full bg-brand-blue w-10 h-10 border font-bold focus:outline-none"
								onClick={() => {
									setQuantity(itemIndex, (shoppingCart.items[itemIndex].quantity + 1).toString());
								}}
							>
								+
							</button>
						</div>
					</div>
					<div className="pt-4">{formatMoney(item.price)}</div>
				</div>
			</div>
		</div>
	);

	return (
		<div>
			{globalState.numberOfItems > 0 ? (
				<div>
					<h1 className="text-2xl leading-tight font-semibold">Termékek</h1>
					<div>
						{summary
							? shoppingCart.items.map((item) => summaryTemplate(item))
							: shoppingCart.items.map((item, i) => itemTemplate(item, i))}
						<div className="flex justify-end w-full">
							<div className="flex items-baseline">
								<div className="font-bold text-2xl mr-2">Összesen:</div>
								<div className="font-bold text-green-500 text-3xl">
									{formatMoney(shoppingCart.priceSum())}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>
					<div className="py-8 text-2xl">A kosara üres</div>
					<div className="flex justify-end">
						<button
							className="btn btn-primary ml-4"
							onClick={() => {
								navigate("/termekek");
							}}
						>
							Tovább a termékekhez
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShoppingCart;
