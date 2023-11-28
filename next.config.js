const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();
const webpack = require("webpack");

/** @type {import('next').NextConfig} */
module.exports = withVanillaExtract({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});

if (process.env.NODE_ENV === "development") {
  const {
    setupDevBindings,
  } = require("@cloudflare/next-on-pages/__experimental__next-dev");

  setupDevBindings({
    d1Databases: {
      DB: "b41b59b9-6d30-4e5d-8142-9cc76908b090",
    },
    r2Buckets: {
      R2: "strataspheric-development",
    },
  });
}
