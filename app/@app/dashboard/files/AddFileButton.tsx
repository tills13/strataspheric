"use client";

import { useState } from "react";

import { Button } from "../../../../components/Button";
import { CreateOrUpdateFileForm } from "../../../../components/CreateOrUpdateFileForm";
import { AddIcon } from "../../../../components/Icon/AddIcon";
import { Modal } from "../../../../components/Modal";

export function AddFileButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        color="primary"
        icon={<AddIcon />}
        onClick={() => setShowModal(true)}
        style="tertiary"
        size="small"
      />
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="New File">
          <CreateOrUpdateFileForm
            onCreateOrUpdateFile={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
