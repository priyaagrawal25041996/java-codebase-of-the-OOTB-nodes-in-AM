/*
 * Copyright 2017-2018 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */
import { bindActionCreators } from "redux";
import { isEqual, map, pluck, values } from "lodash";
import { t } from "i18next";
import PropTypes from "prop-types";
import React, { Component } from "react";

import { getAll, remove } from "org/forgerock/openam/ui/admin/services/realm/AgentGroupsService";
import { REMOTE_CONSENT_AGENT } from "org/forgerock/openam/ui/admin/services/realm/AgentTypes";
import { setInstances } from "store/modules/remote/config/realm/applications/agents/remoteConsent/groups/instances";
import connectWithStore from "components/redux/connectWithStore";
import ListRemoteConsentAgentGroups from "./ListRemoteConsentAgentGroups";
import Messages from "org/forgerock/commons/ui/common/components/Messages";
import Router from "org/forgerock/commons/ui/common/main/Router";
import showConfirmationBeforeAction from "org/forgerock/openam/ui/admin/utils/form/showConfirmationBeforeAction";
import withPagination, { withPaginationPropTypes }
    from "org/forgerock/openam/ui/admin/views/realms/common/withPagination";
import withRouter from "org/forgerock/commons/ui/common/components/hoc/withRouter";
import withRouterPropType from "org/forgerock/commons/ui/common/components/hoc/withRouterPropType";

class ListRemoteConsentAgentGroupsContainer extends Component {
    constructor () {
        super();
        this.state = { isFetching: true };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleTableDataChange = this.handleTableDataChange.bind(this);
    }

    componentDidMount () {
        this.handleTableDataChange(this.props.pagination);
    }

    componentWillReceiveProps (nextProps) {
        if (!isEqual(this.props.pagination, nextProps.pagination)) {
            this.handleTableDataChange(nextProps.pagination);
        }
    }

    handleTableDataChange (pagination) {
        const realm = this.props.router.params[0];
        const additionalParams = {
            fields: [""],
            pagination
        };
        getAll(realm, REMOTE_CONSENT_AGENT, additionalParams).then((response) => {
            this.setState({ isFetching: false });
            this.props.pagination.onDataChange(response);
            this.props.setInstances(response.result);
        }, (response) => {
            this.setState({ isFetching: false });
            Messages.addMessage({ response, type: Messages.TYPE_DANGER });
        });
    }

    handleDelete (items) {
        const ids = pluck(items, "_id");
        const realm = this.props.router.params[0];

        showConfirmationBeforeAction({
            message: t("console.applications.agents.remoteConsent.groups.confirmDeleteSelected", { count: ids.length })
        }, () => {
            remove(realm, REMOTE_CONSENT_AGENT, ids).then(() => {
                Messages.messages.displayMessageFromConfig("changesSaved");
                this.props.pagination.onDataDelete(ids.length);
            }, (response) => {
                Messages.addMessage({ response, type: Messages.TYPE_DANGER });
                this.props.pagination.onDataDelete(ids.length);
            });
        });
    }

    handleEdit (item) {
        const id = item._id;
        const realm = this.props.router.params[0];

        Router.routeTo(Router.configuration.routes.realmsApplicationsAgentsRemoteConsentAgentGroupsEdit, {
            args: map([realm, id], encodeURIComponent),
            trigger: true
        });
    }

    render () {
        const realm = this.props.router.params[0];
        const newHref = Router.getLink(
            Router.configuration.routes.realmsApplicationsAgentsRemoteConsentAgentGroupsNew, [
                encodeURIComponent(realm)
            ]);

        return (
            <ListRemoteConsentAgentGroups
                isFetching={ this.state.isFetching }
                items={ this.props.groups }
                newHref={ `#${newHref}` }
                onDelete={ this.handleDelete }
                onRowClick={ this.handleEdit }
                options={ {
                    ...this.props.pagination
                } }
            />
        );
    }
}

ListRemoteConsentAgentGroupsContainer.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object),
    pagination: withPaginationPropTypes,
    router: withRouterPropType,
    setInstances: PropTypes.func.isRequired
};

ListRemoteConsentAgentGroupsContainer = connectWithStore(ListRemoteConsentAgentGroupsContainer,
    (state) => ({
        groups: values(state.remote.config.realm.applications.agents.remoteConsent.groups.instances)
    }),
    (dispatch) => ({
        setInstances: bindActionCreators(setInstances, dispatch)
    })
);
ListRemoteConsentAgentGroupsContainer = withRouter(ListRemoteConsentAgentGroupsContainer);
ListRemoteConsentAgentGroupsContainer = withPagination(ListRemoteConsentAgentGroupsContainer);

export default ListRemoteConsentAgentGroupsContainer;
