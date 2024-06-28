const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin({});

/** @type {import('next').NextConfig} */
module.exports = withVanillaExtract({
  eslint: {
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    logging: "verbose",
  },
});

if (process.env.NODE_ENV === "development") {
  const { setupDevBindings } = require("@cloudflare/next-on-pages/next-dev");

  setupDevBindings({
    bindings: {
      DB: {
        type: "d1",
        databaseName: "b41b59b9-6d30-4e5d-8142-9cc76908b090",
      },
      R2: {
        type: "r2",
        bucketName: "strataspheric-development",
      },
    },
  });
}
