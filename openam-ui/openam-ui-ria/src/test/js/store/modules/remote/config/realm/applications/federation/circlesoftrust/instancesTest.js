/*
 * Copyright 2017 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */

define([
    "store/modules/remote/config/realm/applications/federation/circlesoftrust/instances"
], (module) => {
    const agentOne = { _id: "one" };
    const agentTwo = { _id: "two" };

    describe("store/modules/remote/config/realm/applications/federation/circlesoftrust/instances", () => {
        describe("actions", () => {
            describe("#addInstance", () => {
                it("creates an action", () => {
                    expect(module.addInstance(agentOne)).eql({
                        type: "remote/config/realm/applications/federation/circlesoftrust/instances/ADD_INSTANCE",
                        payload: agentOne
                    });
                });
            });
            describe("#removeInstance", () => {
                it("creates an action", () => {
                    expect(module.removeInstance(agentOne)).eql({
                        type: "remote/config/realm/applications/federation/circlesoftrust/instances/REMOVE_INSTANCE",
                        payload: agentOne
                    });
                });
            });
            describe("#setInstances", () => {
                it("creates an action", () => {
                    expect(module.setInstances([agentOne, agentTwo])).eql({
                        type: "remote/config/realm/applications/federation/circlesoftrust/instances/SET_INSTANCES",
                        payload: [agentOne, agentTwo]
                    });
                });
            });
        });
        describe("reducer", () => {
            it("returns the initial state", () => {
                expect(module.default(undefined, {})).eql({});
            });

            it("handles #addInstance action", () => {
                expect(module.default({}, module.addInstance(agentOne))).eql({
                    "one": agentOne
                });
            });

            it("handles #removeInstance action", () => {
                const initialState = {
                    "one": agentOne,
                    "two": agentTwo
                };
                expect(module.default(initialState, module.removeInstance(agentTwo))).eql({
                    "one": agentOne
                });
            });

            it("handles #setInstances action", () => {
                expect(module.default({}, module.setInstances([agentOne, agentTwo]))).eql({
                    one: agentOne,
                    two: agentTwo
                });
            });
        });
    });
});
