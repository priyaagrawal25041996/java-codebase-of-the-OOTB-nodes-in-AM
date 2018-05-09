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
 * Copyright 2015-2018 ForgeRock AS.
 */

define([
    "sinon"
], (sinon) => {
    describe("org/forgerock/openam/ui/common/util/RealmHelper", () => {
        let RealmHelper;
        let URIUtils;
        let Configuration;

        before(() => {
            const injector = require("inject-loader!org/forgerock/openam/ui/common/util/RealmHelper");

            Configuration = {
                globalData: {
                    auth: {
                        subRealm: undefined
                    }
                }
            };
            URIUtils = require("org/forgerock/commons/ui/common/util/URIUtils");

            RealmHelper = injector({
                "org/forgerock/commons/ui/common/main/Configuration": Configuration,
                "org/forgerock/commons/ui/common/util/URIUtils": URIUtils
            });
        });

        describe("#decorateURLWithOverrideRealm", () => {
            it("appends the current query string to the URL", sinon.test(function () {
                this.stub(URIUtils, "getCurrentQueryString").returns("realm=realm1");

                expect(RealmHelper.decorateURLWithOverrideRealm("http://www.example.com"))
                    .to.equal("http://www.example.com?realm=realm1");
            }));

            it("merges any existing query string with the current query string", sinon.test(function () {
                this.stub(URIUtils, "getCurrentQueryString").returns("realm=realm1");

                expect(RealmHelper.decorateURLWithOverrideRealm("http://www.example.com?key=value"))
                    .to.equal("http://www.example.com?key=value&realm=realm1");
            }));
        });

        describe("#decorateURIWithRealm", () => {
            it("appends as a query parameter the realm from the current query string", sinon.test(function () {
                Configuration.globalData.auth.subRealm = "realm1";
                this.stub(URIUtils, "getCurrentQueryString").returns("realm=realm2");

                expect(RealmHelper.decorateURIWithRealm("http://www.example.com/__subrealm__/"))
                    .to.equal("http://www.example.com/realm1/?realm=realm2");
            }));
        });

        describe("#decorateURIWithSubRealm", () => {
            it("replaces __subrealm__ with the sub realm from global configuration", sinon.test(() => {
                Configuration.globalData.auth.subRealm = "realm1";

                expect(RealmHelper.decorateURIWithSubRealm("http://www.example.com/__subrealm__/"))
                    .to.equal("http://www.example.com/realm1/");
            }));

            it("strips out __subrealm__ when there is no sub realm", sinon.test(() => {
                Configuration.globalData.auth.subRealm = "";

                expect(RealmHelper.decorateURIWithSubRealm("http://www.example.com/__subrealm__/"))
                    .to.equal("http://www.example.com/");
            }));
        });

        describe("#getOverrideRealm", () => {
            it("returns the realm from the current query string", sinon.test(function () {
                this.stub(URIUtils, "getCurrentQueryString").returns("realm=realm1");

                expect(RealmHelper.getOverrideRealm()).to.equal("realm1");
            }));

            it("returns the realm from the fragment query when it is present", sinon.test(function () {
                this.stub(URIUtils, "getCurrentFragmentQueryString").returns("realm=realm1");

                expect(RealmHelper.getOverrideRealm()).to.equal("realm1");
            }));

            it("prefers the realm from the query string over the fragment query", sinon.test(function () {
                this.stub(URIUtils, "getCurrentQueryString").returns("realm=realm1");
                this.stub(URIUtils, "getCurrentFragmentQueryString").returns("realm=realm2");

                expect(RealmHelper.getOverrideRealm()).to.equal("realm1");
            }));
        });

        describe("#getSubRealm", () => {
            it("returns the realm from the fragment path", sinon.test(function () {
                this.stub(URIUtils, "getCurrentFragment").returns("login/realm1");

                expect(RealmHelper.getSubRealm()).to.equal("realm1");
            }));

            it("prefers the realm in the global configuration over the fragment path", sinon.test(function () {
                this.stub(URIUtils, "getCurrentFragment").returns("other");
                Configuration.globalData.auth.subRealm = "realm1";

                expect(RealmHelper.getSubRealm()).to.equal("realm1");
            }));

            it("prefers the realm int he global configuration even if it is empty", sinon.test(function () {
                this.stub(URIUtils, "getCurrentFragment").returns("other");
                Configuration.globalData.auth.subRealm = "";

                expect(RealmHelper.getSubRealm()).to.equal("");
            }));

            it("normalizes the url with a subrealm by removing the trailing slash", sinon.test(function () {
                this.stub(URIUtils, "getCurrentFragment").returns("login/realm1/");

                expect(RealmHelper.getSubRealm()).to.equal("realm1");
            }));
        });
    });
});
