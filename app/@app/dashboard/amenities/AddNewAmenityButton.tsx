"use client";

import { useState } from "react";

import { Button } from "../../../../components/Button";
import { CreateOrUpdateAmenityForm } from "../../../../components/CreateOrUpdateAmenityForm";
import { AddIcon } from "../../../../components/Icon/AddIcon";
import { Modal } from "../../../../components/Modal";

export function AddNewAmenityButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        icon={<AddIcon />}
        color="primary"
        onClick={() => setShowModal(true)}
        style="tertiary"
        size="small"
      />
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="New Amenity">
          <CreateOrUpdateAmenityForm />
        </Modal>
      )}
    </>
  );
}
