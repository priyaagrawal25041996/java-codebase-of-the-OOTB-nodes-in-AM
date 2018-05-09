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
package org.forgerock.openam.auth.nodes;

import static org.forgerock.json.JsonValue.*;
import static org.forgerock.openam.auth.node.api.SharedStateConstants.REALM;
import static org.forgerock.openam.auth.node.api.SharedStateConstants.USERNAME;
import static org.forgerock.openam.auth.nodes.TreeContextFactory.newTreeContext;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

import org.forgerock.openam.auth.node.api.NodeProcessException;
import org.forgerock.openam.core.CoreWrapper;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.iplanet.sso.SSOException;
import com.sun.identity.idm.AMIdentity;
import com.sun.identity.idm.IdRepoException;

public class AccountLockoutNodeTest {

    @Mock
    AMIdentity userIdentity;

    @Mock
    CoreWrapper coreWrapper;

    @Mock
    AccountLockoutNode.Config config;

    @BeforeMethod
    public void before() throws IdRepoException, SSOException {
        initMocks(this);
        when(config.lockAction()).thenReturn(AccountLockoutNode.LockStatus.LOCK);
        given(coreWrapper.getIdentity(anyString(), any())).willReturn(userIdentity);
        when(coreWrapper.getIdentity(anyString(), any())).thenReturn(userIdentity);
    }

    @Test
    public void testNodeCallsAMToLockAccount() throws Exception {
        // Given
        AccountLockoutNode node = new AccountLockoutNode(coreWrapper, config);
        BDDMockito.willDoNothing().given(userIdentity).setActiveStatus(false);

        // When
        node.process(newTreeContext(json(object(field(REALM, "/"), field(USERNAME, "username")))));

        // Then verify setActiveStatus gets called
        Mockito.verify(userIdentity).setActiveStatus(eq(false));
    }

    @Test
    public void testNodeCallsAMToUnLockAccount() throws Exception {
        // Given
        AccountLockoutNode node = new AccountLockoutNode(coreWrapper, new AccountLockoutNode.Config() {
            @Override
            public AccountLockoutNode.LockStatus lockAction() {
                return AccountLockoutNode.LockStatus.UNLOCK;
            }
        });
        BDDMockito.willDoNothing().given(userIdentity).setActiveStatus(true);

        // When
        node.process(newTreeContext(json(object(field(REALM, "/"), field(USERNAME, "username")))));

        // Then verify setActiveStatus gets called
        Mockito.verify(userIdentity).setActiveStatus(eq(true));
    }

    @Test(expectedExceptions = NodeProcessException.class)
    public void testNullUsernameWillThrowNodeProcessException() throws Exception {
        // Given
        AccountLockoutNode node = new AccountLockoutNode(coreWrapper, config);
        BDDMockito.willDoNothing().given(userIdentity).setActiveStatus(false);

        // When username is null
        node.process(newTreeContext(json(object(field(REALM, "/")))));

        // Then -> Throw NodeProcessException
    }

    @Test(expectedExceptions = NodeProcessException.class)
    public void testNullRealmWillThrowNodeProcessException() throws Exception {
        // Given
        AccountLockoutNode node = new AccountLockoutNode(coreWrapper, config);
        BDDMockito.willDoNothing().given(userIdentity).setActiveStatus(false);

        // When realm is null
        node.process(newTreeContext(json(object(field(USERNAME, "username")))));

        // Then -> Throw NodeProcessException

    }

    @Test(expectedExceptions = NodeProcessException.class)
    public void testIdRepoExceptionIsHandled() throws Exception {
        // Given
        AccountLockoutNode node = new AccountLockoutNode(coreWrapper, config);
        BDDMockito.willThrow(new IdRepoException()).given(userIdentity).setActiveStatus(false);

        // When
        node.process(newTreeContext(json(object(field(REALM, "/"), field(USERNAME, "username")))));

        // Then -> IdRepoException is catch and transformed into a NodeProcessException
    }

    @Test(expectedExceptions = NodeProcessException.class)
    public void testIdSSOExceptionIsHandled() throws Exception {
        // Given
        AccountLockoutNode node = new AccountLockoutNode(coreWrapper, config);
        BDDMockito.willThrow(new SSOException("Test exception")).given(userIdentity).setActiveStatus(false);

        // When
        node.process(newTreeContext(json(object(field(REALM, "/"), field(USERNAME, "username")))));

        // Then -> SSOException is catch and transformed into a NodeProcessException
    }

}