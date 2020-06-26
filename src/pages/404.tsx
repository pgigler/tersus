import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
	<Layout>
		<SEO title="404: Oldal nem található" />
		<div className="container p-16">
			<div className="lg:w-1/2 bg-brand-blue p-4 text-white shadow-xl m-auto text-center">
				<h1 className="text-6xl">404</h1>
				<h2 className="text-3xl">Sajnáljuk, ez az oldal nem elérhető!</h2>
			</div>
		</div>
	</Layout>
);

export default NotFoundPage;
