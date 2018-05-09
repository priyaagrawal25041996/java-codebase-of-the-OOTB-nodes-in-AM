/*
 * Copyright 2017 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */
package org.forgerock.openam.saml2;

import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.forgerock.openam.federation.testutils.TestCaseConfigurationInstance;
import org.forgerock.openam.federation.testutils.TestCaseSessionProvider;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.google.common.collect.ImmutableMap;
import com.iplanet.sso.SSOToken;
import com.sun.identity.cot.COTConstants;
import com.sun.identity.cot.CircleOfTrustDescriptor;
import com.sun.identity.cot.CircleOfTrustManager;
import com.sun.identity.plugin.session.SessionManager;
import com.sun.identity.saml2.common.SAML2Constants;
import com.sun.identity.saml2.profile.ClientFaultException;

public class UtilProxySAMLAuthenticatorLookupTest {

    private static final String REALM = "/";
    private static final String TEST_COT = "TestCOT";
    private IDPSSOFederateRequest data;
    @Mock
    private HttpServletRequest request;
    @Mock
    private HttpServletResponse response;
    @Mock
    private PrintWriter out;
    @Mock
    private SSOToken ssoToken;
    private UtilProxySAMLAuthenticatorLookup lookup;

    @BeforeClass
    public void setup() {
        MockitoAnnotations.initMocks(this);
        data = new IDPSSOFederateRequest("test-id", REALM, null, "test-metaAlias", "openam-saml2-idp");
        data.setSession(ssoToken);
        lookup = new UtilProxySAMLAuthenticatorLookup(data, request, response, out);

        TestCaseConfigurationInstance.resetConfiguration();
    }

    @AfterMethod
    public void teardown() {
        TestCaseConfigurationInstance.resetConfiguration();
    }

    @Test(expectedExceptions = ClientFaultException.class)
    public void shouldFindSessionInvalidIfTheSessionHasInsufficientAuthLevel() throws Exception {
        // Given
        new CircleOfTrustManager().createCircleOfTrust(REALM,
                new CircleOfTrustDescriptor(TEST_COT, REALM, COTConstants.ACTIVE));
        TestCaseConfigurationInstance.configureSaml2(REALM, "/saml2/idp.xml", "/saml2/idp-extended.xml");
        TestCaseSessionProvider.setState(ssoToken, "test-session-id", "test-user", getSessionProperties(REALM, "0"));

        // When
        lookup.isSessionValid(SessionManager.getProvider());
    }

    @Test
    public void shouldFindSessionValidIfTheSessionWasUpgradedCorrectly() throws Exception {
        // Given
        new CircleOfTrustManager().createCircleOfTrust(REALM,
                new CircleOfTrustDescriptor(TEST_COT, REALM, COTConstants.ACTIVE));
        TestCaseConfigurationInstance.configureSaml2(REALM, "/saml2/idp.xml", "/saml2/idp-extended.xml");
        TestCaseSessionProvider.setState(ssoToken, "test-session-id", "test-user", getSessionProperties(REALM, "5"));

        // When
        final boolean sessionValid = lookup.isSessionValid(SessionManager.getProvider());

        // Then
        assertThat(sessionValid).isTrue();
    }

    @Test(expectedExceptions = ClientFaultException.class)
    public void shouldFindSessionInvalidIfTheSessionBelongsToDifferentRealm() throws Exception {
        // Given
        new CircleOfTrustManager().createCircleOfTrust(REALM,
                new CircleOfTrustDescriptor(TEST_COT, REALM, COTConstants.ACTIVE));
        TestCaseConfigurationInstance.configureSaml2(REALM, "/saml2/idp.xml", "/saml2/idp-extended.xml");
        TestCaseSessionProvider.setState(ssoToken, "test-session-id", "test-user", getSessionProperties("/foo", "0"));

        // When
        lookup.isSessionValid(SessionManager.getProvider());
    }

    private static ImmutableMap<String, List<String>> getSessionProperties(String realm, String authLevel) {
        return ImmutableMap.<String, List<String>>builder()
                .put(SAML2Constants.ORGANIZATION, singletonList(realm))
                .put(SAML2Constants.AUTH_LEVEL, singletonList(authLevel))
                .build();
    }
}
