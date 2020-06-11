import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const UsefulInfoPage = () => {
	return (
		<Layout>
			<SEO title="Hasznos infók" />
			<div className="container">
				<h1 className="pt-12 text-4xl leading-tight font-semibold">Hasznos infók</h1>
				<p className="text-lg mt-3">Lorem ipsum...</p>
			</div>
		</Layout>
	);
};

export default UsefulInfoPage;
