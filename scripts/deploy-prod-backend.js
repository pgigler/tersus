/* eslint-disable no-console */
require("dotenv").config();
const chalk = require("chalk");
const runCommand = require("./run-command.js");
const sync = require("./sync.js");

const stagingDir = process.env.SSH_REMOTE_STAGING_DIR;
const prodFolder = process.env.SSH_REMOTE_PROD_DIR;
const srcPhpApiFolder = "./public/api";
const srcPhpVendorFolder = "./public/vendor";
const tempBackendFolder = `${stagingDir}/tempphp`;

async function run() {
	try {
		await runCommand(
			`rm -rf ${tempBackendFolder} && mkdir -p ${tempBackendFolder}/api && mkdir -p ${tempBackendFolder}/vendor`
		);
		await sync(srcPhpApiFolder, `${tempBackendFolder}/api`);
		await sync(srcPhpVendorFolder, `${tempBackendFolder}/vendor`);
		await runCommand(
			`rm -rf ${prodFolder}/api && rm -rf ${prodFolder}/vendor && mv ${tempBackendFolder}/api ${prodFolder} && mv ${tempBackendFolder}/vendor ${prodFolder} && cp /web/tersus_config.php ${prodFolder}`
		);
		console.log("Successfully deployed");
	} catch (err) {
		console.log(chalk.red(err));
	}
}

run();
