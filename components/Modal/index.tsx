"use client";

import * as styles from "./style.css";

import React, { useRef } from "react";
import ReactDOM from "react-dom";

import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { DisableScroll } from "../DisableScroll";
import { Group } from "../Group";
import { Header } from "../Header";
import { RemoveIcon } from "../Icon/RemoveIcon";

interface Props {
  children: React.ReactNode;
  className?: string;
  closeModal: () => void;
  modalBodyClassName?: string;
  title?: React.ReactNode;
}

export function Modal({
  children,
  className,
  closeModal,
  modalBodyClassName,
  title,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const node = document.querySelector("#modal-root");

  if (!node) {
    throw new Error("invalid portal selector");
  }

  return ReactDOM.createPortal(
    <div
      className={classnames(className, styles.modalWrapper)}
      onMouseDown={(e) => {
        if (e.target === wrapperRef.current) {
          closeModal();
        }
      }}
      ref={wrapperRef}
    >
      <DisableScroll />

      <div className={styles.modal}>
        <div className={styles.modalBodyContainer}>
          <Group
            className={styles.modalHeader}
            justify="space-between"
            pv="normal"
          >
            <div className={styles.modalHeaderTitleContainer}>
              {typeof title === "string" ? (
                <Header className={styles.modalHeaderTitle} as="h2">
                  {title}
                </Header>
              ) : (
                title
              )}
            </div>

            <Button
              icon={<RemoveIcon />}
              onClick={closeModal}
              style="tertiary"
            />
          </Group>
          <div
            className={classnames(
              modalBodyClassName,
              styles.modalBodyContainerInner,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>,
    node,
  );
}
