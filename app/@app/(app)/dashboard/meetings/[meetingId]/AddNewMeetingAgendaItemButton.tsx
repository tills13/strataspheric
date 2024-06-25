"use client";

import { s } from "../../../../../../sprinkles.css";

import { useState } from "react";

import { Button } from "../../../../../../components/Button";
import { CreateOrUpdateMeetingAgendaItemForm } from "../../../../../../components/CreateOrUpdateMeetingAgendaItemForm";
import { DividerText } from "../../../../../../components/DividerText";
import { Header } from "../../../../../../components/Header";
import { AddIcon } from "../../../../../../components/Icon/AddIcon";
import { Modal } from "../../../../../../components/Modal";
import { NewMeetingAgendaItem } from "../../../../../../data";
import { StrataActivityTimelime } from "./StrataActivityTimelime";

interface Props {
  addItemToAgendaAction: (
    meetingId: string,
    item: NewMeetingAgendaItem,
  ) => void;
  meetingId: string;
  strataId: string;
  upsertFile: (fd: FormData) => any;
  upsertMeetingAgendaItem: (fd: FormData) => void;
}

export function AddNewMeetingAgendaItemButton({
  addItemToAgendaAction,
  meetingId,
  strataId,
  upsertFile,
  upsertMeetingAgendaItem,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showStrataTimelineSearchModal, setShowStrataTimelineSearchModal] =
    useState(false);

  return (
    <>
      <Button
        iconRight={<AddIcon />}
        color="primary"
        size="large"
        onClick={() => setShowModal(true)}
      >
        Add New Agenda Item
      </Button>

      {showStrataTimelineSearchModal && (
        <Modal closeModal={() => setShowStrataTimelineSearchModal(false)}>
          <StrataActivityTimelime
            addItemToAgendaAction={addItemToAgendaAction}
            meetingId={meetingId}
            strataId={strataId}
          />
        </Modal>
      )}

      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          title="Add New Agenda Item"
        >
          <Button onClick={() => setShowStrataTimelineSearchModal(true)}>
            Search Recent Strata Activity
          </Button>

          <DividerText className={s({ mv: "normal" })}>OR</DividerText>

          <Header className={s({ mb: "normal" })} priority={3}>
            Create New Agenda Item
          </Header>

          <CreateOrUpdateMeetingAgendaItemForm
            onCreateOrUpdateAgendaItem={() => setShowModal(false)}
            upsertFile={upsertFile}
            upsertMeetingAgendaItem={upsertMeetingAgendaItem}
          />
        </Modal>
      )}
    </>
  );
}
