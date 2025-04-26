import { buttonSizes } from "../Button/style.css";
import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { Group } from "../Group";
import { RadioButtonButton } from "./RadioButtonButton";

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
