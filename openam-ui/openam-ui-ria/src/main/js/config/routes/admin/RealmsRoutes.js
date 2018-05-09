/*
 * Copyright 2015-2018 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */
/* eslint-disable max-len */

define(() => {
    const scopedByRealm = (fragment) => new RegExp(`^realms/((?:%2F)[^/]*)/${fragment}$`);
    const defaultScopedByRealm = (fragment) => scopedByRealm(`?(?:${fragment})?`);
    const routes = {
        "realms": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/ListRealmsView.jsm"),
            url: /^realms\/*$/,
            pattern: "realms",
            role: "ui-realm-admin",
            navGroup: "admin"
        },
        "realmEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/EditRealmView.js"),
            url: scopedByRealm("edit"),
            pattern: "realms/?/edit",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/EditRealmView.js"),
            url: /^realms\/new/,
            pattern: "realms/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsDashboard": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/dashboard/DashboardView.js"),
            url: defaultScopedByRealm("dashboard"),
            pattern: "realms/?/dashboard",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsAuthenticationSettings": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/SettingsView.js"),
            url: scopedByRealm("authentication-settings"),
            pattern: "realms/?/authentication-settings",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsAuthenticationChains": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/ChainsView.js"),
            url: scopedByRealm("authentication-chains"),
            pattern: "realms/?/authentication-chains",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsAuthenticationChainEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/chains/EditChainView.js"),
            url: scopedByRealm("authentication-chains/edit/([^/]+)"),
            pattern: "realms/?/authentication-chains/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin"
        },
        "realmsAuthenticationChainNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/chains/AddChainView.js"),
            url: scopedByRealm("authentication-chains/new"),
            pattern: "realms/?/authentication-chains/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },

        "realmsAuthenticationModules": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/ModulesView.js"),
            url: scopedByRealm("authentication-modules"),
            pattern: "realms/?/authentication-modules",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsAuthenticationModuleNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/modules/AddModuleView.js"),
            url: scopedByRealm("authentication-modules/new"),
            pattern: "realms/?/authentication-modules/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsAuthenticationModuleEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/modules/EditModuleView.js"),
            url: scopedByRealm("authentication-modules/([^/]+)/edit/([^/]+)"),
            pattern: "realms/?/authentication-modules/?/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsAuthenticationTrees": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/trees/list/ListTreesContainer.jsx"),
            url: scopedByRealm("authentication-trees"),
            pattern: "realms/?/authentication-trees",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsAuthenticationTreesNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/trees/new/NewTreeContainer.jsx"),
            url: scopedByRealm("authentication-trees/new"),
            pattern: "realms/?/authentication-trees/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsAuthenticationTreesEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/trees/edit/EditTreeContainer.jsx"),
            url: scopedByRealm("authentication-trees/edit/([^/]+)"),
            pattern: "realms/?/authentication-trees/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsAuthenticationWebhooks": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/webhooks/list/ListWebhooksContainer"),
            url: scopedByRealm("webhooks"),
            pattern: "realms/?/webhooks",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsAuthenticationWebhooksEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/webhooks/edit/EditWebhookContainer"),
            url: scopedByRealm("webhooks/edit/([^/]+)"),
            pattern: "realms/?/webhooks/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsAuthenticationWebhooksNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authentication/webhooks/new/NewWebhookContainer"),
            url: scopedByRealm("webhooks/new"),
            pattern: "realms/?/webhooks/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsServices": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/services/ServicesView.js"),
            url: scopedByRealm("services"),
            pattern: "realms/?/services",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsServiceEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/services/EditServiceView.js"),
            url: scopedByRealm("services/edit/([^/]+)"),
            pattern: "realms/?/services/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsServiceNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/services/NewServiceView.jsm"),
            url: scopedByRealm("services/new"),
            pattern: "realms/?/services/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsServiceSubSchemaNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/services/NewServiceSubSchemaView.js"),
            url: scopedByRealm("services/edit/([^/]+)/([^/]+)/new"),
            pattern: "realms/?/services/edit/?/?/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsServiceSubSchemaEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/services/EditServiceSubSchemaView.js"),
            url: scopedByRealm("services/edit/([^/]+)/([^/]+)/edit/([^/]+)"),
            pattern: "realms/?/services/edit/?/?/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsSessions": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/sessions/SessionsView.jsx"),
            url: scopedByRealm("sessions"),
            pattern: "realms/?/sessions",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsPolicySets": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authorization/policySets/PolicySetsView.js"),
            url: scopedByRealm("authorization-policySets"),
            pattern: "realms/?/authorization-policySets",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsPolicySetEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authorization/policySets/EditPolicySetView.js"),
            url: scopedByRealm("authorization-policySets/edit/([^/]+)"),
            pattern: "realms/?/authorization-policySets/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsPolicySetNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authorization/policySets/EditPolicySetView.js"),
            url: scopedByRealm("authorization-policySets/new"),
            pattern: "realms/?/authorization-policySets/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsPolicyNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authorization/policies/EditPolicyView.js"),
            url: scopedByRealm("authorization-policySets/edit/([^/]+)/policies/new"),
            pattern: "realms/?/authorization-policySets/edit/?/policies/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsPolicyEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authorization/policies/EditPolicyView.js"),
            url: scopedByRealm("authorization-policySets/edit/([^/]+)/policies/edit/([^/]+)"),
            pattern: "realms/?/authorization-policySets/edit/?/policies/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsResourceTypes": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authorization/resourceTypes/ResourceTypesView.js"),
            url: scopedByRealm("authorization-resourceTypes"),
            pattern: "realms/?/authorization-resourceTypes",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsResourceTypeEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authorization/resourceTypes/EditResourceTypeView.js"),
            url: scopedByRealm("authorization-resourceTypes/edit/([^/]*)"),
            pattern: "realms/?/authorization-resourceTypes/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsResourceTypeNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/authorization/resourceTypes/EditResourceTypeView.js"),
            url: scopedByRealm("authorization-resourceTypes/new"),
            pattern: "realms/?/authorization-resourceTypes/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsScripts": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/scripts/ScriptsView.js"),
            url: scopedByRealm("scripts"),
            pattern: "realms/?/scripts",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsScriptEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/scripts/EditScriptView.js"),
            url: scopedByRealm("scripts/edit/([^/]*)"),
            pattern: "realms/?/scripts/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsScriptNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/scripts/EditScriptView.js"),
            url: scopedByRealm("scripts/new"),
            pattern: "realms/?/scripts/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsOAuth2": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/oauth2/OAuth2.jsx"),
            url: scopedByRealm("applications-oauth2"),
            pattern: "realms/?/applications-oauth2",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsOAuth2ClientsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/oauth2/clients/new/NewOAuth2ClientContainer.jsx"),
            url: scopedByRealm("applications-oauth2/clients/new"),
            pattern: "realms/?/applications-oauth2/clients/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsOAuth2ClientsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/oauth2/clients/edit/EditOAuth2Client.jsm"),
            url: scopedByRealm("applications-oauth2/clients/edit/([^/]*)"),
            pattern: "realms/?/applications-oauth2/clients/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsOAuth2GroupsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/oauth2/groups/edit/EditOAuth2Group.jsm"),
            url: scopedByRealm("applications-oauth2/groups/edit/([^/]*)"),
            pattern: "realms/?/applications-oauth2/groups/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsOAuth2GroupsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/oauth2/groups/new/NewOAuth2GroupContainer.jsx"),
            url: scopedByRealm("applications-oauth2/groups/new"),
            pattern: "realms/?/applications-oauth2/groups/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsWeb": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/web/WebAgents.jsx"),
            url: scopedByRealm("applications-agents-web"),
            pattern: "realms/?/applications-agents-web",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsWebAgentsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/web/agents/new/NewWebAgentContainer.jsx"),
            url: scopedByRealm("applications-agents-web/agents/new"),
            pattern: "realms/?/applications-agents-web/agents/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsWebAgentsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/web/agents/edit/EditWebAgent.jsm"),
            url: scopedByRealm("applications-agents-web/agents/edit/([^/]*)"),
            pattern: "realms/?/applications-agents-web/agents/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsWebAgentGroupsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/web/groups/new/NewWebAgentGroupContainer.jsx"),
            url: scopedByRealm("applications-agents-web/groups/new"),
            pattern: "realms/?/applications-agents-web/groups/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsWebAgentGroupsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/web/groups/edit/EditWebAgentGroup.jsm"),
            url: scopedByRealm("applications-agents-web/groups/edit/([^/]*)"),
            pattern: "realms/?/applications-agents-web/groups/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsJava": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/java/JavaAgents.jsx"),
            url: scopedByRealm("applications-agents-java"),
            pattern: "realms/?/applications-agents-java",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsJavaAgentsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/java/agents/new/NewJavaAgentContainer.jsx"),
            url: scopedByRealm("applications-agents-java/agents/new"),
            pattern: "realms/?/applications-agents-java/agents/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsJavaAgentsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/java/agents/edit/EditJavaAgent.jsm"),
            url: scopedByRealm("applications-agents-java/agents/edit/([^/]*)"),
            pattern: "realms/?/applications-agents-java/agents/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsJavaAgentGroupsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/java/groups/edit/EditJavaAgentGroup.jsm"),
            url: scopedByRealm("applications-agents-java/groups/edit/([^/]*)"),
            pattern: "realms/?/applications-agents-java/groups/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsJavaAgentGroupsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/java/groups/new/NewJavaAgentGroupContainer.jsx"),
            url: scopedByRealm("applications-agents-java/groups/new"),
            pattern: "realms/?/applications-agents-java/groups/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsSoapSTS": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/soap-sts/SoapSTSAgents.jsx"),
            url: scopedByRealm("applications-agents-soap-sts"),
            pattern: "realms/?/applications-agents-soap-sts",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsSoapSTSAgentsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/soap-sts/agents/new/NewSoapSTSAgentContainer.jsx"),
            url: scopedByRealm("applications-agents-soap-sts/agents/new"),
            pattern: "realms/?/applications-agents-soap-sts/agents/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsSoapSTSAgentsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/soap-sts/agents/edit/EditSoapSTSAgent.jsm"),
            url: scopedByRealm("applications-agents-soap-sts/agents/edit/([^/]*)"),
            pattern: "realms/?/applications-agents-soap-sts/agents/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsSoapSTSAgentGroupsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/soap-sts/groups/new/NewSoapSTSAgentGroupContainer.jsx"),
            url: scopedByRealm("applications-agents-soap-sts/groups/new"),
            pattern: "realms/?/applications-agents-soap-sts/groups/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsSoapSTSAgentGroupsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/soap-sts/groups/edit/EditSoapSTSAgentGroup.jsm"),
            url: scopedByRealm("applications-agents-soap-sts/groups/edit/([^/]*)"),
            pattern: "realms/?/applications-agents-soap-sts/groups/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsSoftwarePublisher": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/software-publisher/SoftwarePublisherAgents.jsx"),
            url: scopedByRealm("applications-agents-software-publisher"),
            pattern: "realms/?/applications-agents-software-publisher",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsSoftwarePublisherAgentsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/software-publisher/agents/new/NewSoftwarePublisherAgentContainer.jsx"),
            url: scopedByRealm("applications-agents-software-publisher/agents/new"),
            pattern: "realms/?/applications-agents-software-publisher/agents/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsSoftwarePublisherAgentsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/software-publisher/agents/edit/EditSoftwarePublisherAgent.jsm"),
            url: scopedByRealm("applications-agents-software-publisher/agents/edit/([^/]*)"),
            pattern: "realms/?/applications-agents-software-publisher/agents/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsSoftwarePublisherAgentGroupsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/software-publisher/groups/new/NewSoftwarePublisherAgentGroupContainer.jsx"),
            url: scopedByRealm("applications-agents-software-publisher/groups/new"),
            pattern: "realms/?/applications-agents-software-publisher/groups/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsSoftwarePublisherAgentGroupsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/software-publisher/groups/edit/EditSoftwarePublisherAgentGroup.jsm"),
            url: scopedByRealm("applications-agents-software-publisher/groups/edit/([^/]*)"),
            pattern: "realms/?/applications-agents-software-publisher/groups/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsRemoteConsent": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/remote-consent/RemoteConsentAgents.jsx"),
            url: scopedByRealm("applications-agents-remote-consent"),
            pattern: "realms/?/applications-agents-remote-consent",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsRemoteConsentAgentsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/remote-consent/agents/new/NewRemoteConsentAgentContainer.jsx"),
            url: scopedByRealm("applications-agents-remote-consent/agents/new"),
            pattern: "realms/?/applications-agents-remote-consent/agents/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsRemoteConsentAgentsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/remote-consent/agents/edit/EditRemoteConsentAgent.jsm"),
            url: scopedByRealm("applications-agents-remote-consent/agents/edit/([^/]*)"),
            pattern: "realms/?/applications-agents-remote-consent/agents/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsRemoteConsentAgentGroupsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/remote-consent/groups/new/NewRemoteConsentAgentGroupContainer.jsx"),
            url: scopedByRealm("applications-agents-remote-consent/groups/new"),
            pattern: "realms/?/applications-agents-remote-consent/groups/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsAgentsRemoteConsentAgentGroupsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/agents/remote-consent/groups/edit/EditRemoteConsentAgentGroup.jsm"),
            url: scopedByRealm("applications-agents-remote-consent/groups/edit/([^/]*)"),
            pattern: "realms/?/applications-agents-remote-consent/groups/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsFederation": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/federation/Federation.jsx"),
            url: scopedByRealm("applications-federation"),
            pattern: "realms/?/applications-federation",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsFederationCirclesOfTrustNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/federation/circlesoftrust/new/NewCircleOfTrustContainer.jsx"),
            url: scopedByRealm("applications-federation/circlesoftrust/new"),
            pattern: "realms/?/applications-federation/circlesoftrust/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsApplicationsFederationCirclesOfTrustEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/applications/federation/circlesoftrust/edit/EditCircleOfTrust.jsm"),
            url: scopedByRealm("applications-federation/circlesoftrust/edit/([^/]*)"),
            pattern: "realms/?/applications-federation/circlesoftrust/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsDataStores": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/datastores/list/ListDataStoresContainer.jsx"),
            url: scopedByRealm("datastores"),
            pattern: "realms/?/datastores",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsDataStoresEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/datastores/edit/EditDataStore.jsm"),
            url: scopedByRealm("datastores/([^/]*)/edit/([^/]*)"),
            pattern: "realms/?/datastores/?/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsDataStoresNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/datastores/new/NewDataStoreContainer.jsx"),
            url: scopedByRealm("datastores/new"),
            pattern: "realms/?/datastores/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsIdentities": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/identities/Identities.jsx"),
            url: scopedByRealm("identities"),
            pattern: "realms/?/identities",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsIdentitiesUsersEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/identities/users/edit/EditUser.jsx"),
            url: scopedByRealm("identities/edit/([^/]*)"),
            pattern: "realms/?/identities/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsIdentitiesUsersNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/identities/users/new/NewUserContainer.jsx"),
            url: scopedByRealm("identities/new"),
            pattern: "realms/?/identities/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsIdentitiesUsersServicesNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/identities/users/edit/services/new/NewUserServiceContainer.jsx"),
            url: scopedByRealm("identities/edit/([^/]*)/services/new/([^/]*)"),
            pattern: "realms/?/identities/edit/?/services/new/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsIdentitiesUsersServicesEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/identities/users/edit/services/edit/EditUserService.jsm"),
            url: scopedByRealm("identities/edit/([^/]*)/services/edit/([^/]*)"),
            pattern: "realms/?/identities/edit/?/services/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsIdentitiesGroupsEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/identities/groups/edit/EditGroupContainer.jsx"),
            url: scopedByRealm("identities/groups/edit/([^/]*)"),
            pattern: "realms/?/identities/groups/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsIdentitiesAllAuthenticatedEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/identities/groups/edit/EditAllAuthenticatedContainer.jsx"),
            url: scopedByRealm("identities/groups/edit/allAuthenticatedIdentities"),
            pattern: "realms/?/identities/groups/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsIdentitiesGroupsNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/identities/groups/new/NewGroupContainer.jsx"),
            url: scopedByRealm("identities/groups/new"),
            pattern: "realms/?/identities/groups/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsSts": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/sts/STS.jsx"),
            url: scopedByRealm("sts"),
            pattern: "realms/?/sts",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsStsRestNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/sts/rest/new/NewRestSTSContainer.jsx"),
            url: scopedByRealm("sts/rest/new"),
            pattern: "realms/?/sts/rest/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsStsSoapNew": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/sts/soap/new/NewSoapSTSContainer.jsx"),
            url: scopedByRealm("sts/soap/new"),
            pattern: "realms/?/sts/soap/new",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsStsRestEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/sts/rest/edit/EditRestSTS.jsm"),
            url: scopedByRealm("sts/rest/edit/([^/]*)"),
            pattern: "realms/?/sts/rest/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        },
        "realmsStsSoapEdit": {
            view: () => import("org/forgerock/openam/ui/admin/views/realms/RealmTreeNavigationView.js"),
            page: () => import("org/forgerock/openam/ui/admin/views/realms/sts/soap/edit/EditSoapSTS.jsm"),
            url: scopedByRealm("sts/soap/edit/([^/]*)"),
            pattern: "realms/?/sts/soap/edit/?",
            role: "ui-realm-admin",
            navGroup: "admin",
            forceUpdate: true
        }
    };

    routes.realmDefault = routes.realmsDashboard;

    return routes;
});
