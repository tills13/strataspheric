const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

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
});

if (process.env.NODE_ENV === "development") {
  const {
    setupDevBindings,
  } = require("@cloudflare/next-on-pages/__experimental__next-dev");

  setupDevBindings({
    d1Databases: {
      DB: "d82795eb-def6-48d6-bfd1-e44f2505e943",
    },
  });
}
