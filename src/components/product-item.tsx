import React, { useContext } from "react";
import Product from "../interfaces/Product";
import PreviewCompatibleImage from "./preview-compatible-image";
import { GlobalDispatchContext } from "../context/GlobalContextProvider";
import { CartManager } from "../util/CartManager";

const ProductItem = ({
	product,
	fixedImageEdges,
	getAsset,
	isPreview,
}: {
	product: Product;
	fixedImageEdges?: any;
	getAsset?: (...args: any[]) => any;
	isPreview: boolean;
}) => {
	const globalDispatch = useContext(GlobalDispatchContext);

	return (
		<div key={product.id} className="flex flex-wrap md:flex-column mb-8" id={product.id}>
			<div className="w-full md:w-1/2 text-center mb-8">
				<h1 className="text-4xl leading-tight font-semibold mb-4">{product.name}</h1>
				<div>
					<PreviewCompatibleImage
						info={{
							name: product.imagename,
							alt: product.name,
							fixedImageEdges,
							getAsset,
							previewStyle: { width: "200px", display: "inline-block" },
						}}
					/>
				</div>
				<div className="text-xl font-semibold">{product.price} Ft</div>
				{!isPreview ? (
					<button
						className="mt-4 btn btn-primary"
						onClick={() => {
							new CartManager(window.localStorage).addToCart(product, 1, globalDispatch);
						}}
					>
						Kosárba
					</button>
				) : (
					""
				)}
			</div>
			<div className="w-full md:w-1/2">
				<h2 className="pt-1 text-xl leading-tight uppercase font-semibold">{product.subtitle}</h2>
				{product.sections ? (
					<div>
						{product.sections.map((section, i) => (
							<div key={i}>
								{section.title !== "" ? (
									<h2 className="pt-8 pb-2 text-2xl leading-tight font-semibold">{section.title}</h2>
								) : (
									""
								)}
								{section.ps?.map((ps, j) => (
									<div key={j} className="mt-3">
										{ps}
									</div>
								))}
								{section.subsections?.map((subsection, k) => (
									<div key={k} className="mt-3">
										<h3 className="pt-8 pb-2 text-lg leading-tight font-semibold">
											{subsection.title}
										</h3>
										{subsection.ps.map((ps, l) => (
											<div key={l} className="mt-3">
												{ps}
											</div>
										))}
									</div>
								))}
							</div>
						))}
						<div className="mt-4">
							{product.warnings.map((warning, i) => (
								<div key={i} className="text-red-500 font-semibold">
									{warning}
								</div>
							))}
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default ProductItem;
