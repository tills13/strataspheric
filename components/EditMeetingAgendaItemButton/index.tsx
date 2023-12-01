"use client";

import { useState } from "react";

import { MeetingAgendaItem } from "../../data";
import { CreateOrUpdateMeetingAgendaItemForm } from "../CreateOrUpdateMeetingAgendaItemForm";
import { EditIcon } from "../Icon/EditIcon";
import { IconButton } from "../IconButton";
import { Modal } from "../Modal";

interface Props {
  agendaItem: MeetingAgendaItem;
  className?: string;
  buttonClassName?: string;
  updateMeetingAgendaItem: (fd: FormData) => void;
}

export function EditMeetingAgendaItemButton({
  className,
  buttonClassName,
  agendaItem,
  updateMeetingAgendaItem,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={className}>
      <IconButton
        className={buttonClassName}
        onClick={() => setShowModal(true)}
      >
        <EditIcon />
      </IconButton>
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="Edit Agenda Item">
          <CreateOrUpdateMeetingAgendaItemForm
            agendaItem={agendaItem}
            createOrUpdateMeetingAgendaItem={updateMeetingAgendaItem}
          />
        </Modal>
      )}
    </div>
  );
}
