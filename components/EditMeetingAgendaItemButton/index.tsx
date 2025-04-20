"use client";

import React, { useState } from "react";

import { MeetingAgendaItem } from "../../data/meetings/listMeetingAgendaItems";
import { Button } from "../Button";
import { CreateOrUpdateMeetingAgendaItemForm } from "../CreateOrUpdateMeetingAgendaItemForm";
import { EditIcon } from "../Icon/EditIcon";
import { Modal } from "../Modal";

type ButtonProps = React.ComponentProps<typeof Button>;

interface Props {
  agendaItem: MeetingAgendaItem;
  buttonClassName?: string;
  className?: string;
  meetingId: string;
  size?: ButtonProps["size"];
  style?: ButtonProps["style"];
}

export function EditMeetingAgendaItemButton({
  agendaItem,
  buttonClassName,
  className,
  meetingId,
  size,
  style,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={className}>
      <Button
        className={buttonClassName}
        color="primary"
        icon={<EditIcon />}
        onClick={() => setShowModal(true)}
        size={size}
        style={style}
      />
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="Edit Agenda Item">
          <CreateOrUpdateMeetingAgendaItemForm
            agendaItem={agendaItem}
            meetingId={meetingId}
          />
        </Modal>
      )}
    </div>
  );
}
