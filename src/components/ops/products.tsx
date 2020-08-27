import React, { useState } from "react";
import { useApiClient, useEffect } from "../../util/customhooks";
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
	const apiClient = useApiClient();

	useEffect(async () => {
		withErrorHandling(
			async () => {
				setLoading(true);
				const result = await apiClient.get("/api/products.php");
				setProducts(result.resp);
				setLoading(false);
			},
			(error: Error) => {
				NotificationManager.error(error.message);
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
