/* eslint-disable no-console */
require("dotenv").config();
const runCommand = require("./run-command.js");
const chalk = require("chalk");
const { deploy } = require("sftp-sync-deploy");

const stagingDir = process.env.SSH_REMOTE_STAGING_DIR;
const prodFolder = process.env.SSH_REMOTE_PROD_DIR;
const srcFolder = "./public_sorry/";
const sorryFolder = `${stagingDir}/sorry`;
const oldFolder = `${stagingDir}/old`;

async function run() {
	try {
		await runCommand(`rm -rf ${sorryFolder} && mkdir -p ${sorryFolder}`);
		await sync();
		await runCommand(`rm -rf ${oldFolder} && mv ${prodFolder} ${oldFolder} && mv ${sorryFolder} ${prodFolder}`);
		await runCommand(`mkdir -p ${prodFolder}/api && cp /web/tersus_config.php ${prodFolder}`);
		console.log("Successfully deployed");
	} catch (err) {
		console.log(chalk.red(err));
	}
}
async function sync() {
	return new Promise((resolve, reject) => {
		deploy(
			{
				host: process.env.SSH_HOST,
				username: process.env.SSH_USERNAME,
				privateKey: process.env.SSH_PRIVATE_KEY,
				localDir: srcFolder,
				remoteDir: sorryFolder,
			},
			{
				dryRun: false,
				forceUpload: true,
			}
		)
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
}

run();
