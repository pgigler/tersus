import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { withPrefix } from "gatsby";
import { isBrowser } from "../util/helper";
import Helmet from "react-helmet";

const NotFoundPage = () => {
	return (
		<Layout>
			<SEO title="Tersus" />
			<div className="container p-16">
				<div className="lg:w-1/2 bg-brand-blue p-4 text-white shadow-xl m-auto text-center">
					<h1 className="text-6xl">404</h1>
					<h2 className="text-3xl">Sajnáljuk, ez az oldal nem elérhető!</h2>
				</div>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
