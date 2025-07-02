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
        color="success"
        icon={<AddIcon />}
        onClick={() => setShowModal(true)}
        style="secondary"
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
