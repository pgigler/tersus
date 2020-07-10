import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { useStaticQuery, graphql } from "gatsby";
import { getProducts } from "../util/helper";
import Product from "../interfaces/Product";

const ShoppingCartPage = () => {
	const data = useStaticQuery(graphql`
		query ShoppingCartPageQuery {
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
			<SEO title="Kosár" />
			<div className="container px-4">
				<h1 className="pt-12 text-4xl leading-tight font-semibold">Kosár</h1>
				<div></div>
			</div>
		</Layout>
	);
};

export default ShoppingCartPage;
