"use client";

import { useRef, useState } from "react";

import { upsertFileAction } from "../../app/@app/dashboard/files/actions";
import { File } from "../../data";
import { useCan } from "../../hooks/useCan";
import { FileTypeIcon } from "../FileTypeIcon";
import { Header } from "../Header";
import { SaveIcon } from "../Icon/SaveIcon";
import { InfoPanel } from "../InfoPanel";
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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nameRef = useRef<HTMLInputElement>(null!);
  const [fileName, setFileName] = useState<string>();
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
            icon={
              <FileTypeIcon size="xs" filePath={fileName || "something.txt"} />
            }
            label="Upload File"
            name="file"
            type="file"
            onChange={(e) => {
              const name = e.target.files?.[0].name || "";
              nameRef.current.value = name;
              setFileName(name);
            }}
            required
          />
        )}
        <Header as="h3">Details</Header>
        <Input
          name="name"
          label="Name"
          placeholder="Filename"
          ref={nameRef}
          defaultValue={file?.name}
          required
        />
        <TextArea
          name="description"
          label="Description"
          placeholder="Description"
          rows={4}
          defaultValue={file?.description}
        />

        {can("stratas.files.create") && (
          <>
            <Header as="h3">Visibility</Header>
            <RadioButton
              name="is_public"
              options={["public", "private"]}
              defaultValue={file?.isPublic ? "public" : "private"}
            />
            <InfoPanel>
              <Text>
                Public files are visible to everyone in the strata. Private
                files are visible only to strata administrators and yourself.
              </Text>
            </InfoPanel>
          </>
        )}

        <StatusButton
          color="primary"
          icon={<SaveIcon />}
          style="primary"
          type="submit"
        >
          {file ? "Update File" : "Upload File"}
        </StatusButton>
      </Stack>
    </form>
  );
}
