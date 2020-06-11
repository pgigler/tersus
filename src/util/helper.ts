export const getFluid = (images: any, relativePath: string) => {
	return images.filter((image) => image.node.relativePath === relativePath)[0].node.childImageSharp.fluid;
};