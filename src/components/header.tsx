import { Link } from "gatsby";
import React, { useState } from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";

interface Menu {
	title: string;
	slug: string;
}

const MENUS: Menu[] = [
	{ title: "Kezdőlap", slug: "/" },
	{ title: "Termékek", slug: "/termekek" },
	{ title: "Hasznos infók", slug: "/hasznos-infok" },
	{ title: "Rólunk", slug: "/rolunk" },
	{ title: "Kapcsolat", slug: "/#kapcsolat" },
];

const Header = () => {
	let path = "";
	if (typeof window !== "undefined") {
		path = window.location.pathname;
	}
	const [menuVisible, setMenuVisible] = useState(false);

	return (
		<header className="sticky top-0 z-40 h-16 sm:flex sm:justify-between sm:items-center select-none shadow bg-white">
			<div className="flex items-center h-full justify-between sm:p-0">
				<div className="flex items-center">
					<Link to="/" className="absolute ml-5 items-center">
						<img src="/main_logo.svg" className="h-8" alt="Logo" />
					</Link>
				</div>

				<div className="sm:hidden mr-8">
					<button
						onClick={() => setMenuVisible(!menuVisible)}
						type="button"
						className="block text-gray-600 focus:outline-none"
					>
						<div className={menuVisible ? "block" : "hidden"}>
							<svg
								className="h-4 w-4 fill-current hover:text-brand-blue"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
							</svg>
						</div>
						<div className={menuVisible ? "hidden" : "block"}>
							<svg
								className="h-4 w-4 fill-current hover:text-brand-blue"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
							</svg>
						</div>
					</button>
				</div>
			</div>
			<nav
				className={`${
					menuVisible ? "block" : "hidden"
				} relative sm:flex bg-white sm:bg-transparent sm:h-full sm:pb-0 z-10`}
			>
				{MENUS.map((item) => (
					<AnchorLink
						key={item.slug}
						to={item.slug}
						className={`menu relative py-4 pl-2 sm:py-0 sm:pl-0 flex items-center ${
							(item.slug === "/" && path === "/") || (item.slug !== "/" && path.startsWith(item.slug))
								? "active"
								: ""
						}`}
					>
						<h1 className="uppercase font-medium text-brand-grayt sm:mx-2 z-20">{item.title}</h1>
						<div className="absolute bottom-0 left-0 w-full h-0"></div>
					</AnchorLink>
				))}
			</nav>
		</header>
	);
};

export default Header;
