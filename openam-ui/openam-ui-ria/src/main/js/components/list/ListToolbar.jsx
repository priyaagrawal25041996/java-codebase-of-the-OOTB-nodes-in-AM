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
 * Copyright 2017-2018 ForgeRock AS.
 */

import { Button, ButtonToolbar } from "react-bootstrap";
import { t } from "i18next";
import PropTypes from "prop-types";
import React from "react";

import AddButton from "components/AddButton";

const ListToolbar = ({ additionalButtons, addButton, isDeleteDisabled, onDelete, numberSelected }) => {
    const numberSelectedText = numberSelected ? `(${numberSelected})` : "";
    return (
        <ButtonToolbar className="page-toolbar">
            <AddButton
                href={ addButton.href }
                title={ addButton.title }
            >
                { addButton.menuItems }
            </AddButton>
            <Button disabled={ isDeleteDisabled } onClick={ onDelete }>
                <i className="fa fa-close" /> { t("common.form.delete") } { numberSelectedText }
            </Button>
            { additionalButtons }
        </ButtonToolbar>
    );
};

ListToolbar.propTypes = {
    addButton: PropTypes.objectOf({
        href: PropTypes.string,
        menuItems: PropTypes.arrayOf({
            href: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        }),
        title: PropTypes.string.isRequired
    }).isRequired,
    additionalButtons: PropTypes.node,
    isDeleteDisabled: PropTypes.bool.isRequired,
    numberSelected: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ListToolbar;
