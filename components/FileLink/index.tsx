import React from "react";

import { assetsOrigin } from "../../constants";
import { ExternalLink } from "../Link/ExternalLink";

interface Props {
  className?: string;
  path: string;
}

export function FileLink({
  children,
  className,
  path,
}: React.PropsWithChildren<Props>) {
  if (path[0] !== "/") {
    path = "/" + path;
  }

  return (
    <ExternalLink
      className={className}
      target="_blank"
      href={assetsOrigin + path}
    >
      {children}
    </ExternalLink>
  );
}
