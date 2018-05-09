/*
 *  Copyright 2018 ForgeRock AS. All Rights Reserved
 *
 *  Use of this code requires a commercial software license with ForgeRock AS.
 *  or with one of its affiliates. All use shall be exclusively subject
 *  to such license between the licensee and ForgeRock AS.
 */

package org.forgerock.openam.auth.nodes;

import static java.util.Collections.*;
import static org.assertj.core.api.Assertions.*;
import static org.forgerock.cuppa.Cuppa.*;
import static org.forgerock.cuppa.Cuppa.when;
import static org.forgerock.json.JsonValue.*;
import static org.forgerock.openam.auth.node.api.SharedStateConstants.*;
import static org.mockito.BDDMockito.*;

import java.security.KeyPairGenerator;
import java.security.cert.Certificate;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.crypto.KeyGenerator;
import javax.security.auth.callback.Callback;

import org.forgerock.cuppa.Test;
import org.forgerock.cuppa.junit.CuppaRunner;
import org.forgerock.json.JsonValue;
import org.forgerock.openam.auth.node.api.Action;
import org.forgerock.openam.auth.node.api.ExternalRequestContext.Builder;
import org.forgerock.openam.auth.node.api.NodeProcessException;
import org.forgerock.openam.auth.node.api.TreeContext;
import org.forgerock.openam.auth.nodes.oauth.SocialOAuth2Helper;
import org.forgerock.openam.core.realms.Realm;
import org.forgerock.openam.integration.idm.IdmIntegrationConfig;
import org.forgerock.openam.integration.idm.IdmIntegrationService;
import org.forgerock.openam.utils.AMKeyProvider;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.google.common.collect.ImmutableMap;
import com.sun.identity.authentication.spi.RedirectCallback;

@Test
@RunWith(CuppaRunner.class)
public class ProvisionIdmAccountNodeTest {

    private static final String IDM_URL = "http://idmservice:9999";
    private TreeContext treeContext;
    private List<Callback> callbacks;
    private ProvisionIdmAccountNode node;

    private final String user = "squirrel";
    private final String password = "hazelnuts";

    @Mock private SocialOAuth2Helper authModuleHelper;
    @Mock private ProvisionIdmAccountNode.Config config;
    @Mock private IdmIntegrationService idmIntegrationService;
    @Mock private AMKeyProvider amKeyProvider;
    @Mock private Certificate certificate;
    @Mock private Realm realm;

    private JsonValue initialSharedState;
    private JsonValue transientSharedState;

    Map<String, Set<String>> idmIntegrationConfigAttributes;

    {
        describe("Provision IDM Account Node", () -> {
            before(() -> {
                idmIntegrationConfigAttributes = ImmutableMap.<String, Set<String>>builder()
                        .put("enabled", Collections.singleton(Boolean.TRUE.toString()))
                        .put("idmDeploymentUrl", Collections.singleton(IDM_URL))
                        .put("provisioningSigningKeyAlias", Collections.singleton("test"))
                        .put("provisioningEncryptionKeyAlias", Collections.singleton("test"))
                        .put("provisioningSigningAlgorithm", Collections.singleton("HS256"))
                        .put("provisioningEncryptionAlgorithm", Collections.singleton("RSAES_PKCS1_V1_5"))
                        .put("provisioningEncryptionMethod", Collections.singleton("A128CBC_HS256"))
                        .build();
                MockitoAnnotations.initMocks(this);
                given(idmIntegrationService.getConfig("/"))
                        .willReturn(new IdmIntegrationConfig(idmIntegrationConfigAttributes));
                given(authModuleHelper.userExistsInTheDataStore(any(), any(), any()))
                        .willReturn(org.forgerock.guava.common.base.Optional.of(user));

                given(config.accountProviderClass())
                        .willReturn(
                                "org.forgerock.openam.authentication.modules.common.mapping.DefaultAccountProvider");
                given(realm.asPath())
                        .willReturn("/");
                given(amKeyProvider.getSecretKey(anyString()))
                        .willReturn(KeyGenerator.getInstance("AES").generateKey());
                given(amKeyProvider.getCertificate(anyString()))
                        .willReturn(certificate);
                given(certificate.getPublicKey())
                        .willReturn(KeyPairGenerator.getInstance("RSA").generateKeyPair().getPublic());

            });

            when("valid configuration is passed", () -> {
                beforeEach(() -> {
                    node = new ProvisionIdmAccountNode(config,
                            realm, authModuleHelper, idmIntegrationService, amKeyProvider);
                    initialSharedState = json(object(field("content", "initial")));
                    transientSharedState = json(object(field("content", "initial")));

                });
                it("returns a valid request", () -> {
                    TreeContext context = getContext(initialSharedState, transientSharedState, Collections.EMPTY_LIST);
                    Action result = node.process(context);
                    assertThat(result.callbacks).hasSize(1);
                    assertThat(result.callbacks.get(0)).isInstanceOf(RedirectCallback.class);
                    assertThat(((RedirectCallback) result.callbacks.get(0)).getRedirectUrl())
                            .startsWith(IDM_URL + "/#handleOAuth/&");
                });
            });

            when("resuming from a callout to IDM", () -> {
                beforeEach(() -> {
                    node = new ProvisionIdmAccountNode(config,
                            realm, authModuleHelper, idmIntegrationService, amKeyProvider);
                    initialSharedState = json(object(field("userInfo", getUserInfo()),
                            field(REALM, realm),
                            field(ProvisionIdmAccountNode.IDM_FLOW_INITIATED_KEY, true)));
                });
                it("goes to a successful outcome", () -> {
                    TreeContext context = getContext(initialSharedState, transientSharedState, Collections.EMPTY_LIST);
                    Action result = node.process(context);
                    assertThat(result.outcome).isEqualTo("outcome");
                    assertThat(result.sharedState.get(USERNAME).asString()).isEqualTo(user);
                });
            });

            when("an invalid account provider has been configured", () -> {
                beforeEach(() -> {
                    given(config.accountProviderClass())
                            .willReturn("org.forgerock.openam.auth.nodes.oauth.SocialOAuth2Helper");
                    node = new ProvisionIdmAccountNode(config,
                            realm, authModuleHelper, idmIntegrationService, amKeyProvider);
                    initialSharedState = json(object(field("userInfo", getUserInfo()),
                            field(REALM, realm),
                            field(ProvisionIdmAccountNode.IDM_FLOW_INITIATED_KEY, Boolean.TRUE)));
                });
                it("an exception is thrown", () -> {
                    TreeContext context = getContext(initialSharedState, transientSharedState, Collections.EMPTY_LIST);
                    assertThatThrownBy(() -> node.process(context)).isExactlyInstanceOf(NodeProcessException.class);
                });
            });
        });
    }

    private TreeContext getContext(JsonValue sharedState, JsonValue transientState, List<Callback> callbacks) {
        return new TreeContext(sharedState, transientState, new Builder().build(), callbacks);
    }

    private JsonValue getUserInfo() {
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("mail", singletonList("wood.mouse@forestschool.org"));
        Map<String, List<String>> userNames = new HashMap<>();
        userNames.put("iplanet-am-user-alias-list", singletonList("google-1234567890"));
        return json(object(
                field("attributes", attributes),
                field("userNames", userNames)
        ));
    }
}
