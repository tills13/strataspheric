import * as linkStyles from "../Link/style.css";
import * as styles from "./style.css";

import { auth } from "../../auth";
import { classnames } from "../../utils/classnames";
import { GlobalHeader } from "../GlobalHeader";
import { Group } from "../Group";
import { InternalLink } from "../Link/InternalLink";
import { Logo } from "../Logo";
import { SignOutLink } from "../SignOutLink";
import { Text } from "../Text";

export async function GlobalMarketingHeader() {
  const session = await auth();

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

      <Group gap="24" className={styles.navLinks}>
        <InternalLink href="/pricing" noUnderline>
          <Text color="secondary" fontSize="normal">Pricing</Text>
        </InternalLink>
        <InternalLink href="/contact" noUnderline>
          <Text color="secondary" fontSize="normal">Contact</Text>
        </InternalLink>
        {session ? (
          <SignOutLink />
        ) : (
          <InternalLink href="/sign-in" noUnderline>
            <Text color="primary" fontSize="normal" fontWeight="bold">Sign In</Text>
          </InternalLink>
        )}
      </Group>
    </GlobalHeader>
  );
}
