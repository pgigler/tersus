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
