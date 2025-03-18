"use client";

import { useState } from "react";

import { Button } from "../../../../components/Button";
import { CreateOrUpdateFileForm } from "../../../../components/CreateOrUpdateFileForm";
import { AddIcon } from "../../../../components/Icon/AddIcon";
import { Modal } from "../../../../components/Modal";

interface Props {
  upsertFile: (fd: FormData) => any;
}

export function AddFileButton({ upsertFile }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        color="success"
        iconRight={<AddIcon />}
        iconTextBehaviour="centerRemainder"
        onClick={() => setShowModal(true)}
        style="secondary"
      >
        Add File
      </Button>
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="New File">
          <CreateOrUpdateFileForm
            onCreateOrUpdateFile={() => setShowModal(false)}
            upsertFile={upsertFile}
          />
        </Modal>
      )}
    </>
  );
}
