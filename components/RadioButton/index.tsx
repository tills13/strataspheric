import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { Group } from "../Group";
import { RadioButtonButton } from "./RadioButtonButton";

interface Props {
  className?: string;
  name: string;
  options: string[];
  defaultValue?: string;
}

export function RadioButton({ className, defaultValue, name, options }: Props) {
  return (
    <div>
      <Group
        className={classnames(className, styles.radioButton)}
        gap="xs"
        equalWidthChildren
      >
        {options.map((option) => (
          <RadioButtonButton
            key={option}
            defaultValue={defaultValue}
            name={name}
            option={option}
          />
        ))}
      </Group>
    </div>
  );
}
