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

// Build data

// ----------------------------------------------------------------------------------------------------------------- //

"use strict";

// ----------------------------------------------------------------------------------------------------------------- //

const assert = require("assert");

// ----------------------------------------------------------------------------------------------------------------- //

exports.version = "1.0.0.134";

exports.based_on = [
    "uBlock Origin",
    "Version/1.24.3b5+4",
    "Commit/2da8948",
    "UserCSS/disabled",
].join(" ");

exports.chromium_id = "gabbbocakeomblphkmmnoamkioajlkfo";

exports.firefox_id = "{0f929014-5ed2-4527-8b8d-86a9c889b129}";

// ----------------------------------------------------------------------------------------------------------------- //

exports.manifest = (browser) => {
    assert(browser === "chromium" || browser === "edge" || browser ==="firefox");

    const manifest = {
        author: "Nano Core 2 contributors",
        background: {
            page: "background.html",
        },
        browser_action: {
            default_icon: {
                128: "img/128_on.png",
            },
            default_popup: "popup.html",
            default_title: "Nano Adblocker",
        },
        commands: {
            "launch-element-picker": {
                description: "__MSG_popupTipPicker__",
            },
            "launch-element-zapper": {
                description: "__MSG_popupTipZapper__",
            },
            "launch-logger": {
                description: "__MSG_popupTipLog__",
            },
            "relax-blocking-mode": {
                description: "__MSG_relaxBlockingMode__",
            },
        },
        content_scripts: [
            {
                all_frames: true,
                js: [
                    "js/vapi.js",
                    "js/vapi-client.js",
                    "js/vapi-usercss.js",
                    "js/vapi-usercss.real.js",
                    "js/vapi-usercss.pseudo.js",
                    "js/contentscript.js",
                ],
                matches: [
                    "http://*/*",
                    "https://*/*",
                ],
                run_at: "document_start",
            },
            {
                all_frames: false,
                js: [
                    "js/scriptlets/subscriber.js",
                ],
                matches: [
                    "http://*/*",
                    "https://*/*",
                ],
                run_at: "document_idle",
            },
        ],

        // TODO: I do not like how this is being done upstream
        //       https://bit.ly/2m2iFQx
        //content_security_policy: "script-src 'self'; object-src 'self'",

        default_locale: "en",
        description: "An adblocker",
        icons: {
            128: "img/128_on.png",
        },
        incognito: "split",
        manifest_version: 2,
        minimum_chrome_version: "51.0",
        name: "Nano Adblocker",
        options_ui: {
            open_in_tab: true,
            page: "dashboard.html",
        },
        permissions: [
            "<all_urls>",
            "contextMenus",
            "privacy",
            "storage",
            "tabs",
            "unlimitedStorage",
            "webNavigation",
            "webRequest",
            "webRequestBlocking",
        ],
        storage: {
            managed_schema: "managed_storage.json",
        },
        version: exports.version,
        web_accessible_resources: [
            "web_accessible_resources/*",
        ],
    };

    // Legaycy Edge
    if (browser === "edge") {
        // Edge does not care if the size is actually right but does care if the key name is right
        manifest["-ms-preload"] = {
            backgroundScript: "js/edgyfy.js",
            contentScript: "js/edgyfy.js",
        };
        manifest.background.persistent = true;
        manifest.browser_action.default_icon = {
            "38": "img/128_on.png",
        };
        manifest.browser_specific_settings = {
            "edge": {
                "browser_action_next_to_addressbar": true,
            },
        };
        manifest.icons = {
            "128": "img/128_on.png",
            "16": "img/128_on.png",
        };
        delete manifest.minimum_chrome_version;
        manifest.minimum_edge_version = "41.16299.248.0";
        manifest.options_page = "dashboard.html";
        delete manifest.options_ui;
        {
            const i = manifest.version.indexOf(".");
            manifest.version = manifest.version.substring(i + 1) + ".0";
        }

        // TODO: Remove when Edge properly support split mode
        manifest.incognito = "spanning";
    } else if (browser === "firefox") {
        manifest.sidebar_action = {
            "default_title": "__MSG_statsPageName__",
            "default_panel": "logger-ui.html",
            "default_icon": "img/128_on.png",
            "open_at_install": false
        };
        manifest.browser_specific_settings = {
            "gecko": {
                "id": exports.firefox_id,
                "update_url": "https://raw.githubusercontent.com/LiCybora/NanoCoreFirefox/master/Extension%20Compiler/updates.json",                
                "strict_min_version": "55.0"
            }
        };
        manifest.permissions = [
            "menus",
            "privacy",
            "storage",
            "tabs",
            "unlimitedStorage",
            "webNavigation",
            "webRequest",
            "webRequestBlocking",
            "<all_urls>"
        ];
        manifest.browser_action.browser_style = false;
        manifest.content_scripts[0].js = [
            "js/vapi.js",
            "js/vapi-client.js",
            "js/vapi-usercss.js",
            "js/vapi-usercss.real.js",
            "js/contentscript.js"
        ];
        manifest.content_scripts[0].matches = [
            "http://*/*",
            "https://*/*",
            "file://*/*"
        ];
        // TODO: Remove when Firefox properly support split mode
        manifest.incognito = "spanning";
        manifest.options_ui = {
            "open_in_tab": true,
            "page": "dashboard.html",
        };
        delete manifest.minimum_chrome_version;
        delete manifest.optional_permissions;
        delete manifest.options_page;
        delete manifest.storage;    
    }

    return JSON.stringify(manifest, null, 2);
};

// ----------------------------------------------------------------------------------------------------------------- //
