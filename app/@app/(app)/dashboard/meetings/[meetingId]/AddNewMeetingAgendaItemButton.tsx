"use client";

import { useState } from "react";

import { Button } from "../../../../../../components/Button";
import { CreateOrUpdateMeetingAgendaItemForm } from "../../../../../../components/CreateOrUpdateMeetingAgendaItemForm";
import { Modal } from "../../../../../../components/Modal";
import { classnames } from "../../../../../../utils/classnames";

interface Props {
  createMeetingAgendaItem: (fd: FormData) => void;
}

export function AddNewMeetingAgendaItemButton({
  createMeetingAgendaItem,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button color="primary" size="large" onClick={() => setShowModal(true)}>
        Add New Agenda Item
      </Button>
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          title="Add New Agenda Item"
        >
          <CreateOrUpdateMeetingAgendaItemForm
            createOrUpdateMeetingAgendaItem={createMeetingAgendaItem}
          />
        </Modal>
      )}
    </>
  );
}
