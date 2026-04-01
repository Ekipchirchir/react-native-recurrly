<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of the Recurly subscription tracker app with PostHog. The integration covers the full user lifecycle — sign-up, authentication, subscription management, and churn — using the `posthog-react-native` SDK with Expo. PostHog was already partially instrumented; this integration extended and completed the setup with environment variable support, additional business events, and a live analytics dashboard.

## Changes made

- **`app.config.js`** (new): Reads `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` from environment variables via `process.env`, replacing the hardcoded placeholder values in `app.json`. The `extra` section was removed from `app.json`.
- **`.env`**: Updated with the correct PostHog project token and host.
- **`app/(tabs)/index.tsx`**: Added `subscription_expanded` event when a user taps to expand a subscription card on the home screen.
- **`app/subscriptions/[id].tsx`**: Added `subscription_detail_viewed` event on mount when the subscription detail page loads.
- **`app/Onboarding.tsx`**: Added `onboarding_viewed` event on mount — top of the user conversion funnel.

## Event inventory

| Event | Description | File |
|---|---|---|
| `user_signed_up` | User successfully creates a new account | `app/(auth)/sign-up.tsx` |
| `user_sign_up_failed` | User sign-up attempt fails | `app/(auth)/sign-up.tsx` |
| `user_signed_in` | User successfully signs in | `app/(auth)/sign-in.tsx` |
| `user_sign_in_failed` | User sign-in attempt fails | `app/(auth)/sign-in.tsx` |
| `subscription_created` | User creates a new subscription | `components/CreateSubscriptionModal.tsx` |
| `user_signed_out` | User signs out from the app | `app/(tabs)/settings.tsx` |
| `subscription_expanded` | User expands a subscription card on the home screen | `app/(tabs)/index.tsx` |
| `subscription_detail_viewed` | User opens the full subscription detail page | `app/subscriptions/[id].tsx` |
| `onboarding_viewed` | User views the onboarding screen (funnel top) | `app/Onboarding.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/364167/dashboard/1419932
- **Sign-up to First Subscription Funnel**: https://us.posthog.com/project/364167/insights/QUHUdgwp
- **Daily Active Sign-ups & Sign-ins**: https://us.posthog.com/project/364167/insights/fiubXhZ7
- **Subscriptions Created by Category**: https://us.posthog.com/project/364167/insights/xW7NM0jK
- **Churn Signals: Sign-outs & Login Failures**: https://us.posthog.com/project/364167/insights/ZjbsQMcC
- **Total New Sign-ups**: https://us.posthog.com/project/364167/insights/TeBgqyXT

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
