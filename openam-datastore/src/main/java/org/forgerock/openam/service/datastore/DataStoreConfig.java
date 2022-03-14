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
 * Copyright 2018-2021 ForgeRock AS.
 */

package org.forgerock.openam.service.datastore;

import java.util.Set;

import com.iplanet.am.util.SystemProperties;
import org.forgerock.openam.ldap.LDAPURL;
import org.forgerock.openam.ldap.LDAPUtils;
import org.forgerock.openam.services.datastore.DataStoreId;
import org.forgerock.openam.sm.ConnectionConfig;
import org.forgerock.openam.utils.CollectionUtils;
import org.forgerock.util.Reject;

import static com.sun.identity.shared.Constants.LDAP_SM_HEARTBEAT_INTERVAL;
import static org.forgerock.openam.utils.SchemaAttributeUtils.stripAttributeNameFromValue;

/**
 * A simple model object to represent a data store.
 *
 * @since 6.5.0
 */
public final class DataStoreConfig implements ConnectionConfig {

    private final DataStoreId id;
    private final Set<LDAPURL> serverUrls;
    private final String bindDN;
    private final char[] bindPassword;
    private final int minimumConnectionPool;
    private final int maximumConnectionPool;
    private final boolean useSsl;
    private final boolean useStartTLS;
    private final boolean affinityEnabled;

    private DataStoreConfig(Builder builder) {
        this.id = builder.id;
        this.serverUrls = builder.serverUrls;
        this.bindDN = builder.bindDN;
        this.bindPassword = builder.bindPassword;
        this.minimumConnectionPool = builder.minimumConnectionPool;
        this.maximumConnectionPool = builder.maximumConnectionPool;
        this.useSsl = builder.useSsl;
        this.useStartTLS = builder.useStartTLS;
        this.affinityEnabled = builder.affinityEnabled;
    }

    DataStoreId getId() {
        return id;
    }

    public Set<LDAPURL> getLDAPURLs() {
        return serverUrls;
    }

    public String getBindDN() {
        return bindDN;
    }

    public char[] getBindPassword() {
        return bindPassword;
    }

    public int getMinConnections() {
        return minimumConnectionPool;
    }

    public int getMaxConnections() {
        return maximumConnectionPool;
    }

    boolean isUseSsl() {
        return useSsl;
    }

    public boolean isStartTLSEnabled() {
        return useStartTLS;
    }

    public boolean isAffinityEnabled() {
        return affinityEnabled;
    }

    public int getLdapHeartbeat() {
        return SystemProperties.getAsInt(LDAP_SM_HEARTBEAT_INTERVAL, 10);
    }

    public static Builder builder(DataStoreId id) {
        return new Builder(id);
    }

    /**
     * Builder for building the Data Store Config
     */
    public static final class Builder {

        private final DataStoreId id;
        private String bindDN;
        private char[] bindPassword;
        private int minimumConnectionPool;
        private int maximumConnectionPool;
        private boolean useSsl;
        private boolean useStartTLS;
        private boolean affinityEnabled;
        private Set<LDAPURL> serverUrls;

        Builder(DataStoreId id) {
            this.id = id;
        }

        Builder withServerUrls(Set<String> serverUrls) {
            Reject.ifTrue(CollectionUtils.isEmpty(serverUrls));
            this.serverUrls = LDAPUtils.convertToLDAPURLs(stripAttributeNameFromValue(serverUrls));
            return this;
        }

        public Builder withLDAPURLs(Set<LDAPURL> ldapUrls) {
            Reject.ifTrue(CollectionUtils.isEmpty(ldapUrls));
            this.serverUrls = ldapUrls;
            return this;
        }

        public Builder withBindDN(String bindDN) {
            this.bindDN = bindDN;
            return this;
        }

        public Builder withBindPassword(char[] bindPassword) {
            this.bindPassword = bindPassword;
            return this;
        }

        public Builder withMinimumConnectionPool(int minimumConnectionPool) {
            Reject.ifTrue(minimumConnectionPool < 0);
            this.minimumConnectionPool = minimumConnectionPool;
            return this;
        }

        public Builder withMaximumConnectionPool(int maximumConnectionPool) {
            Reject.ifTrue(maximumConnectionPool < 0);
            this.maximumConnectionPool = maximumConnectionPool;
            return this;
        }

        public Builder withUseSsl(boolean useSsl) {
            this.useSsl = useSsl;
            return this;
        }

        public Builder withUseStartTLS(boolean useStartTLS) {
            this.useStartTLS = useStartTLS;
            return this;
        }

        public Builder withAffinityEnabled(boolean affinityEnabled) {
            this.affinityEnabled = affinityEnabled;
            return this;
        }

        public DataStoreConfig build() {
            Reject.ifTrue(minimumConnectionPool > maximumConnectionPool,
                    "Minimal pool size must be less or equal to the maximum pool size");
            return new DataStoreConfig(this);
        }
    }

}
