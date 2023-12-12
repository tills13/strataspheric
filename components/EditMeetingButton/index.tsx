"use client";

import { useState } from "react";

import { Event, Meeting } from "../../data";
import { CreateOrUpdateMeetingForm } from "../CreateOrUpdateMeetingForm";
import { EditIcon } from "../Icon/EditIcon";
import { IconButton } from "../IconButton";
import { Modal } from "../Modal";

interface Props {
  className?: string;
  meeting: Meeting & Pick<Event, "startDate" | "endDate">;
  updateMeeting: (fd: FormData) => void;
}

export function EditMeetingButton({
  className,
  meeting,
  updateMeeting,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IconButton className={className} onClick={() => setShowModal(true)}>
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
    </>
  );
}
