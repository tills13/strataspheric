"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import add from "date-fns/add";
import isBefore from "date-fns/isBefore";
import sub from "date-fns/sub";
import React, { useRef } from "react";

import { classnames } from "../../utils/classnames";
import { formatDateForDatetime } from "../../utils/datetime";
import { Button } from "../Button";
import { Group } from "../Group";
import { EventIcon } from "../Icon/EventIcon";
import { Input } from "../Input";

interface BaseProps {
  className?: string;
  disabled?: boolean;
  defaultValue?: string | number | undefined;
  name: string;
  placeholder?: string;
  type: "single" | "range";
}

interface SingleProps extends BaseProps {
  type: "single";
  label?: string;
}

interface RangeProps extends BaseProps {
  type: "range";
  defaultStartValue?: string | number;
  startPlaceholder?: string;
  startLabel?: string;
  defaultEndValue?: string | number;
  endLabel?: string;
  endPlaceholder?: string;
}

type Props = SingleProps | RangeProps;

export function DateInput({
  className,
  defaultValue,
  disabled,
  name,
  placeholder,
  ...rest
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const startInputRef = useRef<HTMLInputElement>(null!);
  const endInputRef = useRef<HTMLInputElement | null>(null);

  function onClickSetDateToTodayButton() {
    const d = new Date();
    startInputRef.current.value = formatDateForDatetime(d);

    if (endInputRef.current) {
      endInputRef.current.value = formatDateForDatetime(add(d, { hours: 1 }));
    }
  }

  function onChangeStart(e: React.ChangeEvent<HTMLInputElement>) {
    const currentDate = new Date(e.currentTarget.value);

    if (endInputRef.current) {
      endInputRef.current.value = formatDateForDatetime(
        add(currentDate, { hours: 1 }),
      );
    }
  }

  function onChangeEnd(e: React.ChangeEvent<HTMLInputElement>) {
    const currentDate = new Date(e.currentTarget.value);
    const currentStartDate = new Date(startInputRef.current.value);

    if (isBefore(currentDate, currentStartDate)) {
      startInputRef.current.value = formatDateForDatetime(
        sub(currentDate, { hours: 1 }),
      );
    }
  }

  if (rest.type === "single") {
    return (
      <Group className={classnames(className, s({ w: "full" }))}>
        <Input
          ref={startInputRef}
          className={s({ w: "full" })}
          disabled={disabled}
          name={name}
          type="datetime-local"
          label={rest.label || placeholder || "Start Date"}
          defaultValue={
            defaultValue ? formatDateForDatetime(defaultValue) : undefined
          }
        />
        <Button
          color="primary"
          disabled={disabled}
          icon={<EventIcon />}
          onClick={onClickSetDateToTodayButton}
          style="tertiary"
          title="Today"
          type="button"
        />
      </Group>
    );
  }

  return (
    <Group className={classnames(className)} align="start">
      <div className={styles.inputFieldsWrapper}>
        <Input
          className={s({ w: "full" })}
          ref={startInputRef}
          disabled={disabled}
          name={`${name}_start`}
          type="datetime-local"
          onChange={onChangeStart}
          label={
            rest.startLabel ||
            rest.startPlaceholder ||
            placeholder ||
            "Start Date"
          }
          defaultValue={
            rest.defaultStartValue
              ? formatDateForDatetime(rest.defaultStartValue)
              : defaultValue
                ? formatDateForDatetime(defaultValue)
                : undefined
          }
        />
        <Input
          className={s({ w: "full" })}
          ref={endInputRef}
          disabled={disabled}
          name={`${name}_end`}
          type="datetime-local"
          onChange={onChangeEnd}
          label={
            rest.endLabel || rest.endPlaceholder || placeholder || "End Date"
          }
          defaultValue={
            rest.defaultEndValue
              ? formatDateForDatetime(rest.defaultEndValue)
              : defaultValue
                ? formatDateForDatetime(defaultValue)
                : undefined
          }
        />
      </div>
      <Button
        disabled={disabled}
        icon={<EventIcon />}
        onClick={onClickSetDateToTodayButton}
        color="primary"
        style="tertiary"
        title="Today"
        type="button"
      />
    </Group>
  );
}
