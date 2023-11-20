const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();
const webpack = require("webpack");

/** @type {import('next').NextConfig} */
module.exports = withVanillaExtract({
  experimental: {
    serverActions: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (webpackConfig, { webpack }) => {
    webpackConfig.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "node:");
      })
    );

    return webpackConfig;
  },
});

if (process.env.NODE_ENV === "development") {
  console.log("[development] setting up D1 bindings");

  const {
    setupDevBindings,
  } = require("@cloudflare/next-on-pages/__experimental__next-dev");

  setupDevBindings({
    d1Databases: {
      DB: "b41b59b9-6d30-4e5d-8142-9cc76908b090",
    },
  });
}
