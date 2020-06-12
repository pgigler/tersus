import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { getFixed } from "../util/helper";
import Img from "gatsby-image";

const Footer = () => {
	const data = useStaticQuery(graphql`
		query FooterQuery {
			allFile(filter: { relativePath: { in: ["main_logo.png"] } }) {
				edges {
					node {
						relativePath
						childImageSharp {
							fixed(width: 32) {
								...GatsbyImageSharpFixed
							}
						}
					}
				}
			}
		}
	`);

	const fixedLogo = getFixed(data.allFile.edges, "main_logo.png");

	return (
		<footer className="main-footer bg-brand-gray2 text-brand-gray3 text-sm whitespace-no-wrap">
			<section className="flex flex-col items-center sm:flex-row sm:justify-between max-w-screen-xl mx-auto sm:items-start p-3">
				<div className="pb-12 flex flex-col md:w-1/3 items-center sm:items-start">
					<h2 className="text-white uppercase font-semibold text-lg mb-1">Cégadatok</h2>
					<div>Cégjegyzékszám: 20-06-037456</div>
					<div>Adószám: 21449455-2-20</div>
				</div>
				<div id="kapcsolat" className="flex items-center flex-col md:w-1/3 pb-12">
					<h2 className="text-white uppercase font-semibold text-lg mb-1">Kapcsolat</h2>
					<div className="flex items-center">
						<span>
							<svg
								className="h-4 w-4 fill-current mr-2"
								viewBox="0 0 1792 1792"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M1600 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-53-3.5t-57.5-12.5-47-14.5-55.5-20.5-49-18q-98-35-175-83-127-79-264-216t-216-264q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47-12.5-57.5-3.5-53q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z" />
							</svg>
						</span>
						<span>+36 (46) 346 208</span>
					</div>
					<div>
						<a
							href="mailto:info@tersus.hu"
							itemProp="email"
							className="flex items-center hover:text-brand-blue"
						>
							<svg
								className="h-4 w-4 fill-current mr-2"
								viewBox="0 0 1792 1792"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z" />
							</svg>
							<span className="email-address">info@tersus.hu</span>
						</a>
					</div>
				</div>
				<div className="flex flex-col md:w-1/3 items-center sm:items-end">
					<h2 className="text-white uppercase font-semibold text-lg mb-1">AQSZTID Bt (2002)</h2>
					<div className="hover:text-brand-blue">
						<a
							href="https://www.google.com/maps/place/Vonyarcvashegy,+H%C3%B3vir%C3%A1g+u.+2,+8314/@46.7674977,17.3109753,17z/data=!3m1!4b1!4m5!3m4!1s0x4769028ff02a40d1:0x771e836106b4d63!8m2!3d46.767494!4d17.313164"
							className="flex flex-col items-end"
						>
							<div itemScope itemType="http://schema.org/address" className="flex items-center">
								<svg
									className="h-4 w-4 fill-current mr-1"
									viewBox="0 0 1792 1792"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M1152 640q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm256 0q0 109-33 179l-364 774q-16 33-47.5 52t-67.5 19-67.5-19-46.5-52l-365-774q-33-70-33-179 0-212 150-362t362-150 362 150 150 362z" />
								</svg>
								<span itemProp="PostalAddress">Hóvirág u. 2</span>
							</div>
							<div itemScope itemType="http://schema.org/postalAddress">
								H-<span itemProp="PostalCode">8314</span> Vonyarcvashegy
							</div>
						</a>
					</div>
				</div>
			</section>
			<section className="bg-brand-gray1">
				<div className="flex flex-col items-center sm:flex-row sm:justify-between max-w-screen-xl mx-auto px-3 pb-2 pt-3">
					<div className="mb-2">
						<Link to="/">
							<Img fixed={fixedLogo} alt="Logo" />
						</Link>
					</div>
					<div className="mb-2">
						<Link className="hover:text-brand-blue" to="/adatvedelmi-tajekoztato">
							Adatvédelmi tájékoztató
						</Link>
					</div>
					<div className="text-white flex mb-2">
						<div>
							<a href="https://www.facebook.com/tersus">
								<svg
									className="h-8 w-8 fill-current hover:text-brand-blue mr-2"
									viewBox="0 0 1792 1792"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M1376 128q119 0 203.5 84.5t84.5 203.5v960q0 119-84.5 203.5t-203.5 84.5h-188v-595h199l30-232h-229v-148q0-56 23.5-84t91.5-28l122-1v-207q-63-9-178-9-136 0-217.5 80t-81.5 226v171h-200v232h200v595h-532q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960z" />
								</svg>
							</a>
						</div>
						<div>
							<a href="https://www.linkedin.com/company/tersus">
								<svg
									className="h-8 w-8 fill-current hover:text-brand-blue mr-2"
									viewBox="0 0 1792 1792"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z" />
								</svg>
							</a>
						</div>
						<div>
							<a href="https://twitter.com/tersus">
								<svg
									className="h-8 w-8 fill-current hover:text-brand-blue"
									viewBox="0 0 1792 1792"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M1408 610q-56 25-121 34 68-40 93-117-65 38-134 51-61-66-153-66-87 0-148.5 61.5t-61.5 148.5q0 29 5 48-129-7-242-65t-192-155q-29 50-29 106 0 114 91 175-47-1-100-26v2q0 75 50 133.5t123 72.5q-29 8-51 8-13 0-39-4 21 63 74.5 104t121.5 42q-116 90-261 90-26 0-50-3 148 94 322 94 112 0 210-35.5t168-95 120.5-137 75-162 24.5-168.5q0-18-1-27 63-45 105-109zm256-194v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</section>
		</footer>
	);
};

export default Footer;
