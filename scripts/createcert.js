const path = require("path");
const fs = require("fs");

const createCertificate = require("./create-selfsignedcert").createCertificate;

const HOST_NAME = "tersus.dev";
const CERT_INSTALL_LOCATION = "../";
const CERT_LOCATION = path.resolve(__dirname, CERT_INSTALL_LOCATION);
const CERT_CRTFILE = path.join(CERT_LOCATION, HOST_NAME + ".crt");
const CERT_KEYFILE = path.join(CERT_LOCATION, HOST_NAME + ".key");

const certExistOnLocation = fs.existsSync(CERT_CRTFILE) && fs.existsSync(CERT_KEYFILE);

if (!certExistOnLocation) {
	// eslint-disable-next-line no-console
	console.log(`Certificate not exists. Created on:${CERT_LOCATION}`);
	createCertificate(HOST_NAME, CERT_LOCATION);
} else {
	// eslint-disable-next-line no-console
	console.log(`Certificates exists in ${CERT_LOCATION} -> skip`);
}
