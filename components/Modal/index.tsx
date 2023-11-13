"use client";

import * as styles from "./style.css";

import React from "react";
import ReactDOM from "react-dom";

interface Props {
  children: React.ReactNode;
}

export function Modal({ children }: Props) {
  return ReactDOM.createPortal(
    <div className={styles.modal}>{children}</div>,
    document.querySelector("#modal-root")!
  );
}
