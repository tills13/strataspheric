"use client";

import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { FlexBox } from "../FlexBox";
import { Logo } from "../Logo";
import { Stack } from "../Stack";
import { Text } from "../Text";

export function NothingHere({
  children = "Oops, there's nothing here.",
}: {
  children?: React.ReactNode;
}) {
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
          {children}
        </Text>
      </Stack>
    </FlexBox>
  );
}
