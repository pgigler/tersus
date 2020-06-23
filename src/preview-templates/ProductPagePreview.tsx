import React from "react";
import ProductItem from "../components/product-item";
import Product from "../interfaces/Product";

const ProductPagePreview = ({
	entry,
	getAsset,
}: {
	entry: { getIn: (...args: any[]) => any };
	getAsset: () => any;
}) => {
	const json = entry.getIn(["data", "content", "code"]);
	const products = json ? JSON.parse(json) : undefined;
	return (
		<div>
			{products
				? products.map((product: Product) => (
						<ProductItem product={product} isPreview={true} getAsset={getAsset} />
				  ))
				: "Empty"}
		</div>
	);
};

export default ProductPagePreview;
