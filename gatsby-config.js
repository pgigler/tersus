require("ts-node").register({ files: true });

// const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
// // eslint-disable-next-line no-console
// console.log(`Using environment config: '${activeEnv}'`);

// require("dotenv").config({
// 	path: `.env`,
// });

require("dotenv").config({
	path: `.env.${process.env.NODE_ENV === "development" ? "uat" : "prod"}`,
});

module.exports = {
	siteMetadata: {
		title: `AQSZTID | Medencetisztítás`,
		description: `Medence- és egyéb tisztítószerekkel foglalkozó vállalkozás`,
		author: `Aqsztid Bt`,
	},
	pathPrefix: `/tersus`,
	plugins: [
		`gatsby-transformer-json`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/assets/images`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `data`,
				path: `${__dirname}/data`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `cms`,
				path: `${__dirname}/cms`,
				ignore: ["**/assets/**"],
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `cmsimages`,
				path: `${__dirname}/cms/assets`,
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
				icon: `assets/images/tersus-icon.png`, // This path is relative to the root of the site.
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
			resolve: "gatsby-plugin-netlify-cms",
			options: {
				modulePath: `${__dirname}/src/cms.js`,
			},
		},
		{
			resolve: `gatsby-plugin-google-gtag`,
			options: {
				// You can add multiple tracking ids and a pageview event will be fired for all of them.
				trackingIds: [
					process.env.GA_TRACKING_ID, // Google Analytics / GA
					// "AW-CONVERSION_ID", // Google Ads / Adwords / AW
					// "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
				],
				// This object gets passed directly to the gtag config command
				// This config will be shared across all trackingIds
				gtagConfig: {
					// optimize_id: "OPT_CONTAINER_ID",
					anonymize_ip: true,
					cookie_expires: 0,
				},
				// This object is used for configuration specific to this plugin
				pluginConfig: {
					// Puts tracking script in the head instead of the body
					head: false,
					// Setting this parameter is also optional
					respectDNT: true,
					// Avoids sending pageview hits from custom paths
					// exclude: ["/preview/**", "/do-not-track/me/too/"],
				},
			},
		},
		// {
		// 	resolve: `gatsby-plugin-anchor-links`,
		// 	options: {
		// 		offset: -100,
		// 	},
		// },
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
