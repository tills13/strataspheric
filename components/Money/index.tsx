import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Text } from "../Text";

const Dollars = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

interface Props extends React.ComponentProps<typeof Text> {
  amount: number;
  className?: string;
  unit?: string;
}

export function Money({ amount, className, unit = "$", ...rest }: Props) {
  return (
    <Text
      as="span"
      className={classnames(styles.money, className)}
      whiteSpace="nowrap"
      {...rest}
    >
      <Text as="span" color="secondary" fontSize="unset">
        {unit}
      </Text>
      <Text as="span" fontSize="unset" fw="bold">
        {Dollars.format(amount)}
      </Text>
    </Text>
  );
}
