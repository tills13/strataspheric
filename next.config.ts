import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin({});

const nextConfig: NextConfig & { eslint?: { ignoreDuringBuilds?: boolean } } = {
  allowedDevOrigins: ["strataspheric.local", "sbstn.strataspheric.local"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// Initialize OpenNext Cloudflare for development
initOpenNextCloudflareForDev();

export default withVanillaExtract(nextConfig);
