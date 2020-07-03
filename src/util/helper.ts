import Product from "../interfaces/Product";

export const getFluid = (images: any, relativePath: string) => {
	return images.filter((image) => image.node.relativePath === relativePath)[0].node.childImageSharp.fluid;
};

export const getFixed = (images: any, relativePath: string) => {
	return images.filter((image) => image.node.relativePath === relativePath)[0].node.childImageSharp.fixed;
};

export const shiftRight = (list: any) => {
	return [list[list.length - 1], ...list.slice(0, list.length - 1)];
};

export const shiftLeft = (list: any) => {
	return [...list.slice(1), list[0]];
};

export const getImageUrlFromAsset = (getAsset: (...args: any[]) => any, assetName: string) => {
	if (getAsset) {
		const globalAssetName = assetName.replace(/\//, "-slash-");
		return getAsset(globalAssetName);
	} else {
		return "image not found";
	}
};

export const getProducts = (node: any): Product[] => {
	const json = node.frontmatter.content.code;
	return JSON.parse(json);
};

export const isBrowser = () => typeof window !== "undefined";

export const withErrorHandling = (callback: () => Promise<void> | void, errorHandler: (error: any) => void) => {
	try {
		const result = callback();
		if (result instanceof Promise) {
			result.catch(async (error) => {
				errorHandler(error);
			});
		}
	} catch (error) {
		errorHandler(error);
	}
};
