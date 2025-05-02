import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { Text } from "../Text";

interface Props {
  className?: string;
  defaultValue?: string;
  name?: string;
  option: string;
}

export function RadioButtonButton({
  className,
  defaultValue,
  name,
  option,
}: React.PropsWithChildren<Props>) {
  const syntheticName = `${name}_${option}`;
  return (
    <label
      className={classnames(className, styles.radioButtonButton)}
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
      <Text fontWeight="bold" color="primary">
        {option}
      </Text>
    </label>
  );
}
