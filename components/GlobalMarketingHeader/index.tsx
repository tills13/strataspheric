import * as linkStyles from "../Link/style.css";
import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { GlobalHeader } from "../GlobalHeader";
import { InternalLink } from "../Link/InternalLink";
import { Logo } from "../Logo";
import { Text } from "../Text";

export function GlobalMarketingHeader() {
  return (
    <GlobalHeader className={styles.globalHeader}>
      <InternalLink
        className={classnames(
          linkStyles.noUnderline,
          styles.globalHeaderTitleWrapper,
        )}
        href="/"
      >
        <Logo className={styles.logo} />
        <Text
          as="h1"
          className={styles.globalHeaderTitle}
          color="primary"
          fontSize="xl"
          fontWeight="xbold"
        >
          Strataspheric
        </Text>
      </InternalLink>
    </GlobalHeader>
  );
}
