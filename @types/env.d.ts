declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY: string;
    CF_ACCOUNT_ID: string;
    CF_ZONE_ID: string;
    CF_PAGES_PROJECT_ID: string;
    CF_AUTH_KEY: string;
    CF_AUTH_EMAIL: string;
    CF_TURNSTILE_SECRET_KEY: string;
    STRIPE_SECRET_KEY: string;
    NEXT_PUBLIC_STRIPE_PUSHABLE_KEY: string;
  }
}
