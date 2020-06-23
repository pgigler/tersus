import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ProductItem from "../components/product-item";
import { useStaticQuery, graphql } from "gatsby";
import Product from "../interfaces/Product";
import { getProducts } from "../util/helper";

const ProductPageTemplate = ({ pageContext }) => {
	const data = useStaticQuery(graphql`
		query ProductPageTemplateQuery {
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
	});

	const [products, setProducts] = useState<Product[]>([]);

	return (
		<Layout>
			<SEO title="Product" />
			<div className="container">
				<div className="pt-4 px-4">
					{products
						.filter((product) => product.id === pageContext.productId)
						.map((product) => (
							<ProductItem
								key={product.id}
								product={product}
								fixedImageEdges={data.allFile.edges}
								isPreview={false}
							/>
						))}
				</div>
				<div className="clearfix"></div>
			</div>
		</Layout>
	);
};

export default ProductPageTemplate;
