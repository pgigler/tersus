/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
require("ts-node").register({ files: true });

exports.createPages = async ({ actions: { createPage }, graphql }) => {
	const productItemTemplate = require.resolve(`./src/templates/ProductPageTemplate.tsx`);
	const result = await graphql(`
		query AllProductsQuery {
			allMarkdownRemark(filter: { frontmatter: { title: { eq: "products" } } }) {
				edges {
					node {
						frontmatter {
							content {
								code
							}
						}
					}
				}
			}
		}
	`);

	const products = JSON.parse(result.data.allMarkdownRemark.edges[0].node.frontmatter.content.code);
	products.forEach((product) => {
		const slug = `/termekek/${product.id}`;
		createPage({
			path: slug,
			component: productItemTemplate,
			context: {
				productId: product.id,
			},
		});
	});
};

// exports.onCreatePage = async ({ page, actions }) => {
// 	const { createPage } = actions;

// 	// page.matchPath is a special key that's used for matching pages
// 	// only on the client.
// 	if (page.path.match(/^\/ops/)) {
// 		page.matchPath = `/ops/*`;

// 		// Update the page.
// 		createPage(page);
// 	}
// };
