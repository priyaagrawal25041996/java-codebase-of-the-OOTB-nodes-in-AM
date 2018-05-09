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
 * Copyright 2017 ForgeRock AS.
 */

define([
    "store/modules/remote/config/realm/applications/agents/softwarePublisher/agents/schema"
], (module) => {
    const schema = { key: "value" };

    describe("store/modules/remote/config/realm/applications/agents/softwarePublisher/agents/schema", () => {
        describe("actions", () => {
            describe("#setSchema", () => {
                it("creates an action", () => {
                    expect(module.setSchema(schema)).eql({
                        type: "remote/config/realm/applications/agents/softwarePublisher/agents/schema/SET_SCHEMA",
                        payload: schema
                    });
                });
            });
        });
        describe("reducer", () => {
            it("returns the initial state", () => {
                expect(module.default(undefined, {})).to.be.null;
            });

            it("handles #setSchema action", () => {
                expect(module.default({}, module.setSchema(schema))).eql(schema);
            });
        });
    });
});
