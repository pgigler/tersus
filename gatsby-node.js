/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
require("ts-node").register({ files: true });

exports.createPages = async ({ actions: { createPage }, graphql }) => {
	const productItemTemplate = require.resolve(`./src/templates/product-item.tsx`);
	const result = await graphql(`
		query AllProductsQuery {
			allProductsJson {
				edges {
					node {
						id
					}
				}
			}
		}
	`);

	result.data.allProductsJson.edges.forEach(({ node }) => {
		const slug = `/termekek/${node.id}`;
		createPage({
			path: slug,
			component: productItemTemplate,
			context: {
				productId: node.id,
			},
		});
	});
};
