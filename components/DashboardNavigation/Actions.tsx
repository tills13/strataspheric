import * as linkStyles from "../Link/style.css";
import * as styles from "./style.css";

import { Suspense } from "react";

import { auth } from "../../auth";
import { protocol, tld } from "../../constants";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { Group } from "../Group";
import { InternalLink } from "../Link/InternalLink";
import { SignOutLink } from "../SignOutLink";
import { Text } from "../Text";
import { HeaderJoinStrataButton } from "./HeaderJoinStrataButton";

interface Props {
  className?: string;
}

export async function GlobalHeaderActions({ className }: Props) {
  const session = await auth();

  return (
    <div className={className}>
      <Flex from="mobilePlus" align="center">
        <Suspense>
          <HeaderJoinStrataButton />
        </Suspense>

        {session ? (
          <Group gap="20" align="center">
            <Text color="fontTertiary" fontSize="normal">
              {session.user.email}
            </Text>
            {session.user.isAdmin && (
              <InternalLink href={`${protocol}//${tld}/admin`} noUnderline>
                <Text color="secondary" fontSize="normal" fontWeight="bold">
                  Admin
                </Text>
              </InternalLink>
            )}
            <SignOutLink />
          </Group>
        ) : (
          <InternalLink
            className={linkStyles.noUnderline}
            href="/?action=signin"
          >
            <Button
              className={classnames(styles.globalHeaderActionsButton)}
              color="primary"
              style="primary"
            >
              Sign In
            </Button>
          </InternalLink>
        )}
      </Flex>
    </div>
  );
}
