"use client";

import { useState } from "react";

import { Button } from "../../../../components/Button";
import { CreateOrUpdateMeetingForm } from "../../../../components/CreateOrUpdateMeetingForm";
import { CalendarIcon } from "../../../../components/Icon/CalendarIcon";
import { Modal } from "../../../../components/Modal";

export function ScheduleMeetingButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        color="success"
        icon={<CalendarIcon />}
        onClick={() => setShowModal(true)}
        size="small"
        style="secondary"
      />
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="Create Meeting">
          <CreateOrUpdateMeetingForm />
        </Modal>
      )}
    </>
  );
}
