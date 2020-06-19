import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import products from "../data/products.json";
import { useStaticQuery, graphql } from "gatsby";
import { getFixed } from "../util/helper";
import Img from "gatsby-image";

const ProductItemTemplate = ({ pageContext }) => {
	const data = useStaticQuery(graphql`
		query ProductItemQuery {
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
			<SEO title="Product" />
			<div className="container">
				<div className="pt-4 px-4">
					{products
						.filter((product) => product.id === pageContext.productId)
						.map((product) => (
							<div className="flex flex-wrap md:flex-column mb-8" id={product.id}>
								<div className="w-full md:w-1/2 text-center mb-8">
									<h1 className="text-4xl leading-tight font-semibold mb-4">{product.name}</h1>
									<div>
										<Img
											fixed={getFixed(data.allFile.edges, product.imagename)}
											alt="{product.name}"
										/>
									</div>
									<div className="text-xl font-semibold">{product.price} Ft</div>
									<button className="mt-4 btn btn-primary">Kosárba</button>
								</div>
								<div className="w-full md:w-1/2">
									<h2 className="pt-1 text-xl leading-tight uppercase font-semibold">
										{product.subtitle}
									</h2>
									{product.sections ? (
										<div>
											{product.sections.map((section) => (
												<div>
													{section.title !== "" ? (
														<h2 className="pt-8 pb-2 text-2xl leading-tight font-semibold">
															{section.title}
														</h2>
													) : (
														""
													)}
													{section.ps?.map((ps) => (
														<div className="mt-3">{ps}</div>
													))}
													{section.subsections?.map((subsection) => (
														<div className="mt-3">
															<h3 className="pt-8 pb-2 text-lg leading-tight font-semibold">
																{subsection.title}
															</h3>
															{subsection.ps.map((ps) => (
																<div className="mt-3">{ps}</div>
															))}
														</div>
													))}
												</div>
											))}
											<div className="mt-4">
												{product.warnings.map((warning) => (
													<div className="text-red-500 font-semibold">{warning}</div>
												))}
											</div>
										</div>
									) : (
										""
									)}
								</div>
							</div>
						))}
				</div>
				<div className="clearfix"></div>
			</div>
		</Layout>
	);
};

export default ProductItemTemplate;
