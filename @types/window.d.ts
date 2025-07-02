interface Window {
  Stripe: (pk: string) => import("@stripe/stripe-js").Stripe;
  turnstile: {
    render(
      element: string | Element,
      config: {
        sitekey: string;
        callback(token: string): void;
      },
    );
  };
}
