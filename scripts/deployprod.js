require("dotenv").config();

const ghpages = require("gh-pages");

ghpages.publish(
	"public",
	{
		branch: "master",
		repo: `https://${process.env.GH_TOKEN}@github.com/pgigler/tersuspublic.git`,
	},
	(err) => {
		if (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		} else {
			// eslint-disable-next-line no-console
			console.log("PROD deployed successfully");
		}
	}
);
