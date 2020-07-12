import React, { useEffect, useState, useMemo, useContext } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { useStaticQuery, graphql } from "gatsby";
import { getProducts, getFixed } from "../util/helper";
import Product from "../interfaces/Product";
import { CartManager } from "../util/CartManager";
import { ShoppingCartItem } from "../models/v1/ShoppingCartItem";
import Img from "gatsby-image";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";

const ShoppingCartPage = () => {
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

	useEffect(() => {
		const products = getProducts(data.allMarkdownRemark.edges[0].node);
		setProducts(products);
	}, []);

	const globalDispatch = useContext(GlobalDispatchContext);
	const [products, setProducts] = useState<Product[]>([]);
	const cartManager = useMemo(() => new CartManager(window.localStorage), []);

	const [shoppingCart, setShoppingCart] = useState(cartManager.getShoppingCart());

	const itemTemplate = (item: ShoppingCartItem) => (
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
				<div className="flex justify-between pb-4">
					<div className="flex">
						<div>
							<button
								className="mr-2 rounded-full bg-brand-blue w-6 border font-bold"
								onClick={() => {
									cartManager.addQuantity(item.id, -1);
									setShoppingCart(cartManager.getShoppingCart());
								}}
							>
								-
							</button>
						</div>
						<div className="w-8 mr-2">
							<input
								type="text"
								className="border w-full pl-1"
								value={item.quantity.toString()}
								onChange={(e) => {
									try {
										const quantity = parseInt(e.target.value, 10);
										cartManager.setQuantity(item.id, quantity);
										setShoppingCart(cartManager.getShoppingCart());
									} catch (ex) {
										// continue regardless of parsing error
									}
								}}
								name="quantity"
							/>
						</div>
						<div>
							<button
								className="rounded-full bg-brand-blue w-6 border font-bold"
								onClick={() => {
									cartManager.addQuantity(item.id, 1);
									setShoppingCart(cartManager.getShoppingCart());
								}}
							>
								+
							</button>
						</div>
					</div>
					<div>{item.price} Ft</div>
				</div>
			</div>
		</div>
	);

	return (
		<Layout>
			<SEO title="Kosár" />
			<div className="container px-4">
				<h1 className="py-4 text-4xl leading-tight font-semibold">Kosár</h1>
				{shoppingCart.items.map((item) => itemTemplate(item))}
				<div>Összesen: {shoppingCart.sum()}</div>
			</div>
		</Layout>
	);
};

export default ShoppingCartPage;
