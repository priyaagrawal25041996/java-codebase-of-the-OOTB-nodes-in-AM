/*
 * Copyright 2016-2017 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */
package org.forgerock.openam.saml2.plugins;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.soap.SOAPMessage;

import org.forgerock.openam.wsfederation.common.ActiveRequestorException;

import com.iplanet.sso.SSOToken;

/**
 * Authenticates end-users for active requestor profile WS-Federation requests.
 */
public interface WsFedAuthenticator {

    /**
     * Authenticates the end-user for the incoming active WS-Federation request.
     *
     * @param request The HTTP request.
     * @param response The HTTP response.
     * @param soapMessage The SOAP message received by the STS endpoint.
     * @param realm The realm that is associated with the incoming request.
     * @param username The username extracted from the SOAP message.
     * @param password The password extracted from the SOAP message.
     * @return The {@link SSOToken} corresponding to the successful authentication. May not be null.
     * @throws ActiveRequestorException If there was any problem during the authentication, or if the authentication was
     * unsuccessful.
     */
    SSOToken authenticate(HttpServletRequest request, HttpServletResponse response, SOAPMessage soapMessage,
            String realm, String username, char[] password)
            throws ActiveRequestorException;
}
