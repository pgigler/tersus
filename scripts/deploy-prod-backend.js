/* eslint-disable no-console */
require("dotenv").config();
const runCommand = require("./run-command.js");
const chalk = require("chalk");
const { deploy } = require("sftp-sync-deploy");

const stagingDir = process.env.SSH_REMOTE_STAGING_DIR;
const prodFolder = process.env.SSH_REMOTE_PROD_DIR;
const prodApiFolder = `${prodFolder}/api`;
const srcFolder = "./php/api";
const tempBackendFolder = `${stagingDir}/tempphp`;

async function run() {
	try {
		await runCommand(`rm -rf ${tempBackendFolder} && mkdir -p ${tempBackendFolder}`);
		await sync();
		await runCommand(
			`rm -rf ${prodApiFolder} && mv ${tempBackendFolder} ${prodApiFolder} && cp /web/tersus_config.php ${prodFolder}`
		);
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
				remoteDir: tempBackendFolder,
			},
			{
				dryRun: false,
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
