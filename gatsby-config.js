require("ts-node").register({ files: true });

module.exports = {
	siteMetadata: {
		title: `AQSZTID | Medencetisztítás`,
		description: `Medence- és egyéb tisztítószerekkel foglalkozó vállalkozás`,
		author: `Aqsztid Bt`,
	},
	pathPrefix: `/tersus`,
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `data`,
				path: `${__dirname}/src/data`,
			},
		},
		`gatsby-plugin-catch-links`,
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						// options: {
						// 	maxWidth: 800,
						// },
					},
					`remark-image-attributes`,
					`gatsby-remark-image-attributes`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/tersus-icon.png`, // This path is relative to the root of the site.
			},
		},
		`gatsby-plugin-typescript`,
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				postCssPlugins: [require("tailwindcss")],
			},
		},
		{
			resolve: `gatsby-plugin-purgecss`,
			options: {
				printRejected: true,
				develop: false, // Enable while using `gatsby develop`
				tailwind: true, // Enable tailwindcss support
				whitelist: ["duration-1000"],
			},
		},
		{
			resolve: `gatsby-plugin-anchor-links`,
			options: {
				offset: -100,
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
