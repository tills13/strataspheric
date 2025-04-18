"use client";

import { useState } from "react";

import { Event, Meeting } from "../../data";
import { Button } from "../Button";
import { CreateOrUpdateMeetingForm } from "../CreateOrUpdateMeetingForm";
import { EditIcon } from "../Icon/EditIcon";
import { Modal } from "../Modal";

interface Props {
  className?: string;
  meeting: Meeting & Pick<Event, "startDate" | "endDate">;
}

export function EditMeetingButton({ className, meeting }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        className={className}
        icon={<EditIcon />}
        onClick={() => setShowModal(true)}
        color="primary"
        style="tertiary"
        size="small"
      />
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="Edit Meeting">
          <CreateOrUpdateMeetingForm meeting={meeting} />
        </Modal>
      )}
    </>
  );
}
