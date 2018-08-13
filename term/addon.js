/**
 * Publish extensions to Addons Server.
 */
"use strict";

/**
 * Credentials.
 * @const {Object|undefined}
 */
const credentials = require("../../Prototype/NanoCore2/credentials.js");

/**
 * Load modules.
 * @const {Module}
 */
const assert = require("assert");
const signAddon = require("sign-addon");

/**
 * Publish an extension package.
 * @async @function
 * @param {string} file - The path to the package file to upload.
 * @param {string} version - The version of the package.
 * @param {string} id - The ID of the extension.
 * @param {string} output - The output directory.
 * @param {Term} [term] - Terminal for output.
 */
exports.publish = async (file, version, id, output, term) => {
    assert(credentials && typeof credentials === "object");
    assert(typeof credentials.AddonsServerIssuer === "string");
    assert(typeof credentials.AddonsServerSecret === "string");

    const result = await signAddon.default({
        xpiPath: file,
        version: version,
        apiKey: credentials.AddonsServerIssuer,
        apiSecret: credentials.AddonsServerSecret,
        id: id,
        channel: 'unlisted',
        downloadDir: output,
    });
    if (term) {
        term.write_line("Package uploaded, server response:");
        term.write_line(JSON.stringify(result, null, 2));
    }
};
