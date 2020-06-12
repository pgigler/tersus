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
			allFile(filter: { relativePath: { in: ["products/alga-sokk_p.jpg", "products/stabil_klor.jpg"] } }) {
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
				<div>
					<ul className="flex flex-wrap w-full justify-around m-4">
						{productCategories.map((category) => (
							<li>
								<Link to={category.slug} className="link">
									{category.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{productCategories.map((category) => (
					<div id={category.id}>
						<h1 className="pt-16 text-4xl text-red-500 leading-tight font-semibold">{category.name}</h1>
						{products
							.filter((product) => product.category === category.id)
							.map((product) => (
								<div className="flex flex-wrap md:flex-column mb-8" id={product.id}>
									<div className="p-8 w-full xl:w-1/2 text-center">
										<Img
											fixed={getFixed(data.allFile.edges, product.imagename)}
											alt="{product.name}"
										/>
									</div>
									<div className="w-full xl:w-1/2">
										<h1 className="pt-12 text-4xl leading-tight font-semibold">{product.name}</h1>
										<h2 className="pt-1 text-xl leading-tight font-semibold">{product.subtitle}</h2>
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
				))}
			</div>
		</Layout>
	);
};

export default ProductsPage;
