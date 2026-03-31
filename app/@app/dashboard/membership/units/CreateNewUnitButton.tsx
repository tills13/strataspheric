"use client";

import { useState } from "react";

import { Button } from "../../../../../components/Button";
import { CreateOrUpdateUnitForm } from "../../../../../components/CreateOrUpdateUnitForm";
import { AddIcon } from "../../../../../components/Icon/AddIcon";
import { Modal } from "../../../../../components/Modal";

interface Props {
  levyMode: "entitlement" | "custom";
}

export function CreateNewUnitButton({ levyMode }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        icon={<AddIcon />}
        color="primary"
        onClick={() => setShowModal(true)}
        size="small"
        style="tertiary"
      />
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="New Unit">
          <CreateOrUpdateUnitForm
            levyMode={levyMode}
            onCreateUnit={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
