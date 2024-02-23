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
 * Copyright 2023 ForgeRock AS.
 */

package com.sun.identity.saml2.plugins.scripted;

import static com.sun.identity.saml2.common.SAML2Constants.SP_ADAPTER_SCRIPT;
import static com.sun.identity.saml2.common.SAML2Constants.SP_ROLE;
import static org.forgerock.openam.saml2.service.Saml2ScriptContext.SAML2_SP_ADAPTER;

import java.io.PrintWriter;

import javax.script.Bindings;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.forgerock.http.Client;
import org.forgerock.openam.saml2.plugins.SPAdapter;
import org.forgerock.openam.saml2.service.Saml2ScriptContext;
import org.forgerock.openam.scripting.application.ScriptEvaluator;
import org.forgerock.openam.scripting.application.ScriptEvaluatorFactory;
import org.forgerock.openam.scripting.domain.Script;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.inject.Inject;
import com.sun.identity.saml2.common.SAML2Exception;
import com.sun.identity.saml2.plugins.scripted.bindings.SamlBindings.SpBindings;
import com.sun.identity.saml2.protocol.AuthnRequest;
import com.sun.identity.saml2.protocol.LogoutRequest;
import com.sun.identity.saml2.protocol.LogoutResponse;
import com.sun.identity.saml2.protocol.ManageNameIDRequest;
import com.sun.identity.saml2.protocol.ManageNameIDResponse;
import com.sun.identity.saml2.protocol.Response;

/**
 * Scripted implementation of the {@link SPAdapter}
 */
public class ScriptedSpAdapter implements SPAdapter {

    private static final Logger logger = LoggerFactory.getLogger(ScriptedSpAdapter.class);

    private final ScriptEvaluator scriptEvaluator;
    private final SpAdapterScriptHelper spAdapterScriptHelper;
    private final Client httpClient;
    private final ScriptExecutor executor;

    @Inject
    public ScriptedSpAdapter(ScriptEvaluatorFactory scriptEvaluatorFactory, SpAdapterScriptHelper spAdapterScriptHelper,
            Client httpClient, ScriptExecutor executor) {
        this.scriptEvaluator = scriptEvaluatorFactory.create(SAML2_SP_ADAPTER);
        this.spAdapterScriptHelper = spAdapterScriptHelper;
        this.httpClient = httpClient;
        this.executor = executor;
    }

    @Override
    public void preSingleSignOnRequest(String hostedEntityId, String idpEntityId, String realm,
            HttpServletRequest request, HttpServletResponse response, AuthnRequest authnRequest) throws SAML2Exception {
        Script script = executor.getScriptConfiguration(realm, hostedEntityId, SP_ROLE, SP_ADAPTER_SCRIPT);
        Bindings bindings = SpBindings.preSingleSignOnRequest()
                .withAuthnRequest(authnRequest)
                .withIdpEntityId(idpEntityId)
                .withHostedEntityId(hostedEntityId)
                .withRealm(realm)
                .withHttpClient(httpClient)
                .withRequest(request)
                .withResponse(response)
                .withSpAdapterScriptHelper(spAdapterScriptHelper)
                .withLoggerReference(String.format("scripts.%s.%s.(%s)", SAML2_SP_ADAPTER.name(),
                        script.getId(), script.getName()))
                .withScriptName(script.getName())
                .build()
                .convert(script.getEvaluatorVersion());
        executor.evaluateVoidScriptFunction(scriptEvaluator, script, realm, bindings, "preSingleSignOnRequest");
    }

    @Override
    public void preSingleSignOnProcess(String hostedEntityId, String realm, HttpServletRequest request,
            HttpServletResponse response, AuthnRequest authnRequest,
            Response ssoResponse, String profile) throws SAML2Exception {
        Script script = executor.getScriptConfiguration(realm, hostedEntityId, SP_ROLE, SP_ADAPTER_SCRIPT);
        Bindings bindings = SpBindings.preSingleSignOnProcess()
                .withAuthnRequest(authnRequest)
                .withSsoResponse(ssoResponse)
                .withProfile(profile)
                .withHostedEntityId(hostedEntityId)
                .withRealm(realm)
                .withHttpClient(httpClient)
                .withRequest(request)
                .withResponse(response)
                .withSpAdapterScriptHelper(spAdapterScriptHelper)
                .withLoggerReference(String.format("scripts.%s.%s.(%s)", SAML2_SP_ADAPTER.name(),
                        script.getId(), script.getName()))
                .withScriptName(script.getName())
                .build()
                .convert(script.getEvaluatorVersion());
        executor.evaluateVoidScriptFunction(scriptEvaluator, script, realm, bindings, "preSingleSignOnProcess");
    }

    @Override
    public boolean postSingleSignOnSuccess(String hostedEntityId, String realm, HttpServletRequest request,
            HttpServletResponse response, PrintWriter out, Object session, AuthnRequest authnRequest,
            Response ssoResponse, String profile, boolean isFederation) throws SAML2Exception {
        Script script = executor.getScriptConfiguration(realm, hostedEntityId, SP_ROLE, SP_ADAPTER_SCRIPT);
        Bindings bindings = SpBindings.postSingleSignOnSuccess()
                .withAuthnRequest(authnRequest)
                .withProfile(profile)
                .withOut(out)
                .withSsoResponse(ssoResponse)
                .withSession(session)
                .withFederation(isFederation)
                .withHostedEntityId(hostedEntityId)
                .withRealm(realm)
                .withHttpClient(httpClient)
                .withRequest(request)
                .withResponse(response)
                .withSpAdapterScriptHelper(spAdapterScriptHelper)
                .withLoggerReference(String.format("scripts.%s.%s.(%s)", SAML2_SP_ADAPTER.name(),
                        script.getId(), script.getName()))
                .withScriptName(script.getName())
                .build()
                .convert(script.getEvaluatorVersion());
        return executor.evaluateScriptFunction(scriptEvaluator, script, realm, bindings, "postSingleSignOnSuccess");
    }

    @Override
    public boolean postSingleSignOnFailure(String hostedEntityId, String realm, HttpServletRequest request,
            HttpServletResponse response, AuthnRequest authnRequest, Response ssoResponse,
            String profile, int failureCode) {
        try {
            Script script = executor.getScriptConfiguration(realm, hostedEntityId, SP_ROLE, SP_ADAPTER_SCRIPT);
            Bindings bindings = SpBindings.postSingleSignOnFailure()
                    .withAuthnRequest(authnRequest)
                    .withProfile(profile)
                    .withSsoResponse(ssoResponse)
                    .withFailureCode(failureCode)
                    .withHostedEntityId(hostedEntityId)
                    .withRealm(realm)
                    .withHttpClient(httpClient)
                    .withRequest(request)
                    .withResponse(response)
                    .withSpAdapterScriptHelper(spAdapterScriptHelper)
                    .withLoggerReference(String.format("scripts.%s.%s.(%s)", SAML2_SP_ADAPTER.name(),
                            script.getId(), script.getName()))
                    .withScriptName(script.getName())
                    .build()
                    .convert(script.getEvaluatorVersion());
            return executor.evaluateScriptFunction(scriptEvaluator, script, realm, bindings, "postSingleSignOnFailure");
        } catch (SAML2Exception e) {
            return false;
        }
    }

    @Override
    public void postNewNameIDSuccess(String hostedEntityId, String realm, HttpServletRequest request,
            HttpServletResponse response, String userId, ManageNameIDRequest idRequest, ManageNameIDResponse idResponse,
            String binding) {
        try {
            Script script = executor.getScriptConfiguration(realm, hostedEntityId, SP_ROLE, SP_ADAPTER_SCRIPT);
            Bindings bindings = SpBindings.userIdRequestBindings()
                    .withUserId(userId)
                    .withIdRequest(idRequest)
                    .withIdResponse(idResponse)
                    .withBinding(binding)
                    .withHostedEntityId(hostedEntityId)
                    .withRealm(realm)
                    .withHttpClient(httpClient)
                    .withRequest(request)
                    .withResponse(response)
                    .withSpAdapterScriptHelper(spAdapterScriptHelper)
                    .withLoggerReference(String.format("scripts.%s.%s.(%s)", SAML2_SP_ADAPTER.name(),
                            script.getId(), script.getName()))
                    .withScriptName(script.getName())
                    .build()
                    .convert(script.getEvaluatorVersion());
            executor.evaluateVoidScriptFunction(scriptEvaluator, script, realm, bindings, "postNewNameIDSuccess");
        } catch (SAML2Exception e) {
            logger.error("Exception in SP Adapter's postNewNameIDSuccess", e);
        }
    }

    @Override
    public void postTerminateNameIDSuccess(String hostedEntityId, String realm, HttpServletRequest request,
            HttpServletResponse response, String userId, ManageNameIDRequest idRequest,
            ManageNameIDResponse idResponse, String binding) {
        try {
            Script script = executor.getScriptConfiguration(realm, hostedEntityId, SP_ROLE, SP_ADAPTER_SCRIPT);
            Bindings bindings = SpBindings.userIdRequestBindings()
                    .withUserId(userId)
                    .withIdRequest(idRequest)
                    .withIdResponse(idResponse)
                    .withBinding(binding)
                    .withHostedEntityId(hostedEntityId)
                    .withRealm(realm)
                    .withHttpClient(httpClient)
                    .withRequest(request)
                    .withResponse(response)
                    .withSpAdapterScriptHelper(spAdapterScriptHelper)
                    .withLoggerReference(String.format("scripts.%s.%s.(%s)", SAML2_SP_ADAPTER.name(),
                            script.getId(), script.getName()))
                    .withScriptName(script.getName())
                    .build()
                    .convert(script.getEvaluatorVersion());
            executor.evaluateVoidScriptFunction(scriptEvaluator, script, realm, bindings, "postTerminateNameIDSuccess");
        } catch (SAML2Exception e) {
            logger.error("Exception in SP Adapter's postTerminateNameIDSuccess", e);
        }
    }

    @Override
    public void preSingleLogoutProcess(String hostedEntityId, String realm, HttpServletRequest request,
            HttpServletResponse response, String userId, LogoutRequest logoutRequest,
            LogoutResponse logoutResponse, String binding) throws SAML2Exception {
        Script script = executor.getScriptConfiguration(realm, hostedEntityId, SP_ROLE, SP_ADAPTER_SCRIPT);
        Bindings bindings = SpBindings.loginLogoutBindings()
                .withUserId(userId)
                .withLogoutRequest(logoutRequest)
                .withLogoutResponse(logoutResponse)
                .withBinding(binding)
                .withHostedEntityId(hostedEntityId)
                .withRealm(realm)
                .withHttpClient(httpClient)
                .withRequest(request)
                .withResponse(response)
                .withSpAdapterScriptHelper(spAdapterScriptHelper)
                .withLoggerReference(String.format("scripts.%s.%s.(%s)", SAML2_SP_ADAPTER.name(),
                        script.getId(), script.getName()))
                .withScriptName(script.getName())
                .build()
                .convert(script.getEvaluatorVersion());
        executor.evaluateVoidScriptFunction(scriptEvaluator, script, realm, bindings, "preSingleLogoutProcess");
    }

    @Override
    public void postSingleLogoutSuccess(String hostedEntityId, String realm, HttpServletRequest request,
            HttpServletResponse response, String userId, LogoutRequest logoutRequest,
            LogoutResponse logoutResponse, String binding) {
        try {
            Script script = executor.getScriptConfiguration(realm, hostedEntityId, SP_ROLE, SP_ADAPTER_SCRIPT);
            Bindings bindings = SpBindings.loginLogoutBindings()
                    .withUserId(userId)
                    .withLogoutRequest(logoutRequest)
                    .withLogoutResponse(logoutResponse)
                    .withBinding(binding)
                    .withHostedEntityId(hostedEntityId)
                    .withRealm(realm)
                    .withHttpClient(httpClient)
                    .withRequest(request)
                    .withResponse(response)
                    .withSpAdapterScriptHelper(spAdapterScriptHelper)
                    .withLoggerReference(String.format("scripts.%s.%s.(%s)", SAML2_SP_ADAPTER.name(),
                            script.getId(), script.getName()))
                    .withScriptName(script.getName())
                    .build()
                    .convert(script.getEvaluatorVersion());
            executor.evaluateVoidScriptFunction(scriptEvaluator, script, realm, bindings, "postSingleLogoutSuccess");
        } catch (SAML2Exception e) {
            logger.error("Exception in SP Adapter's postSingleLogoutSuccess", e);
        }
    }
}
