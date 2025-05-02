import { s } from "../../sprinkles.css";

import { FilesListFile } from "../../app/@app/dashboard/files/FilesListFile";
import { File } from "../../data";
import { CreateOrUpdateFileForm } from "../CreateOrUpdateFileForm";
import { FileSelect } from "../FileSelect";
import { Group } from "../Group";
import { Modal } from "../Modal";
import { Stack } from "../Stack";

interface Props {
  fileTypes?: string[];
  close: () => void;
  onSelectFile?: (file: File | undefined) => void;
  selectedFile?: { id: string; name: string; path: string };
  showImagePreview?: boolean;
}

export function AttachFileModal({
  fileTypes,
  close,
  onSelectFile,
  selectedFile,
  showImagePreview,
}: Props) {
  return (
    <Modal title="Attach File" closeModal={close}>
      <Stack>
        {selectedFile && (
          <FilesListFile
            mb="large"
            file={selectedFile}
            showActions={false}
            showImagePreview={showImagePreview}
          />
        )}
        <Group>
          <FileSelect
            className={s({ w: "full" })}
            label="Attach Existing File"
            fileTypes={fileTypes}
            onSelectFile={async (file) => {
              await onSelectFile?.(file);
              close();
            }}
            value={selectedFile?.id || ""}
          />
        </Group>

        <CreateOrUpdateFileForm
          acceptFileTypes={fileTypes}
          onCreateOrUpdateFile={(file) => {
            close();
            onSelectFile?.(file);
          }}
        />
      </Stack>
    </Modal>
  );
}
