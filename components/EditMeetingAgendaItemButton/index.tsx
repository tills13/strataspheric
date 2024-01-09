"use client";

import React, { useState } from "react";

import { MeetingAgendaItem } from "../../data/meetings/getMeetingAgendaItems";
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
  upsertFile: (fd: FormData) => any;
  updateMeetingAgendaItem: (fd: FormData) => void;
}

export function EditMeetingAgendaItemButton({
  className,
  buttonClassName,
  size,
  style,
  agendaItem,
  upsertFile,
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
            upsertFile={upsertFile}
            upsertMeetingAgendaItem={updateMeetingAgendaItem}
          />
        </Modal>
      )}
    </div>
  );
}
