/*
 * Copyright 2017 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */

package org.forgerock.openam.auth.nodes.jwt;

import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

import org.forgerock.caf.authentication.framework.AuthenticationFramework;
import org.forgerock.json.jose.jwt.Jwt;

/**
 * Handles several operations relating to Jwt claims.
 */
public class PersistentJwtClaimsHandler {

    private static final String RLM_CLAIM_KEY = "openam.rlm";
    private static final String USR_CLAIM_KEY = "openam.usr";
    private static final String ATY_CLAIM_KEY = "openam.aty";
    private static final String CLIENTIP_CLAIM_KEY = "openam.clientip";
    private static final String OPENAM_CLIENT_IP_CLAIM_KEY = "openam.clientip";
    private static final String OPENAM_REALM_CLAIM_KEY = "openam.rlm";
    private static final String ID_ATTRIBUTE = "id";
    private static final String OPENAM_USER_CLAIM_KEY = "openam.usr";

    /**
     * Create an auth context. An auth context is a container that stores several authentication claims.
     *
     * @param orgName  the org.
     * @param clientId the client id.
     * @param service  the service.
     * @param clientIP the client IP address.
     * @return A map of authentication claims.
     */
    public Map<String, String> createJwtAuthContext(String orgName, String clientId, String service, String clientIP) {
        Map<String, String> authContext = new HashMap<>();
        if (orgName != null) {
            authContext.put(RLM_CLAIM_KEY, orgName.toLowerCase());
        }
        authContext.put(USR_CLAIM_KEY, clientId);
        authContext.put(ATY_CLAIM_KEY, service);
        authContext.put(CLIENTIP_CLAIM_KEY, clientIP);
        return authContext;
    }

    /**
     * Gets the claims set context.
     *
     * @param jwt    the jwt.
     * @param bundle the resource bundle.
     * @return the claims as a forgerock authentication Map.
     * @throws InvalidPersistentJwtException if the jwt has no claims.
     */
    public Map getClaimsSetContext(Jwt jwt, ResourceBundle bundle) throws InvalidPersistentJwtException {
        Map claimsSetContext = jwt.getClaimsSet().getClaim(AuthenticationFramework.ATTRIBUTE_AUTH_CONTEXT, Map.class);
        if (claimsSetContext == null) {
            throw new InvalidPersistentJwtException(bundle.getString("claims.context.not.found"));
        }
        return claimsSetContext;
    }

    /**
     * Validates the claims. Checks IP if enforcing IP is enabled. Checks claims org matches request org.
     *
     * @param claimsSetContext the claims context.
     * @param bundle           the resource bundle containing external string.
     * @param requestOrg       the org of the request.
     * @param clientIp         the IP of the request.
     * @param enforceClientIp  if true, validate the request IP matches the claim IP.
     * @throws InvalidPersistentJwtException if validation fails.
     */
    public void validateClaims(Map claimsSetContext, ResourceBundle bundle, String requestOrg, String clientIp,
            boolean enforceClientIp) throws InvalidPersistentJwtException {
        String jwtOrg = (String) claimsSetContext.get(OPENAM_REALM_CLAIM_KEY);
        String jwtClaimIP = (String) claimsSetContext.get(OPENAM_CLIENT_IP_CLAIM_KEY);
        validateRequestOrg(jwtOrg, requestOrg, bundle);

        if (enforceClientIp) {
            validateRequestIp(clientIp, jwtClaimIP, bundle);
        }
    }

    /**
     * Gets a username from a jwt claims context.
     *
     * @param claimsSetContext the claims set context.
     * @param bundle the resource bundle.
     * @return the username.
     * @throws InvalidPersistentJwtException if it cannot get the username.
     */
    public String getUsername(Map claimsSetContext, ResourceBundle bundle) throws InvalidPersistentJwtException {
        if (claimsSetContext == null) {
            throw new InvalidPersistentJwtException(bundle.getString("auth.failed.no.user.null.claims"));
        }
        String username = (String) claimsSetContext.get(OPENAM_USER_CLAIM_KEY);
        if (username == null) {
            throw new InvalidPersistentJwtException(bundle.getString("auth.failed.no.user.empty.claims"));
        }
        Map<String, String> userAttributes = new HashMap<>();
        for (String entry : username.split(",")) {
            String[] pair = entry.split("=");
            userAttributes.put(pair[0], pair[1]);
        }
        return userAttributes.get(ID_ATTRIBUTE);
    }

    private void validateRequestOrg(String jwtOrg, String requestOrg, ResourceBundle bundle)
            throws InvalidPersistentJwtException {
        if (!requestOrg.equals(jwtOrg)) {
            throw new InvalidPersistentJwtException(bundle.getString("auth.failed.diff.realm"));
        }
    }

    private void validateRequestIp(String requestIP, String jwtClaimIP, ResourceBundle bundle)
            throws InvalidPersistentJwtException {
        if (jwtClaimIP == null || jwtClaimIP.isEmpty()) {
            throw new InvalidPersistentJwtException(bundle.getString("auth.failed.ip.mismatch"));
        }
        if (requestIP == null || requestIP.isEmpty()) {
            throw new InvalidPersistentJwtException(bundle.getString("auth.failed.ip.mismatch"));
        }
        if (!jwtClaimIP.equals(requestIP)) {
            throw new InvalidPersistentJwtException(bundle.getString("auth.failed.ip.mismatch"));
        }
    }

}
