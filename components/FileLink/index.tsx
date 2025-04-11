import React from "react";

import { getImageUri } from "../../utils/files";
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
  return (
    <ExternalLink target="_blank" href={getImageUri(path)} {...delegateProps}>
      {children}
    </ExternalLink>
  );
}
