import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import productCategories from "../data/product_categories.json";
import { getFluid } from "../util/helper";
import Img from "gatsby-image";

const PCDescription = ({ pc }: { pc: any }) => (
	<div className="flex items-start h-full">
		<div>
			<div className="px-4 text-2xl font-semibold pt-4 pb-2">{pc.name}</div>
			<div className="px-4">{pc.shortDescription}</div>
		</div>
	</div>
);

const ProductCategories = () => {
	const data = useStaticQuery(graphql`
		query ProductCategoriesQuery {
			allFile(
				filter: { extension: { regex: "/(jpg)|(png)|(jpeg)/" }, relativeDirectory: { eq: "productcategories" } }
			) {
				edges {
					node {
						relativePath
						childImageSharp {
							fluid(maxWidth: 600) {
								...GatsbyImageSharpFluid
							}
						}
					}
				}
			}
		}
	`);

	return (
		<div id="productCategories">
			<div className="flex-wrap hidden xl:flex">
				{productCategories.map((pc, i) => (
					<React.Fragment key={i}>
						{i % 4 >= 2 ? (
							<div className="w-1/4 bg-brand-blue1">
								<Link to={pc.slug}>
									<PCDescription pc={pc} />
								</Link>
							</div>
						) : (
							""
						)}
						<div className="w-1/4 bg-red-400">
							<Link to={pc.slug}>
								<Img fluid={getFluid(data.allFile.edges, pc.imagename)} alt="{pc.name}" />
							</Link>
						</div>
						{i % 4 < 2 ? (
							<div className="w-1/4 bg-brand-blue1">
								<Link to={pc.slug}>
									<PCDescription pc={pc} />
								</Link>
							</div>
						) : (
							""
						)}
					</React.Fragment>
				))}
			</div>
			<div className="flex-wrap hidden md:flex xl:hidden">
				{productCategories.map((pc, i) => (
					<React.Fragment key={i}>
						{i % 2 === 1 ? (
							<div className="w-1/2 bg-brand-blue1">
								<Link to={pc.slug}>
									<PCDescription pc={pc} />
								</Link>
							</div>
						) : (
							""
						)}
						<div className="w-1/2 bg-red-400">
							<Link to={pc.slug}>
								<Img fluid={getFluid(data.allFile.edges, pc.imagename)} alt="{pc.name}" />
							</Link>
						</div>
						{i % 2 === 0 ? (
							<div className="w-1/2 bg-brand-blue1">
								<Link to={pc.slug}>
									<PCDescription pc={pc} />
								</Link>
							</div>
						) : (
							""
						)}
					</React.Fragment>
				))}
			</div>
			<div className="flex flex-wrap md:hidden">
				{productCategories.map((pc, i) => (
					<React.Fragment key={i}>
						<div className="w-full text-center bg-red-400">
							<Link to={pc.slug}>
								<Img fluid={getFluid(data.allFile.edges, pc.imagename)} alt="{pc.name}" />
							</Link>
						</div>
						<div style={{ height: "400px" }} className="w-full bg-brand-blue1">
							<Link to={pc.slug}>
								<PCDescription pc={pc} />
							</Link>
						</div>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default ProductCategories;
