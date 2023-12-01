"use client";

import { useState } from "react";

import { Meeting } from "../../data";
import { CreateOrUpdateMeetingForm } from "../CreateOrUpdateMeetingForm";
import { EditIcon } from "../Icon/EditIcon";
import { IconButton } from "../IconButton";
import { Modal } from "../Modal";

interface Props {
  className?: string;
  meeting: Meeting;
  updateMeeting: (fd: FormData) => void;
}

export function EditMeetingButton({
  className,
  meeting,
  updateMeeting,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={className}>
      <IconButton onClick={() => setShowModal(true)}>
        <EditIcon />
      </IconButton>
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="Edit Meeting">
          <CreateOrUpdateMeetingForm
            createOrUpdateMeeting={updateMeeting}
            meeting={meeting}
          />
        </Modal>
      )}
    </div>
  );
}
