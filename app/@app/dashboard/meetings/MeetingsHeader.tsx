"use client";

import { useState } from "react";

import { CreateOrUpdateMeetingForm } from "../../../../components/CreateOrUpdateMeetingForm";
import { DashboardHeader } from "../../../../components/DashboardHeader";
import { AddIcon } from "../../../../components/Icon/AddIcon";
import { Modal } from "../../../../components/Modal";
import { p } from "../../../../data/users/permissions";
import { useCan } from "../../../../hooks/useCan";

interface Props {
  createMeeting: (fd: FormData) => void;
}

export function MeetingsHeader({ createMeeting }: Props) {
  const [showModal, setShowModal] = useState(false);
  const can = useCan();

  return (
    <>
      <DashboardHeader
        actions={[
          can(p("stratas", "meetings", "create")) && {
            action: () => setShowModal(true),
            label: "Plan a Meeting",
            icon: <AddIcon />,
          },
        ]}
      />
      {showModal && (
        <Modal closeModal={() => setShowModal(false)} title="Create Meeting">
          <CreateOrUpdateMeetingForm createOrUpdateMeeting={createMeeting} />
        </Modal>
      )}
    </>
  );
}
