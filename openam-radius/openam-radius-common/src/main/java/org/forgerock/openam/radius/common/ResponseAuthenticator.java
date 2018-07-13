/**
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2007 Sun Microsystems Inc. All Rights Reserved
 *
 * The contents of this file are subject to the terms
 * of the Common Development and Distribution License
 * (the License). You may not use this file except in
 * compliance with the License.
 *
 * You can obtain a copy of the License at
 * https://opensso.dev.java.net/public/CDDLv1.0.html or
 * opensso/legal/CDDLv1.0.txt
 * See the License for the specific language governing
 * permission and limitations under the License.
 *
 * When distributing Covered Code, include this CDDL
 * Header Notice in each file and include the License file
 * at opensso/legal/CDDLv1.0.txt.
 * If applicable, add the following below the CDDL Header,
 * with the fields enclosed by brackets [] replaced by
 * your own identifying information:
 * "Portions Copyrighted [year] [name of copyright owner]"
 *
 * $Id: AccessAccept.java,v 1.2 2008/06/25 05:42:00 qcheng Exp $
 *
 */

/*
 * Portions Copyrighted 2011 ForgeRock AS
 * Portions Copyrighted 2015 Intellectual Reserve, Inc (IRI)
 */
package org.forgerock.openam.radius.common;


/**
 * Represents the response authenticator as defined in section 3 of RFC 2865. It is used to verify authenticity and
 * integrity of its containing packet relative to the request which generated the response.
 */
public class ResponseAuthenticator implements Authenticator {
    /**
     * The on-the-wire representation of this authenticator.
     */
    private byte[] octets = null;

    /**
     * Generates a response authenticator field from its on-the-wire bytes.
     *
     * @param octets the on-the-wire bytes.
     */
    public ResponseAuthenticator(byte[] octets) {
        this.octets = octets;
    }

    /**
     * Returns the contained on-the-wire bytes of the authenticator.
     *
     * @return the on-the-wire bytes.
     */
    @Override
    public byte[] getOctets() {
        return octets;
    }
}
