import React from "react";

import { assetsOrigin } from "../../constants";
import { ExternalLink } from "../Link/ExternalLink";

type ExternalLinkProps = React.ComponentProps<typeof ExternalLink>;

interface Props extends ExternalLinkProps {
  path: string;
}

export function FileLink({
  children,
  path,
  ...delegateProps
}: React.PropsWithChildren<Props>) {
  if (path[0] !== "/") {
    path = "/" + path;
  }

  return (
    <ExternalLink target="_blank" href={assetsOrigin + path} {...delegateProps}>
      {children}
    </ExternalLink>
  );
}
