import React, { useState, useEffect } from "react";
import products from "../data/products.json";
import { useStaticQuery, graphql } from "gatsby";
import { getFixed, shiftRight, shiftLeft, getFluid } from "../util/helper";
import Img from "gatsby-image";
import { useWindowSize } from "../util/customhooks";

const productComparer = (p1: any, p2: any) => {
	const pop1 = parseInt(p1.popular, 10);
	const pop2 = parseInt(p2.popular, 10);
	return pop1 - pop2;
};

products.sort(productComparer);

// const productsList = ["1", "2", "3", "4", "5", "6"];

type AnimationType = "prev" | "next" | "none";

const ProductCarousel = (props: { count: number }) => {
	const data = useStaticQuery(graphql`
		query ProductCarouselQuery {
			allFile(filter: { extension: { regex: "/(jpg)|(png)|(jpeg)/" }, relativeDirectory: { eq: "products" } }) {
				edges {
					node {
						relativePath
						childImageSharp {
							fluid(maxWidth: 200) {
								...GatsbyImageSharpFluid
							}
						}
					}
				}
			}
		}
	`);

	const [width] = useWindowSize();
	const [itemList, setItemList] = useState(shiftRight(products));
	const [startAnimation, setStartAnimation] = useState<AnimationType>("none");
	const [animating, setAnimating] = useState<AnimationType>("none");
	const [touchCarouselStartX, setTouchCarouselStartX] = useState<number>(0);
	const [touchCarouselEndX, setTouchCarouselEndX] = useState<number>(0);

	// Effects

	useEffect(() => {
		if (startAnimation !== "none") {
			setAnimating(startAnimation);
			setStartAnimation("none");
			const timer = globalThis.setTimeout(() => {
				setAnimating("none");
			}, 500);
		}
	}, [startAnimation]);

	// Helpers

	const getCarouselWindowWidth = () => {
		return Math.floor(width * 0.7);
	};

	const getCount = () => {
		if (getCarouselWindowWidth() < 500) {
			return 1;
		} else if (getCarouselWindowWidth() < 640) {
			return 2;
		} else {
			return props.count;
		}
	};

	const getItemStyle = () => {
		const itemWidth = getItemWidth();
		let offset = -itemWidth;
		let transition = "0ms";
		if (startAnimation !== "none") {
			switch (startAnimation) {
				case "prev":
					offset = -2 * itemWidth;
					break;
				case "next":
					offset = 0;
					break;
				default:
					offset = 0;
					break;
			}
		} else if (animating !== "none") {
			transition = "500ms";
		}
		return { width: `${itemWidth}px`, left: `${offset}px`, transition };
	};

	const getItemWidth = () => {
		return Math.floor(getCarouselWindowWidth() / getCount());
	};

	const prev = () => {
		setItemList(shiftRight(itemList));
		setStartAnimation("prev");
	};

	const next = () => {
		setItemList(shiftLeft(itemList));
		setStartAnimation("next");
	};

	return (
		<div id="productCarousel" className="flex justify-around">
			<div className="flex items-center">
				<div className="flex justify-end cursor-pointer" onClick={prev}>
					<div>
						<svg
							className="h-8 w-8 fill-current"
							viewBox="0 0 1792 1792"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" />
						</svg>
					</div>
				</div>
				<div
					className="px-4 flex justify-around"
					onTouchStart={(e: React.TouchEvent) => setTouchCarouselStartX(e.touches[0].clientX)}
					onTouchMove={(e: React.TouchEvent) => setTouchCarouselEndX(e.touches[0].clientX)}
					onTouchEnd={(e: React.TouchEvent) => {
						if (animating === "none" && touchCarouselEndX !== touchCarouselStartX) {
							touchCarouselEndX - touchCarouselStartX < 0 ? next() : prev();
						}
					}}
				>
					<div className="relative overflow-x-hidden" style={{ width: `${getCarouselWindowWidth()}px` }}>
						<div className=" flex" style={{ width: `5000px` }}>
							{itemList.map((product, i) => (
								<div key={i} className="p-4 relative" style={getItemStyle()}>
									<div className="flex justify-around">
										<div>
											<div>
												<Img
													style={{ maxWidth: "200px", width: `${getItemWidth() - 50}px` }}
													fluid={getFluid(data.allFile.edges, product.imagename)}
													alt="{product.name}"
												/>
											</div>
											<div className="text-center">{product.name}</div>
											<div className="text-center">{product.price} Ft</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="text-left cursor-pointer" onClick={next}>
					<svg className="h-8 w-8 fill-current" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
						<path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" />
					</svg>
				</div>
			</div>
		</div>
	);
};

export default ProductCarousel;
