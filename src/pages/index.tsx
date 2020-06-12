import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { getFluid } from "../util/helper";
import BackgroundImage from "gatsby-background-image";

const IndexPage = () => {
	const data = useStaticQuery(graphql`
		query IndexPageQuery {
			allFile(filter: { relativePath: { in: ["banner/home.jpg"] } }) {
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

	const fluidBanner = getFluid(data.allFile.edges, "banner/home.jpg");

	return (
		<Layout>
			<SEO title="Home" />
			<div className="text-brand-grayt">
				{/* Banner */}
				<BackgroundImage id="banner" Tag="div" className="bg-gray-400 text-black bg-cover" fluid={fluidBanner}>
					<div className="container" style={{ height: "500px" }}>
						<div className="lg:w-2/3 xl:w-1/2 px-4"></div>
					</div>
				</BackgroundImage>
			</div>
			<div className="container">
				<h1 className="pt-12 text-4xl leading-tight font-semibold">Medencetisztítás</h1>
				<p className="text-lg mt-3">Felsőfokon</p>
			</div>
		</Layout>
	);
};

export default IndexPage;
