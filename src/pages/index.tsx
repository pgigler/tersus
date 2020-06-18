import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { getFluid } from "../util/helper";
import BackgroundImage from "gatsby-background-image";
import productCategories from "../data/product_categories.json";
import GetInTouch from "../components/get-in-touch";

const IndexPage = () => {
	const data = useStaticQuery(graphql`
		query IndexPageQuery {
			allFile(filter: { relativePath: { in: ["banner/home3.png"] } }) {
				edges {
					node {
						relativePath
						childImageSharp {
							fluid(maxWidth: 1920) {
								...GatsbyImageSharpFluid
								...GatsbyImageSharpFluidLimitPresentationSize
							}
						}
					}
				}
			}
		}
	`);

	const fluidBanner = getFluid(data.allFile.edges, "banner/home3.png");

	return (
		<Layout>
			<SEO title="Home" />
			<div className="text-brand-grayt">
				{/* Banner */}
				<BackgroundImage id="banner" Tag="div" className="bg-gray-400 text-black bg-cover" fluid={fluidBanner}>
					<div className="container" style={{ height: "999px" }}>
						<div className="lg:w-2/3 xl:w-1/2 mx-4"></div>
					</div>
				</BackgroundImage>
			</div>
			<div className="container text-lg px-4">
				<h2 className="py-12 text-xl leading-tight font-semibold">Terméktípusok</h2>
				{productCategories.map((category) => (
					<div>
						<Link to={category.slug} className="pt-8 text-xl leading-tight link">
							{category.name}
						</Link>
						<div>{category.shortDescription}</div>
					</div>
				))}
				<h2 className="pt-12 text-xl leading-tight font-semibold">Fertőtlenítés</h2>
				<p className="mt-3">Szöveg</p>
				<h2 className="pt-12 text-xl leading-tight font-semibold">Algaképződés megakadályozása</h2>
				<p className="mt-3">Szöveg</p>
				<h2 className="pt-12 text-xl leading-tight font-semibold">Vízkőtlenítés</h2>
				<p className="my-3">Szöveg</p>
			</div>
			<GetInTouch />
		</Layout>
	);
};

export default IndexPage;
