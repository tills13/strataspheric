"use client";

import { useRef } from "react";

import { upsertFileAction } from "../../app/@app/dashboard/files/actions";
import { File } from "../../data";
import { useCan } from "../../hooks/useCan";
import { Header } from "../Header";
import { SaveIcon } from "../Icon/SaveIcon";
import { Input } from "../Input";
import { RadioButton } from "../RadioButton";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";
import { TextArea } from "../TextArea";

interface Props {
  acceptFileTypes?: string[];
  onCreateOrUpdateFile?: (file: File) => void;
  file?: File;
}

export function CreateOrUpdateFileForm({
  acceptFileTypes,
  file,
  onCreateOrUpdateFile,
}: Props) {
  const nameRef = useRef<HTMLInputElement>(null!);
  const can = useCan();

  return (
    <form
      action={async (fd) => {
        const result = await upsertFileAction(file?.id, fd);
        onCreateOrUpdateFile?.(result);
      }}
    >
      <Stack>
        {!file && (
          <Input
            accept={acceptFileTypes?.join(",")}
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

        {can("stratas.files.create") && (
          <Stack gap="small">
            <Text as="label" color="secondary" fontWeight="bold">
              Visibility
            </Text>
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
