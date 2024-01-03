"use client";

import React, { useState } from "react";

import { MeetingAgendaItem } from "../../data";
import { Button } from "../Button";
import { CreateOrUpdateMeetingAgendaItemForm } from "../CreateOrUpdateMeetingAgendaItemForm";
import { EditIcon } from "../Icon/EditIcon";
import { Modal } from "../Modal";

type ButtonProps = React.ComponentProps<typeof Button>;

interface Props {
  agendaItem: MeetingAgendaItem;
  className?: string;
  buttonClassName?: string;
  size?: ButtonProps["size"];
  style?: ButtonProps["style"];
  updateMeetingAgendaItem: (fd: FormData) => void;
}

export function EditMeetingAgendaItemButton({
  className,
  buttonClassName,
  size,
  style,
  agendaItem,
  updateMeetingAgendaItem,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={className}>
      <Button
        className={buttonClassName}
        icon={<EditIcon />}
        onClick={() => setShowModal(true)}
        size={size}
        style={style}
      />
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
