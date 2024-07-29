interface Window {
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
