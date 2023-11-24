import React from "react";

import { ExternalLink } from "../Link/ExternalLink";

const domain =
  process.env.NODE_ENV === "development"
    ? ""
    : "https://assets.strataspheric.app";

interface Props {
  path: string;
}

export function FileLink({ children, path }: React.PropsWithChildren<Props>) {
  if (path[0] !== "/") {
    path = "/" + path;
  }

  return (
    <ExternalLink target="_blank" href={domain + path}>
      {children}
    </ExternalLink>
  );
}
