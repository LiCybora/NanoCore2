// ----------------------------------------------------------------------------------------------------------------- //

// Nano Core 2 - An adblocker
// Copyright (C) 2018-2019  Nano Core 2 contributors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ----------------------------------------------------------------------------------------------------------------- //

// Publish extension to Web Store

// ----------------------------------------------------------------------------------------------------------------- //

"use strict";

// ----------------------------------------------------------------------------------------------------------------- //

const assert = require("assert");
const fs = require("fs-extra");
const https = require("https");
const url = require("url");

// ----------------------------------------------------------------------------------------------------------------- //

// client  - Google API application client
// secret  - Google API application secret
// account - Google developer account refresh token
const credentials = require("../../Prototype/NanoCore2/credentials.js");

// ----------------------------------------------------------------------------------------------------------------- //

const serialize = (obj) => {
    let str = "";

    for (const key in obj) {
        if (str !== "")
            str += "&";

        assert(typeof obj[key] === "string");

        str = str + key + "=" + encodeURIComponent(obj[key]);
    }

    return str;
};

const stream_to_text = (stream, on_done, on_error) => {
    let data = "";

    stream.setEncoding("utf8");

    stream.on("data", (c) => {
        data += c;
    });

    stream.on("end", () => {
        on_done(data);
    });

    stream.on("error", on_error);
};

// ----------------------------------------------------------------------------------------------------------------- //


exports.publish = async (file, ext_id, term = null) => {
    assert(typeof credentials.client === "string");
    assert(typeof credentials.secret === "string");
    assert(typeof credentials.account === "string");

    assert(typeof ext_id === "string");

    const file_stat = await fs.lstat(file);

    assert(file.endsWith(".zip"));
    assert(!file_stat.isSymbolicLink() && file_stat.isFile());

    // TODO: Assertion inside event handlers are not caught by Promise

    const token = await new Promise((resolve, reject) => {
        const payload = serialize({
            client_id: credentials.client,
            client_secret: credentials.secret,
            refresh_token: credentials.account,
            grant_type: "refresh_token",
        });

        const opt = url.parse("https://accounts.google.com/o/oauth2/token");

        opt.method = "POST";

        opt.headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(payload),
        };

        const on_response = (res) => {
            stream_to_text(res, on_data, reject);
        };

        const on_data = (data) => {
            data = JSON.parse(data);

            assert(typeof data.access_token === "string");

            resolve(data.access_token);
        };

        const req = https.request(opt, on_response);

        req.on("error", reject);

        req.end(payload);
    });

    await new Promise((resolve, reject) => {
        const payload = fs.createReadStream(file);

        payload.on("error", reject);

        const opt = url.parse("https://www.googleapis.com/upload/chromewebstore/v1.1/items/" + ext_id);

        opt.method = "PUT";

        opt.headers = {
            Authorization: "Bearer " + token,
            "X-Goog-API-Version": "2",
        };

        const on_response = (res) => {
            stream_to_text(res, on_data, reject);
        };

        const on_data = (data) => {
            data = JSON.parse(data);

            if (term) {
                term.write_line("Package uploaded.");
                term.write_line(JSON.stringify(data, null, 2));
            }

            assert(data.uploadState === "SUCCESS");

            resolve();
        };

        const req = https.request(opt, on_response);

        req.on("error", reject);

        payload.pipe(req);
    });

    await new Promise((resolve, reject) => {
        const opt = url.parse("https://www.googleapis.com/chromewebstore/v1.1/items/" + ext_id + "/publish");

        opt.method = "POST";

        opt.headers = {
            "Authorization": "Bearer " + token,
            "X-Goog-API-Version": "2",
            "Content-Length": "0",
        };

        const on_response = (res) => {
            stream_to_text(res, on_data, reject);
        };

        const on_data = (data) => {
            data = JSON.parse(data);

            if (term) {
                term.write_line("Publish requested.");
                term.write_line(JSON.stringify(data, null, 2));
            }

            assert(data.status.includes("OK") || data.status.includes("ITEM_PENDING_REVIEW"));

            resolve();
        };

        const req = https.request(opt, on_response);

        req.on("error", reject);

        req.end();
    });
};

// ----------------------------------------------------------------------------------------------------------------- //
