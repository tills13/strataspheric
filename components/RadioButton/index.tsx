"use client";

import * as styles from "./style.css";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { classnames } from "../../utils/classnames";
import { Text } from "../Text";

interface Props {
  className?: string;
  name: string;
  options: string[];
  defaultValue?: string;
}

export function RadioButton({ className, defaultValue, name, options }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(() =>
    defaultValue ? options.indexOf(defaultValue) : -1,
  );
  const [chipStyle, setChipStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const updateChipPosition = useCallback(() => {
    if (selectedIndex < 0 || !containerRef.current) return;

    const container = containerRef.current;
    const labels = container.querySelectorAll("label");
    const label = labels[selectedIndex];
    if (!label) return;

    const containerRect = container.getBoundingClientRect();
    const labelRect = label.getBoundingClientRect();

    setChipStyle({
      opacity: 1,
      left: labelRect.left - containerRect.left,
      width: labelRect.width,
      height: labelRect.height,
    });
  }, [selectedIndex]);

  useEffect(() => {
    updateChipPosition();
  }, [updateChipPosition]);

  useEffect(() => {
    const observer = new ResizeObserver(() => updateChipPosition());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateChipPosition]);

  return (
    <div
      ref={containerRef}
      className={classnames(className, styles.radioButton)}
    >
      <div className={styles.radioButtonChip} style={chipStyle} />
      {options.map((option, index) => {
        const syntheticName = `${name}_${option}`;
        return (
          <label
            key={option}
            className={classnames(
              styles.radioButtonButton,
              selectedIndex === index && styles.radioButtonButtonSelected,
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
              onChange={() => setSelectedIndex(index)}
            />
            <Text fontWeight="bold" color="unset">
              {option}
            </Text>
          </label>
        );
      })}
    </div>
  );
}
