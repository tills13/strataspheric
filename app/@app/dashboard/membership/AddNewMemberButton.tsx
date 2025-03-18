"use client";

import { useState } from "react";

import { Button } from "../../../../components/Button";
import { CreateOrUpdateStrataMembershipForm } from "../../../../components/CreateOrUpdateStrataMembershipForm";
import { AddIcon } from "../../../../components/Icon/AddIcon";
import { Modal } from "../../../../components/Modal";

interface Props {
  upsertStrataMembership: (fd: FormData) => Promise<void>;
}

export function AddNewMemmberButton({ upsertStrataMembership }: Props) {
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
        Add New Member
      </Button>

      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="New Strata Member">
          <CreateOrUpdateStrataMembershipForm
            upsertStrataMembership={upsertStrataMembership}
          />
        </Modal>
      )}
    </>
  );
}
