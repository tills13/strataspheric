"use client";

import { useState } from "react";

import { Button } from "../../../../components/Button";
import { CreateOrUpdateStrataMembershipForm } from "../../../../components/CreateOrUpdateStrataMembershipForm";
import { CreateOrUpdateStrataMembershipFormFields } from "../../../../components/CreateOrUpdateStrataMembershipForm/CreateOrUpdateStrataMembershipFormFields";
import { AddIcon } from "../../../../components/Icon/AddIcon";
import { Modal } from "../../../../components/Modal";

export function AddNewMemberButton() {
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
        <Modal closeModal={() => setShowModal(false)} title="New Strata Member">
          <CreateOrUpdateStrataMembershipForm
            onUpsertMember={() => setShowModal(false)}
          >
            <CreateOrUpdateStrataMembershipFormFields />
          </CreateOrUpdateStrataMembershipForm>
        </Modal>
      )}
    </>
  );
}
