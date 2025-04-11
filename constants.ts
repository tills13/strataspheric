export const protocol =
  process.env.NODE_ENV === "development" ? "http:" : "https:";

export const tld =
  process.env.NODE_ENV === "development"
    ? "strataspheric.local:3000"
    : "strataspheric.app";

export const assetsOrigin =
  process.env.NODE_ENV === "development"
    ? "/api/dev/assets"
    : "https://assets.strataspheric.app";
