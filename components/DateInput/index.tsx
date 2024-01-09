"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useRef } from "react";

import { classnames } from "../../utils/classnames";
import { formatDateForDatetime } from "../../utils/datetime";
import { Button } from "../Button";
import { EventIcon } from "../Icon/EventIcon";
import { Input } from "../Input";

interface BaseProps {
  className?: string;
  name: string;
  placeholder?: string;
  type: "single" | "range";
  defaultValue?: string | number | undefined;
}

interface SingleProps extends BaseProps {
  type: "single";
}

interface RangeProps extends BaseProps {
  type: "range";
  defaultStartValue?: string | number;
  startDate: number | Date | undefined;
  startPlaceholder?: string;
  defaultEndValue?: string | number;
  endDate: number | Date | undefined;
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
  const startInputRef = useRef<HTMLInputElement>(null!);
  const endInputRef = useRef<HTMLInputElement | null>(null);

  if (rest.type === "single") {
    return (
      <div
        className={classnames(
          className,
          styles.dateInputWrapper,
          s({ w: "full" }),
        )}
      >
        <Input
          className={s({ w: "full" })}
          name={name}
          type="datetime-local"
          placeholder={placeholder}
          defaultValue={
            defaultValue ? formatDateForDatetime(defaultValue) : undefined
          }
        />
        <Button
          icon={<EventIcon />}
          onClick={() => {
            const d = new Date();
            startInputRef.current.value = formatDateForDatetime(d);

            if (endInputRef.current) {
              endInputRef.current.value = formatDateForDatetime(d);
            }
          }}
          style="tertiary"
          title="Today"
          type="button"
        />
      </div>
    );
  }

  return (
    <div
      className={classnames(
        className,
        styles.dateInputWrapper,
        s({ w: "full" }),
      )}
    >
      <Input
        ref={startInputRef}
        className={s({ w: "full" })}
        name={`${name}_start`}
        type="datetime-local"
        placeholder={rest.startPlaceholder || placeholder}
        defaultValue={
          rest.defaultStartValue
            ? formatDateForDatetime(rest.defaultStartValue)
            : defaultValue
              ? formatDateForDatetime(defaultValue)
              : undefined
        }
      />
      <Input
        ref={endInputRef}
        className={s({ w: "full" })}
        name={`${name}_end`}
        type="datetime-local"
        placeholder={rest.endPlaceholder || placeholder}
        defaultValue={
          rest.defaultEndValue
            ? formatDateForDatetime(rest.defaultEndValue)
            : defaultValue
              ? formatDateForDatetime(defaultValue)
              : undefined
        }
      />
      <Button
        icon={<EventIcon />}
        onClick={() => {
          const d = new Date();
          startInputRef.current.value = formatDateForDatetime(d);

          if (endInputRef.current) {
            endInputRef.current.value = formatDateForDatetime(d);
          }
        }}
        style="tertiary"
        title="Today"
        type="button"
      />
    </div>
  );
}
