"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { Input } from "../Input";

interface BaseProps {
  className?: string;
  name: string;
  placeholder?: string;
  type: "single" | "range";
  defaultValue?: string | undefined;
}

interface SingleProps extends BaseProps {
  type: "single";
}

interface RangeProps extends BaseProps {
  type: "range";
  defaultStartValue?: string | number;
  startDate: number | Date;
  startPlaceholder?: string;
  defaultEndValue?: string | number;
  endDate: number | Date;
  endPlaceholder?: string;
}

type Props = SingleProps | RangeProps;

export function DateInput({
  className,
  defaultValue,
  name,
  placeholder,
  ...rest
}: Props) {
  if (rest.type === "single") {
    return (
      <div className={classnames(className, styles.dateInputWrapper)}>
        <Input
          className={s({ w: "full" })}
          name={name}
          type="datetime-local"
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
    );
  }

  return (
    <div className={classnames(className, styles.dateInputWrapper)}>
      <Input
        className={s({ w: "full" })}
        name={`${name}_start`}
        type="datetime-local"
        placeholder={rest.startPlaceholder || placeholder}
        defaultValue={rest.defaultStartValue || defaultValue}
      />
      <Input
        className={s({ w: "full" })}
        name={`${name}_end`}
        type="datetime-local"
        placeholder={rest.endPlaceholder || placeholder}
        defaultValue={rest.defaultEndValue || defaultValue}
      />
    </div>
  );
}
