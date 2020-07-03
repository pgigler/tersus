import React, { useState } from "react";
import { useClient, useEffect } from "../../util/customhooks";

interface Product {
	id: string;
	title: string;
	price: string;
}

const Products = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const client = useClient();

	useEffect(async () => {
		const result = await client.fetch("/api/products.php");
		setProducts(result);
	}, []);

	return (
		<div className="container p-4">
			<h1 className="mb-4 text-2xl font-semibold">Termékek</h1>
			{products.map((product) => {
				return <div key={product.id}>{product.title}</div>;
			})}
		</div>
	);
};

export default Products;
