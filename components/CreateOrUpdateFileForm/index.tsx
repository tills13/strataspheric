"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useRef } from "react";

import { File } from "../../data";
import { classnames } from "../../utils/classnames";
import { Checkbox } from "../Checkbox";
import { Header } from "../Header";
import { UploadIcon } from "../Icon/UploadIcon";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";

interface Props {
  onCreateOrUpdateFile?: (file: File) => void;
  upsertFile: (fd: FormData) => Promise<File>;
  file?: File;
}

export function CreateOrUpdateFileForm({
  file,
  onCreateOrUpdateFile,
  upsertFile,
}: Props) {
  const nameRef = useRef<HTMLInputElement>(null!);

  return (
    <form
      action={async (fd) => {
        const file = await upsertFile(fd);
        onCreateOrUpdateFile?.(file);
      }}
    >
      <Input
        className={s({ w: "full", mb: "small" })}
        name="file"
        type="file"
        onChange={(e) => {
          nameRef.current.value = e.target.files?.[0].name || "";
        }}
      />
      <Input
        className={s({ w: "full", mb: "small" })}
        name="name"
        placeholder="Name"
        ref={nameRef}
        defaultValue={file?.name}
      />
      <Input
        className={s({ w: "full", mb: "small" })}
        name="description"
        placeholder="Description"
        defaultValue={file?.description}
      />

      <label
        className={classnames(s({ mb: "normal" }), styles.isPublicWrapper)}
        htmlFor="isPublic"
      >
        <Header priority={3}>File is public</Header>
        <Checkbox
          id="isPublic"
          name="isPublic"
          defaultChecked={!!file?.isPublic}
        />
      </label>
      <StatusButton
        color="primary"
        iconRight={<UploadIcon />}
        style="secondary"
        type="submit"
      >
        {file ? "Update File" : "Upload File"}
      </StatusButton>
    </form>
  );
}