/*
 * Copyright 2017 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */

package org.forgerock.openam.authentication.modules.social;

/**
 * Social Auth module for VKontakte.
 */
public class SocialAuthVK extends AbstractSocialAuthModule {

    /**
     * Constructs an instance of SocialAuthVK.
     */
    public SocialAuthVK() {
        super(map -> new SmsSocialAuthVKConfiguration(map));
    }
}