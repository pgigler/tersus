/* eslint-disable no-console */
require("dotenv").config();
const chalk = require("chalk");
const runCommand = require("./run-command.js");
const sync = require("./sync.js");

const stagingDir = process.env.SSH_REMOTE_STAGING_DIR;
const prodFolder = process.env.SSH_REMOTE_PROD_DIR;
const srcFolder = "./public/";
const tempFolder = `${stagingDir}/temp`;
const oldFolder = `${stagingDir}/old`;

async function run() {
	try {
		await runCommand(`rm -rf ${tempFolder} && mkdir -p ${tempFolder} && rsync -r ${prodFolder}/ ${tempFolder}`);
		await sync(srcFolder, tempFolder, { forceUpload: true });
		await runCommand(`rm -rf ${oldFolder} && mv ${prodFolder} ${oldFolder} && mv ${tempFolder} ${prodFolder}`);
		await runCommand(`mkdir -p ${prodFolder}/api && cp /web/tersus_config.php ${prodFolder}`);
		console.log("Successfully deployed");
	} catch (err) {
		console.log(chalk.red(err));
	}
}

run();
