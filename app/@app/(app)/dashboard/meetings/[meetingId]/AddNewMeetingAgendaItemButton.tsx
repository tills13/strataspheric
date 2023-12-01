"use client";

import * as buttonStyles from "../../../../../../components/Button/style.css";

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
      <Button
        className={classnames(
          buttonStyles.buttonFullWidth,
          buttonStyles.buttonSizes.large,
          buttonStyles.buttonVariants.primary,
        )}
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
            createOrUpdateMeetingAgendaItem={createMeetingAgendaItem}
          />
        </Modal>
      )}
    </>
  );
}
