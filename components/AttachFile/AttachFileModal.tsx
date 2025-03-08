import { s } from "../../sprinkles.css";

import { File } from "../../data";
import { Button } from "../Button";
import { CreateOrUpdateFileForm } from "../CreateOrUpdateFileForm";
import { DividerText } from "../DividerText";
import { FileSelect } from "../FileSelect";
import { Group } from "../Group";
import { Header } from "../Header";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { RemoveIcon } from "../Icon/RemoveIcon";
import { Modal } from "../Modal";

interface Props {
  close: () => void;
  onSelectFile?: (file: File | undefined) => Promise<void>;
  selectedFile?: { id: string; name: string; path: string };
  upsertFile: (fd: FormData) => Promise<File>;
}

export function AttachFileModal({
  close,
  onSelectFile,
  selectedFile,
  upsertFile,
}: Props) {
  return (
    <Modal title="Attach File" closeModal={close}>
      <Group>
        <FileSelect
          className={s({ w: "full" })}
          defaultValue={selectedFile?.id}
          label="Attach existing file"
          onSelectFile={async (file) => {
            await onSelectFile?.(file);
            close();
          }}
          placeholder="Attach Existing File"
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

      <DividerText className={s({ mv: "large" })}>OR</DividerText>

      <Header className={s({ mb: "normal" })} priority={3}>
        Attach New File
      </Header>
      <CreateOrUpdateFileForm
        onCreateOrUpdateFile={(file) => {
          close();
          onSelectFile?.(file);
        }}
        upsertFile={upsertFile}
      />
    </Modal>
  );
}
