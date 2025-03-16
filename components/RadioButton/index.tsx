"use client";

import { buttonSizes } from "../Button/style.css";
import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { Group } from "../Group";
import { Text } from "../Text";

interface RadioButtonButtonProps {
  className?: string;
  defaultValue?: string;
  name?: string;
  option: string;
  size?: Props["size"];
  value?: string;
}

export function RadioButtonButton({
  className,
  defaultValue,
  name,
  option,
  size = "normal",
  value,
}: RadioButtonButtonProps) {
  const syntheticName = `${name}_${option}`;
  return (
    <label
      className={classnames(
        className,
        styles.radioButtonButtonBase,
        buttonSizes[size],
      )}
      htmlFor={syntheticName}
    >
      <input
        className={styles.radioButtonHiddenRadioInput}
        type="radio"
        name={name}
        id={syntheticName}
        defaultChecked={option === defaultValue}
        value={option}
      />
      <Text weight="bold" color="primary">
        {option}
      </Text>
    </label>
  );
}

interface Props {
  className?: string;
  name: string;
  options: string[];
  size?: keyof typeof buttonSizes;
  defaultValue?: string;
  value?: string;
}

export function RadioButton({
  className,
  defaultValue,
  name,
  options,
  size,
  value,
}: Props) {
  return (
    <>
      <Group
        className={classnames(className, styles.radioButton)}
        gap="0"
        equalWidthChildren
      >
        {options.map((option) => (
          <RadioButtonButton
            key={option}
            defaultValue={defaultValue}
            name={name}
            option={option}
            size={size}
          />
        ))}
      </Group>
    </>
  );
}
