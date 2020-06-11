import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const ProductsPage = () => {
	return (
		<Layout>
			<SEO title="Termékek" />
			<div className="container">
				<h1 className="pt-12 text-4xl leading-tight font-semibold">Termékek</h1>
				<p className="text-lg mt-3">Lorem ipsum...</p>
			</div>
		</Layout>
	);
};

export default ProductsPage;
