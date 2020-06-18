import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { getFluid } from "../util/helper";
import BackgroundImage from "gatsby-background-image";
import productCategories from "../data/product_categories.json";
import GetInTouch from "../components/get-in-touch";
import ProductCarousel from "../components/product-carousel";

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
			{/* Banner */}
			<div className="text-brand-grayt">
				<div>
					<BackgroundImage
						id="banner"
						Tag="div"
						className="bg-gray-400 text-black bg-cover"
						fluid={fluidBanner}
					>
						<div className="container" style={{ height: "999px" }}>
							<div className="lg:ml-56 h-full text-white flex ml-6">
								<div className="mt-48 w-1/2">
									<div className="text-4xl sm:text-6xl tracking-wide uppercase font-semibold font-sans">
										<span className="whitespace-no-wrap">A kristálytiszta</span> élményért
									</div>
									<div className="mt-4">
										<Link to="/termekek">
											<div className="btn btn-primary">Vásárlás</div>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</BackgroundImage>
				</div>
			</div>
			{/* Popular products */}
			<div>
				<h2 className="py-12 w-full text-center title title-wide">Népszerű termékeink</h2>
				<ProductCarousel count={4} />
			</div>
			{/* Product Categories */}
			<div className="container text-lg px-4">
				{productCategories.map((category, i) => (
					<div key={i}>
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
