import React, { useContext, useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ShoppingCart from "../components/shopping_cart";
import { GlobalStateContext } from "../context/GlobalContextProvider";
import { useEffect } from "../util/customhooks";
import { navigate } from "gatsby";

const ShoppingCartPage = () => {
	const globalState = useContext(GlobalStateContext);
	const [client, setClient] = useState(false);

	useEffect(() => {
		setClient(true);
	}, []);

	return (
		<Layout>
			<SEO title="Kosár" />
			<div className="container px-4 py-4">
				{client ? (
					<div>
						<div className="mb-4">
							<ShoppingCart />
						</div>
						{globalState.numberOfItems > 0 ? (
							<div className="flex justify-end">
								<button
									className="btn btn-primary btn-green ml-4"
									onClick={() => {
										navigate("/megrendeles");
									}}
								>
									Megrendelem
								</button>
							</div>
						) : (
							""
						)}
					</div>
				) : (
					""
				)}
			</div>
		</Layout>
	);
};

export default ShoppingCartPage;
