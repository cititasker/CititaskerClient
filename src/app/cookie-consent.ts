// app/cookie-consent.ts
"use client";

import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export function initCookieConsent() {
  CookieConsent.run({
    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {
        enabled: false,
      },
    },

    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "We use cookies",
            description:
              "We use essential cookies to make this site work. With your consent, we also use analytics cookies to improve our services.",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject non-essential",
            showPreferencesBtn: "Manage preferences",
          },

          preferencesModal: {
            title: "Cookie preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject non-essential",
            savePreferencesBtn: "Save preferences",
            sections: [
              {
                title: "Necessary cookies",
                description:
                  "Required for authentication and core functionality.",
                linkedCategory: "necessary",
              },
              {
                title: "Analytics cookies",
                description:
                  "Help us understand how users interact with the app.",
                linkedCategory: "analytics",
              },
            ],
          },
        },
      },
    },

    guiOptions: {
      consentModal: {
        layout: "box",
        position: "bottom right",
      },
      preferencesModal: {
        layout: "box",
      },
    },
  });
}
