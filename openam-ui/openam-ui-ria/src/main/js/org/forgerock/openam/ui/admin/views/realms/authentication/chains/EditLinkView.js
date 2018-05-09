/*
 * Copyright 2015-2018 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */

define([
    "jquery",
    "lodash",
    "org/forgerock/commons/ui/common/main/AbstractView",
    "org/forgerock/commons/ui/common/components/BootstrapDialog",
    "org/forgerock/openam/ui/common/components/SelectComponent",
    "org/forgerock/openam/ui/common/components/TemplateComponent",
    "templates/admin/views/realms/authentication/SelectModuleItem",
    "templates/admin/views/realms/authentication/SelectModuleOption",
    "templates/admin/views/realms/authentication/chains/EditLinkTemplate",
    "templates/admin/views/realms/authentication/chains/EditLinkTableTemplate"
], ($, _, AbstractView, BootstrapDialog, SelectComponent, TemplateComponent, SelectModuleItemTemplate,
    SelectModuleOptionTemplate, EditLinkTemplate, EditLinkTableTemplate) => { // eslint-disable-line padded-blocks

    SelectComponent = SelectComponent.default;
    TemplateComponent = TemplateComponent.default;

    var EditLinkView = AbstractView.extend({
        editLinkTemplate: EditLinkTemplate,
        editLinkTableTemplate: EditLinkTableTemplate,
        show (view) {
            this.data = view.data;
            var self = this,
                newLink = !self.data.linkConfig,
                linkConfig = self.data.linkConfig || { module: "", options: {}, criteria: "" },
                formData = self.data,
                title = linkConfig.module ? $.t("console.authentication.editChains.editModule")
                    : $.t("console.authentication.editChains.newModule");

            const template = self.editLinkTemplate({});
            const tableTemplate = self.editLinkTableTemplate({ linkConfig });
            BootstrapDialog.show({
                message () {
                    var $template = $("<div></div>").append(template);
                    $template.find("#editLinkOptions").append(tableTemplate);
                    return $template;
                },
                title,
                closable: false,
                buttons: [{
                    label: $.t("common.form.cancel"),
                    action (dialog) {
                        view.parent.validateChain();
                        dialog.close();
                    }
                }, {
                    label: $.t("common.form.ok"),
                    cssClass: "btn-primary",
                    id: "saveBtn",
                    action (dialog) {
                        if (newLink) {
                            view.data.linkConfig = linkConfig;
                            view.parent.data.form.chainData.authChainConfiguration.push(linkConfig);
                            view.parent.addItemToList(view.element);
                        }

                        view.render();
                        dialog.close();
                    }
                }],
                onshow (dialog) {
                    dialog.getButton("saveBtn").disable();

                    const itemComponent = new TemplateComponent({
                        template: SelectModuleItemTemplate
                    });

                    const optionComponent = new TemplateComponent({
                        template: SelectModuleOptionTemplate
                    });

                    self.moduleSelect = new SelectComponent({
                        options: formData.allModules,
                        selectedOption: _.find(formData.allModules, "_id", linkConfig.module),
                        onChange (module) {
                            linkConfig.module = module._id;
                            linkConfig.type = module.type;
                            dialog.options.validateDialog(dialog);
                        },
                        itemComponent,
                        optionComponent,
                        searchFields: ["_id", "typeDescription"]
                    });
                    dialog.getModalBody().find("[data-module-select]")
                        .append(self.moduleSelect.render().el);

                    const criteriaOptions = _.map(formData.allCriteria, (value, key) => ({ key, value }));
                    self.criteriaSelect = new SelectComponent({
                        options: criteriaOptions,
                        selectedOption: _.find(criteriaOptions, "key", linkConfig.criteria),
                        onChange (option) {
                            linkConfig.criteria = option.key;
                            dialog.options.validateDialog(dialog);
                        },
                        labelField: "value",
                        searchFields: ["value"]
                    });
                    dialog.getModalBody().find("[data-criteria-select]")
                        .append(self.criteriaSelect.render().el);

                    dialog.getModalBody().on("click", "[data-add-option]", (e) => {
                        var $tr = $(e.target).closest("tr"),
                            optionsKey = $tr.find("#optionsKey").val().trim(),
                            optionsValue = $tr.find("#optionsValue").val().trim(),
                            options = {};

                        options[optionsKey] = optionsValue;
                        if (optionsKey && optionsValue && !_.has(linkConfig.options, optionsKey)) {
                            _.extend(linkConfig.options, options);
                            dialog.options.refreshOptionsTab(dialog);
                            dialog.options.validateDialog(dialog);
                        }
                    });

                    dialog.getModalBody().on("click", "[data-delete-option]", (e) => {
                        var optionsKey = $(e.target).closest("tr").find(".optionsKey").html();
                        if (_.has(linkConfig.options, optionsKey)) {
                            delete linkConfig.options[optionsKey];
                        }
                        dialog.options.refreshOptionsTab(dialog);
                        dialog.options.validateDialog(dialog);
                    });
                },
                validateDialog (dialog) {
                    if (linkConfig.module.length === 0 || linkConfig.criteria.length === 0) {
                        dialog.getButton("saveBtn").disable();
                    } else {
                        dialog.getButton("saveBtn").enable();
                    }
                },
                refreshOptionsTab (dialog) {
                    const tableTemplate = self.editLinkTableTemplate({ linkConfig });
                    dialog.getModalBody().find("#editLinkOptions").html(tableTemplate);
                }

            });
        }
    });
    return new EditLinkView();
});
