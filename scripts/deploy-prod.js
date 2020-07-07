/* eslint-disable no-console */
require("dotenv").config();
const chalk = require("chalk");
const runCommand = require("./run-command.js");
const sync = require("./sync.js");
const { syncBackendFull } = require("./sync-backend.js");

const localSrcFolder = "./public/";
const remoteStagingDir = process.env.SSH_REMOTE_STAGING_DIR;
const remoteProdFolder = process.env.SSH_REMOTE_PROD_DIR;
const remotePhpTempFolder = `${remoteStagingDir}/tempphpprod`;
const remoteTempFolder = `${remoteStagingDir}/temp`;
const remoteOldFolder = `${remoteStagingDir}/old`;

async function run() {
	try {
		await runCommand(
			`rm -rf ${remoteTempFolder} && mkdir -p ${remoteTempFolder} && rsync -r ${remoteProdFolder}/ ${remoteTempFolder}`
		);
		await sync(localSrcFolder, remoteTempFolder, { forceUpload: true });
		await syncBackendFull(remotePhpTempFolder, remoteTempFolder, "prod");
		await runCommand(
			`rm -rf ${remoteOldFolder} && mv ${remoteProdFolder} ${remoteOldFolder} && mv ${remoteTempFolder} ${remoteProdFolder}`
		);
		console.log("Successfully deployed");
	} catch (err) {
		console.log(chalk.red(err));
	}
}

run();
