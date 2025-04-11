import { s } from "../../sprinkles.css";

import { FilesListFile } from "../../app/@app/dashboard/files/FilesListFile";
import { File } from "../../data";
import { Button } from "../Button";
import { CreateOrUpdateFileForm } from "../CreateOrUpdateFileForm";
import { DividerText } from "../DividerText";
import { FileSelect } from "../FileSelect";
import { Group } from "../Group";
import { RemoveIcon } from "../Icon/RemoveIcon";
import { Modal } from "../Modal";
import { Stack } from "../Stack";

interface Props {
  fileTypes?: string[];
  close: () => void;
  onSelectFile?: (file: File | undefined) => Promise<void>;
  selectedFile?: { id: string; name: string; path: string };
  upsertFile: (fd: FormData) => Promise<File>;
}

export function AttachFileModal({
  fileTypes,
  close,
  onSelectFile,
  selectedFile,
  upsertFile,
}: Props) {
  return (
    <Modal title="Attach File" closeModal={close}>
      <Stack>
        {selectedFile && <FilesListFile file={selectedFile} />}
        <Group>
          <FileSelect
            className={s({ w: "full" })}
            label="Attach Existing File"
            fileTypes={fileTypes}
            onSelectFile={async (file) => {
              await onSelectFile?.(file);
              close();
            }}
            placeholder="Attach Existing File"
            value={selectedFile?.id || ""}
          />
          {selectedFile && (
            <Button
              icon={<RemoveIcon />}
              onClick={() => {
                onSelectFile?.(undefined);
                close();
              }}
              size="small"
              style="tertiary"
            />
          )}
        </Group>

        <DividerText>OR</DividerText>

        <CreateOrUpdateFileForm
          acceptFileTypes={fileTypes}
          onCreateOrUpdateFile={(file) => {
            close();
            onSelectFile?.(file);
          }}
          upsertFile={upsertFile}
        />
      </Stack>
    </Modal>
  );
}
