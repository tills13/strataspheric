"use client";

import { useRef } from "react";

import { File } from "../../data";
import { p } from "../../data/users/permissions";
import { useCan } from "../../hooks/useCan";
import { Checkbox } from "../Checkbox";
import { Header } from "../Header";
import { SaveIcon } from "../Icon/SaveIcon";
import { Input } from "../Input";
import { RadioButton } from "../RadioButton";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

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
  const can = useCan();

  return (
    <form
      action={async (fd) => {
        const file = await upsertFile(fd);
        onCreateOrUpdateFile?.(file);
      }}
    >
      <Stack>
        {!file && (
          <Input
            label="Upload File"
            name="file"
            type="file"
            onChange={(e) => {
              nameRef.current.value = e.target.files?.[0].name || "";
            }}
          />
        )}
        <Input
          name="name"
          label="Name"
          ref={nameRef}
          defaultValue={file?.name}
        />
        <TextArea
          name="description"
          label="Description"
          rows={4}
          defaultValue={file?.description}
        />

        {can(p("stratas", "files", "create")) && (
          <Stack gap="small">
            <Header priority={3}>Visibility</Header>
            <RadioButton
              name="is_public"
              options={["public", "private"]}
              defaultValue={file?.isPublic ? "public" : "private"}
            />
          </Stack>
        )}

        <StatusButton
          color="primary"
          iconRight={<SaveIcon />}
          style="primary"
          type="submit"
        >
          {file ? "Update File" : "Upload File"}
        </StatusButton>
      </Stack>
    </form>
  );
}
