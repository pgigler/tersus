/* eslint-disable no-console */
require("dotenv").config();
const exec = require("ssh-exec");
const fs = require("fs");
const chalk = require("chalk");
const { deploy } = require("sftp-sync-deploy");

const stagingDir = process.env.SSH_REMOTE_STAGING_DIR;
const srcFolder = "./public_sorry/";
const prodFolder = process.env.SSH_REMOTE_PROD_DIR;
const sorryFolder = `${stagingDir}/sorry`;
const oldFolder = `${stagingDir}/old`;
const privateKey = fs.readFileSync(process.env.SSH_PRIVATE_KEY);

runCommand(`rm -rf ${sorryFolder} && mkdir -p ${sorryFolder}`);
syncAndRelease();

function syncAndRelease() {
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
		}
	)
		.then(() => {
			runCommand(`rm -rf ${oldFolder} && mv ${prodFolder} ${oldFolder} && mv ${sorryFolder} ${prodFolder}`);
			console.log("Successfully deployed");
		})
		.catch((err) => {
			console.log(chalk.red(err));
		});
}

function runCommand(command) {
	exec(
		command,
		{
			host: process.env.SSH_HOST,
			user: process.env.SSH_USERNAME,
			key: privateKey,
		},
		function (_err, stdout, stderr) {
			console.log(stdout);
			console.log(chalk.red(stderr));
		}
	);
}
