/*
 * Copyright 2018 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */

import { bindActionCreators } from "redux";
import { isEmpty, map } from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";

import { create, getInitialState } from "org/forgerock/openam/ui/admin/services/realm/sts/STSService";
import { REST_STS } from "org/forgerock/openam/ui/admin/services/realm/sts/STSTypes";
import { setSchema } from "store/modules/remote/config/realm/sts/rest/schema";
import { setTemplate } from "store/modules/remote/config/realm/sts/rest/template";
import connectWithStore from "components/redux/connectWithStore";
import isValidId from "org/forgerock/openam/ui/admin/views/realms/common/isValidId";
import Messages from "org/forgerock/commons/ui/common/components/Messages";
import NewRestSTS from "./NewRestSTS";
import Router from "org/forgerock/commons/ui/common/main/Router";
import withRouter from "org/forgerock/commons/ui/common/components/hoc/withRouter";
import withRouterPropType from "org/forgerock/commons/ui/common/components/hoc/withRouterPropType";

class NewRestSTSContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            id: "",
            isFetching: false
        };

        this.handleCreate = this.handleCreate.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
    }

    componentDidMount () {
        const realm = this.props.router.params[0];

        getInitialState(realm, REST_STS).then(({ schema, values }) => {
            this.setState({ isFetching: false });
            this.props.setSchema(schema[0]);
            this.props.setTemplate(values[0]);
        }, (response) => {
            this.setState({ isFetching: false });
            Messages.addMessage({ response, type: Messages.TYPE_DANGER });
        });
    }

    handleCreate (formData) {
        const realm = this.props.router.params[0];

        create(realm, REST_STS, this.state.id, formData).then((response) => {
            Router.routeTo(Router.configuration.routes.realmsStsRestEdit,
                { args: map([realm, response._id], encodeURIComponent), trigger: true });
        }, (response) => {
            Messages.addMessage({ response, type: Messages.TYPE_DANGER });
        });
    }

    handleIdChange (id) {
        this.setState({ id });
    }

    render () {
        const validId = isValidId(this.state.id);
        const createAllowed = validId && !isEmpty(this.state.id);

        return (
            <NewRestSTS
                id={ this.state.id }
                isCreateAllowed={ createAllowed }
                isFetching={ this.state.isFetching }
                isValidId={ validId }
                onCreate={ this.handleCreate }
                onIdChange={ this.handleIdChange }
                schema={ this.props.schema }
                template={ this.props.template }
            />
        );
    }
}

NewRestSTSContainer.propTypes = {
    router: withRouterPropType,
    schema: PropTypes.shape({
        type: PropTypes.string.isRequired
    }),
    setSchema: PropTypes.func.isRequired,
    setTemplate: PropTypes.func.isRequired,
    template: PropTypes.shape({
        type: PropTypes.string.isRequired
    })
};

NewRestSTSContainer = connectWithStore(NewRestSTSContainer,
    (state) => ({
        schema: state.remote.config.realm.sts.rest.schema,
        template: state.remote.config.realm.sts.rest.template
    }),
    (dispatch) => ({
        setSchema: bindActionCreators(setSchema, dispatch),
        setTemplate: bindActionCreators(setTemplate, dispatch)
    })
);
NewRestSTSContainer = withRouter(NewRestSTSContainer);

export default NewRestSTSContainer;
