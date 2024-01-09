"use client";

import { useState } from "react";

import { Button } from "../../../../../../components/Button";
import { CreateOrUpdateMeetingAgendaItemForm } from "../../../../../../components/CreateOrUpdateMeetingAgendaItemForm";
import { AddIcon } from "../../../../../../components/Icon/AddIcon";
import { Modal } from "../../../../../../components/Modal";

interface Props {
  upsertFile: (fd: FormData) => any;
  upsertMeetingAgendaItem: (fd: FormData) => void;
}

export function AddNewMeetingAgendaItemButton({
  upsertFile,
  upsertMeetingAgendaItem,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        iconRight={<AddIcon />}
        color="primary"
        size="large"
        onClick={() => setShowModal(true)}
      >
        Add New Agenda Item
      </Button>

      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          title="Add New Agenda Item"
        >
          <CreateOrUpdateMeetingAgendaItemForm
            onCreateOrUpdateAgendaItem={() => setShowModal(false)}
            upsertFile={upsertFile}
            upsertMeetingAgendaItem={upsertMeetingAgendaItem}
          />
        </Modal>
      )}
    </>
  );
}
