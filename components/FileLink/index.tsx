import React from "react";

import { assetsOrigin } from "../../constants";
import { ExternalLink } from "../Link/ExternalLink";

interface Props {
  path: string;
}

export function FileLink({ children, path }: React.PropsWithChildren<Props>) {
  if (path[0] !== "/") {
    path = "/" + path;
  }

  return (
    <ExternalLink target="_blank" href={assetsOrigin + path}>
      {children}
    </ExternalLink>
  );
}
