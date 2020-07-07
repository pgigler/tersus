import React, { useState } from "react";
import { useClient, useEffect } from "../../util/customhooks";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { withErrorHandling } from "../../util/helper";
import ReactLoading from "react-loading";

interface Product {
	id: string;
	title: string;
	price: string;
}

const Products = () => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const client = useClient();

	useEffect(async () => {
		withErrorHandling(
			async () => {
				setLoading(true);
				const result = await client.fetch("/api/products.php");
				setProducts(result);
				setLoading(false);
			},
			() => {
				NotificationManager.error("Authentication failed");
				setLoading(false);
			}
		);
	}, []);

	return (
		<div className="container p-4">
			<h1 className="mb-4 text-2xl font-semibold">Termékek</h1>
			{loading ? (
				<ReactLoading color="#4dacc9" type="bubbles" />
			) : (
				products.map((product) => {
					return <div key={product.id}>{product.title}</div>;
				})
			)}
			<NotificationContainer />
		</div>
	);
};

export default Products;
