"use client";

import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { FileSelect } from "../FileSelect";
import { Input } from "../Input";

interface Props {
  className?: string;
  baseName: string;
}

export function FileSelectOrUpload({ className, baseName: name }: Props) {
  return (
    <div className={classnames(styles.wrapper, className)}>
      <FileSelect className={styles.input} name={`existing_${name}`} />
      <Input
        className={styles.input}
        name={`new_${name}`}
        label="Upload a File"
        type="file"
      />
    </div>
  );
}
