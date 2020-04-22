/*
 * The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in compliance with the
 * License.
 *
 * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
 * specific language governing permission and limitations under the License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file and include
 * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
 * Header, with the fields enclosed by brackets [] replaced by your own identifying
 * information: "Portions copyright [year] [name of copyright owner]".
 *
 * Copyright 2011-2020 ForgeRock AS.
 */

require.config({
    map: {
        "*" : {
            "Footer"            : "org/forgerock/openam/ui/common/components/Footer",
            "ThemeManager"      : "org/forgerock/openam/ui/common/util/ThemeManager",
            "LoginView"         : "org/forgerock/openam/ui/user/login/RESTLoginView",
            "UserProfileView"   : "org/forgerock/commons/ui/user/profile/UserProfileView",
            "ForgotUsernameView": "org/forgerock/openam/ui/user/anonymousProcess/ForgotUsernameView",
            "PasswordResetView" : "org/forgerock/openam/ui/user/anonymousProcess/PasswordResetView",
            "LoginDialog"       : "org/forgerock/openam/ui/user/login/RESTLoginDialog",
            "NavigationFilter"  : "org/forgerock/openam/ui/common/components/navigation/filters/RouteNavGroupFilter",
            "Router"            : "org/forgerock/commons/ui/common/main/Router",
            "RegisterView"      : "org/forgerock/openam/ui/user/anonymousProcess/SelfRegistrationView",
            "KBADelegate"       : "org/forgerock/openam/ui/user/services/KBADelegate",
            // TODO: Remove this when there are no longer any references to the "underscore" dependency
            "underscore"        : "lodash"
        }
    },
    paths: {
        "autosizeInput": "libs/jquery.autosize.input.min",

        "backbone"           : "libs/backbone-1.4.0-min",
        "backbone.paginator" : "libs/backbone.paginator.min-2.0.8-min",
        "backbone-relational": "libs/backbone-relational-0.10.0-min",

        "backgrid"          : "libs/backgrid-custom.min",
        "backgrid-filter"   : "libs/backgrid-filter.min-0.3.7-min",
        "backgrid.paginator": "libs/backgrid-paginator-custom.min",
        "backgrid-selectall": "libs/backgrid-select-all-0.3.5-min",

        "bootstrap"               : "libs/bootstrap-3.3.5-custom",
        "bootstrap-datetimepicker": "libs/bootstrap-datetimepicker-4.14.30-min",
        "bootstrap-dialog"        : "libs/bootstrap-dialog-1.34.4-min",
        "bootstrap-tabdrop"       : "libs/bootstrap-tabdrop-1.0",

        "classnames"       : "libs/classnames-2.2.5",
        "clockPicker"      : "libs/bootstrap-clockpicker-0.0.7-min",
        "doTimeout"        : "libs/jquery.ba-dotimeout-1.0-min",
        "form2js"          : "libs/form2js-2.0-769718a",
        "get-node-dimensions": "libs/get-node-dimensions.min",
        "handlebars"       : "libs/handlebars-4.0.5",
        "i18next"          : "libs/i18next-1.10.3-standard",
        "jquery"           : "libs/jquery-2.1.1-patched",
        "js2form"          : "libs/js2form-2.0-769718a",
        "jsonEditor"       : "libs/jsoneditor-0.7.23-custom",
        "lodash"           : "libs/lodash-4.17.15-min",
        "microplugin"      : "libs/microplugin-0.0.3",
        "moment"           : "libs/moment-2.20.1-min",
        "popoverclickaway" : "libs/popover-clickaway",
        "qrcode"           : "libs/qrcode-1.0.0-min",
        "react-bootstrap-table": "libs/react-bootstrap-table-3.1.6-min",
        "react-bootstrap"  : "libs/react-bootstrap-0.30.1-min",
        "react-dnd"        : "libs/ReactDnD-2.4.0-min",
        "react-dnd-html5-backend": "libs/ReactDnDHTML5Backend-2.4.1-min",
        "react-dom"        : "libs/react-dom-15.2.1-min",
        "react-draggable"  : "libs/react-draggable-2.2.6.min",
        "react-input-autosize": "libs/react-input-autosize-1.1.0-min",
        "react-jsonschema-form": "libs/react-jsonschema-form-0.49.0",
        "react-measure"    : "libs/react-measure-1.4.7.min",
        "react-redux"      : "libs/react-redux-5.0.3-min",
        "react-select"     : "libs/react-select-1.0.0-rc.2-min",
        "react"            : "libs/react-15.2.1-min",
        "redux-actions"    : "libs/redux-actions-2.0.1-min",
        "redux"            : "libs/redux-3.5.2-min",
        "resize-observer-polyfill": "libs/ResizeObserver",
        "selectize"        : "libs/selectize-non-standalone-0.12.1-min",
        "sifter"           : "libs/sifter-0.4.1-min",
        "sortable"         : "libs/jquery-nestingSortable-0.9.12",
        "spin"             : "libs/spin-2.0.1-min",
        "text"             : "libs/text-2.0.15",
        "uuid"             : "libs/uuidv4-3.1.0-min",
        "xdate"            : "libs/xdate-0.8-min"
    },
    shim: {
        "autosizeInput": {
            deps: ["jquery"],
            exports: "autosizeInput"
        },
        "backbone": {
            deps: ["lodash"],
            exports: "Backbone"
        },
        "backbone.paginator": {
            deps: ["backbone"]
        },
        "backbone-relational": {
            deps: ["backbone"]
        },

        "backgrid": {
            deps: ["jquery", "lodash", "backbone"],
            exports: "Backgrid"
        },
        "backgrid-filter": {
            deps: ["backgrid"]
        },
        "backgrid.paginator": {
            deps: ["backgrid", "backbone.paginator"]
        },
        "backgrid-selectall": {
            deps: ["backgrid"]
        },

        "bootstrap": {
            deps: ["jquery"]
        },
        "bootstrap-dialog": {
            deps: ["jquery", "lodash", "backbone", "bootstrap"]
        },
        "bootstrap-tabdrop": {
            deps: ["jquery", "bootstrap"]
        },

        "clockPicker": {
            deps: ["jquery"],
            exports: "clockPicker"
        },
        "doTimeout": {
            deps: ["jquery"],
            exports: "doTimeout"
        },
        "form2js": {
            exports: "form2js"
        },
        "i18next": {
            deps: ["jquery", "handlebars"],
            exports: "i18n"
        },
        "js2form": {
            exports: "js2form"
        },
        "jsonEditor": {
            exports: "JSONEditor"
        },
        "moment": {
            exports: "moment"
        },
        "qrcode": {
            exports: "qrcode"
        },
        "selectize": {
            /**
             * sifter, microplugin is additional dependencies for fix release build.
             * @see https://github.com/brianreavis/selectize.js/issues/417
             */
            deps: ["jquery", "sifter", "microplugin"]
        },
        "spin": {
            exports: "spin"
        },
        "lodash": {
            exports: "_"
        },
        "xdate": {
            exports: "xdate"
        },
        "sortable": {
            deps: ["jquery"]
        },
        "react-input-autosize": {
            deps: ["reactAutosizeInputDep"]
        },
        "react-select": {
            deps: ["reactSelectDep"]
        }
    }
});

define("reactAutosizeInputDep", ["react"], (React) => {
    window.React = React;
    return {};
});

define("reactSelectDep", ["react-dom", "react-input-autosize", "classnames"], (ReactDOM, autoSize, classNames) => {
    window.ReactDOM = ReactDOM;
    window.classNames = classNames;
    window.AutosizeInput = autoSize;
    return {};
});

require([
    "org/forgerock/commons/ui/common/util/Constants",
    "org/forgerock/commons/ui/common/main/EventManager",

    // other modules that are necessary to include to startup the app
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "i18next",
    "spin",
    "org/forgerock/commons/ui/common/main",
    "org/forgerock/openam/ui/main",
    "config/main",
    "store/index"
], (Constants, EventManager) => {
    EventManager.sendEvent(Constants.EVENT_DEPENDENCIES_LOADED);
});
