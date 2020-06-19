import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import products from "../data/products.json";
import productCategories from "../data/product_categories.json";
import { getFixed } from "../util/helper";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

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
		}
	`);
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
					<div id={category.id}>
						<h1 className="pt-16 text-4xl leading-tight text-center font-semibold">{category.name}</h1>
						<div className="flex flex-wrap">
							{products
								.filter((product) => product.category === category.id)
								.map((product) => (
									<div className="w-full sm:w-1/2 lg:w-1/4 px-12 py-12" id={product.id}>
										<Link to={`/products/${product.id}`}>
											<div className="flex flex-col items-center">
												<div>
													<Img
														fixed={getFixed(data.allFile.edges, product.imagename)}
														alt="{product.name}"
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
