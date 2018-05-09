/*
 * Copyright 2017 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */
import { bindActionCreators } from "redux";
import { isEmpty, map } from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";

import {
    create,
    getInitialState
} from "org/forgerock/openam/ui/admin/services/realm/authentication/TreeService";
import { set as setSchema } from "store/modules/remote/config/realm/authentication/trees/schema";
import { set as setTemplate } from "store/modules/remote/config/realm/authentication/trees/template";
import connectWithStore from "components/redux/connectWithStore";
import Messages from "org/forgerock/commons/ui/common/components/Messages";
import NewTree from "./NewTree";
import Router from "org/forgerock/commons/ui/common/main/Router";
import withRouter from "org/forgerock/commons/ui/common/components/hoc/withRouter";
import withRouterPropType from "org/forgerock/commons/ui/common/components/hoc/withRouterPropType";

class NewTreeContainer extends Component {
    constructor () {
        super();
        this.state = {
            isFetching: true,
            treeName: ""
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleTreeNameChange = this.handleTreeNameChange.bind(this);
    }

    componentDidMount () {
        const realm = this.props.router.params[0];

        getInitialState(realm).then(({ schema, template }) => {
            this.setState({ isFetching: false });
            this.props.setSchema(schema[0]);
            this.props.setTemplate(template[0]);
        }, (response) => {
            this.setState({ isFetching: false });
            Messages.addMessage({ response, type: Messages.TYPE_DANGER });
        });
    }

    handleCreate (formData) {
        const realm = this.props.router.params[0];
        // This doesn't have the values.removeNullPasswords fix from OPENAM-11834 as not required for this view.
        // However it might need adding in the future.
        create(realm, formData, this.state.treeName).then(() => {
            Router.routeTo(Router.configuration.routes.realmsAuthenticationTreesEdit,
                { args: map([realm, this.state.treeName], encodeURIComponent), trigger: true });
        }, (response) => Messages.addMessage({ response, type: Messages.TYPE_DANGER }));
    }

    handleTreeNameChange (treeName) {
        this.setState({ treeName });
    }

    render () {
        return (
            <NewTree
                isCreateAllowed={ !isEmpty(this.state.treeName) }
                isFetching={ this.state.isFetching }
                onCreate={ this.handleCreate }
                onTreeNameChange={ this.handleTreeNameChange }
                schema={ this.props.schema }
                template={ this.props.template }
                treeName={ this.state.treeName }
            />
        );
    }
}

NewTreeContainer.propTypes = {
    router: withRouterPropType,
    schema: PropTypes.objectOf(PropTypes.object).isRequired,
    setSchema: PropTypes.func.isRequired,
    setTemplate: PropTypes.func.isRequired,
    template: PropTypes.objectOf(PropTypes.object).isRequired
};

NewTreeContainer = connectWithStore(NewTreeContainer,
    (state) => ({
        schema: state.remote.config.realm.authentication.trees.schema,
        template: state.remote.config.realm.authentication.trees.template
    }),
    (dispatch) => ({
        setSchema: bindActionCreators(setSchema, dispatch),
        setTemplate: bindActionCreators(setTemplate, dispatch)
    })
);
NewTreeContainer = withRouter(NewTreeContainer);

export default NewTreeContainer;
