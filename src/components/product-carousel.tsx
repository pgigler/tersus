import React, { useState, useEffect } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { shiftRight, shiftLeft, getFluid, getProducts, formatMoney } from "../util/helper";
import Img from "gatsby-image";
import { useWindowSize } from "../util/customhooks";
import Product from "../interfaces/Product";

const productComparer = (p1: any, p2: any) => {
	const pop1 = parseInt(p1.popular, 10);
	const pop2 = parseInt(p2.popular, 10);
	return pop1 - pop2;
};

const transitionDuration = 400;

// const productsList = ["1", "2", "3", "4", "5", "6"];

type Direction = "prev" | "next";
type TransitionState = "start" | "animating" | "none";

const ProductCarousel = ({ count }: { count: number }) => {
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
		products.sort(productComparer);
		setProducts(shiftRight(products));
	}, []);

	const [width] = useWindowSize();
	const [products, setProducts] = useState<Product[]>([]);
	const [transitionState, setTransitionState] = useState<TransitionState>("none");
	const [direction, setDirection] = useState<Direction>("prev");
	const [touchCarouselStart, setTouchCarouselStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [touchCarouselEnd, setTouchCarouselEnd] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

	// Effects

	useEffect(() => {
		if (transitionState === "start") {
			window.setTimeout(() => {
				setTransitionState("animating");
				window.setTimeout(() => {
					setTransitionState("none");
				}, transitionDuration);
			}, 20);
		}
	}, [transitionState]);

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
			return count;
		}
	};

	const getItemStyle = () => {
		const itemWidth = getItemWidth();
		let offset = -itemWidth;
		let transition = "0ms";

		if (transitionState === "start") {
			switch (direction) {
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
		}

		if (transitionState === "animating") {
			transition = transitionDuration + "ms";
		}

		return { width: `${itemWidth}px`, left: `${offset}px`, transition };
	};

	const getItemWidth = () => {
		return Math.floor(getCarouselWindowWidth() / getCount());
	};

	const prev = () => {
		if (transitionState === "none") {
			setProducts(shiftRight(products));
			setDirection("prev");
			setTransitionState("start");
		}
	};

	const next = () => {
		if (transitionState === "none") {
			setProducts(shiftLeft(products));
			setDirection("next");
			setTransitionState("start");
		}
	};

	return (
		<div id="productCarousel" className="flex justify-around select-none">
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
					onTouchStart={(e: React.TouchEvent) =>
						setTouchCarouselStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
					}
					onTouchMove={(e: React.TouchEvent) =>
						setTouchCarouselEnd({ x: e.touches[0].clientX, y: e.touches[0].clientY })
					}
					onTouchEnd={(e: React.TouchEvent) => {
						const dx = Math.abs(touchCarouselEnd.x - touchCarouselStart.x);
						const dy = Math.abs(touchCarouselEnd.y - touchCarouselStart.y);
						if (transitionState === "none" && dx > dy && dx > 10) {
							if (touchCarouselEnd.x - touchCarouselStart.x < 0) {
								next();
							} else {
								prev();
							}
						}
					}}
				>
					<div className="relative overflow-x-hidden" style={{ width: `${getCarouselWindowWidth()}px` }}>
						<div className=" flex" style={{ width: `5000px` }}>
							{products.map((product, i) => (
								<div key={i} className="p-4 relative" style={getItemStyle()}>
									<Link to={`/termekek/${product.id}`}>
										<div className="flex justify-around">
											<div>
												<div>
													<Img
														style={{ maxWidth: "200px", width: `${getItemWidth() - 50}px` }}
														fluid={getFluid(data.allFile.edges, product.imagename)}
														alt={product.name}
													/>
												</div>
												<div className="text-center text-xl font-semibold">{product.name}</div>
												<div className="text-center">{formatMoney(product.price)}</div>
											</div>
										</div>
									</Link>
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
