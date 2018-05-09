/*
 * Copyright 2011-2018 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */

define([
    "org/forgerock/commons/ui/common/util/Constants"
], function(constants) {

    var obj = {
        "404": { //this route must be the first route
            view: () => import("org/forgerock/commons/ui/common/NotFoundView.js"),
            url: /^([\w\W]*)$/,
            pattern: "?"
        },
        "default": {
            event: constants.EVENT_HANDLE_DEFAULT_ROUTE,
            url: /^$/,
            pattern: ""
        },
        // from https://developers.facebook.com/blog/post/552/
        // We started adding a fragment #_=_ to the redirect_uri when this field is left blank.
        // Please ensure that your app can handle this behavior.
        "facebook_redirect": {
            event: constants.EVENT_HANDLE_DEFAULT_ROUTE,
            url: /^_=_$/,
            pattern: ""
        },
        "enableCookies": {
            view: () => import("org/forgerock/commons/ui/common/EnableCookiesView.js"),
            url: "enableCookies/"
        },
        //definitions for the following views here are generic
        //the actual path to each view is defined in config/AppConfiguration.js
        //view files are loaded when the GenericRouteInterfaceMap module is initialized
        "login": {
            view: () => import("LoginView"),
            url: /^login([^\&]+)?(&.+)?/,
            pattern: "login??",
            defaults: ["/",""],
            argumentNames: ["realm","additionalParameters"]
        },
        "logout": {
            event: constants.EVENT_LOGOUT,
            url: /^logout\/(.*)/
        }
    };

    return obj;
});
