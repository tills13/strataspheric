"use client";

import * as styles from "./style.css";

// import { useSession } from "../../hooks/useSession";
import { classnames } from "../../utils/classnames";
// import { Flex } from "../Flex";
import { FlexBox } from "../FlexBox";
import { Logo } from "../Logo";
import { Stack } from "../Stack";
import { Text } from "../Text";

export function NothingHere() {
  //   const session = useSession();

  return (
    <FlexBox align="center" justify="center">
      <Stack align="center">
        <div className={styles.nothingHereStack}>
          <Logo className={styles.nothingHereStackElement} h="xxl3" />
          <Text
            className={classnames(
              styles.nothingHereStackElement,
              styles.nothingHereQuestionMark,
            )}
            h="xxl3"
            w="xxl3"
          >
            ?
          </Text>
        </div>
        <Text fontSize="xl" fontFamily="secondaryHeader">
          Oops, there's nothing here.
        </Text>
      </Stack>
    </FlexBox>
  );
}
