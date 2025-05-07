import * as styles from "./style.css";

import { Button } from "../Button";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
import { InternalLink } from "../Link/InternalLink";

interface Props {
  className?: string;
}

export function NavigateBackButton({ className }: Props) {
  return (
    <InternalLink className={className} href=".">
      <Button
        icon={<ArrowForwardIcon className={styles.arrowIcon} />}
        size="small"
        color="primary"
        style="tertiary"
      />
    </InternalLink>
  );
}
