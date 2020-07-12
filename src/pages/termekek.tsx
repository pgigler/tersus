import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import productCategories from "../../data/product_categories.json";
import { getFixed, getProducts } from "../util/helper";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Product from "../interfaces/Product";

const ProductsPage = () => {
	const data = useStaticQuery(graphql`
		query ProductsPageQuery {
			allFile(filter: { extension: { regex: "/(jpg)|(png)|(jpeg)/" }, relativeDirectory: { eq: "products" } }) {
				edges {
					node {
						relativePath
						childImageSharp {
							fixed(width: 200) {
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

	const [products, setProducts] = useState<Product[]>([]);
	return (
		<Layout>
			<SEO title="Termékek" />
			<div className="container text-lg px-4">
				{/* <div>
					<ul className="flex flex-wrap w-full justify-around m-4">
						{productCategories.map((category) => (
							<li>
								<Link to={category.slug} className="link">
									{category.name}
								</Link>
							</li>
						))}
					</ul>
				</div> */}

				{productCategories.map((category) => (
					<div key={category.id} id={category.id}>
						<h1 className="pt-16 text-4xl leading-tight text-center font-semibold">{category.name}</h1>
						<div className="flex flex-wrap">
							{products
								.filter((product) => product.category === category.id)
								.map((product) => (
									<div
										key={product.id}
										className="w-full sm:w-1/2 lg:w-1/4 px-12 py-12"
										id={product.id}
									>
										<Link to={`/termekek/${product.id}`}>
											<div className="flex flex-col items-center">
												<div>
													<Img
														fixed={getFixed(data.allFile.edges, product.imagename)}
														alt={product.name}
													/>
												</div>
												<div className="text-center text-xl font-semibold">{product.name}</div>
												<div className="text-center">{product.price} Ft</div>
											</div>
										</Link>
									</div>
								))}
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
};

export default ProductsPage;
