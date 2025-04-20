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
        iconRight={<CalendarIcon />}
        iconTextBehaviour="centerRemainder"
        onClick={() => setShowModal(true)}
        style="secondary"
      >
        Schedule Meeting
      </Button>
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="Create Meeting">
          <CreateOrUpdateMeetingForm />
        </Modal>
      )}
    </>
  );
}
