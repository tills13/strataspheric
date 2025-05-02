"use client";

import { s } from "../../sprinkles.css";

import React, { useTransition } from "react";

import { Button } from "../Button";
import { Group } from "../Group";
import { InfoPanel } from "../InfoPanel";
import { Modal } from "../Modal";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";

interface Props {
  closeModal: () => void;
  description?: React.ReactNode;
  title?: React.ReactNode;
  onClickConfirm: () => void;
}

export function ConfirmModal({
  closeModal,
  description = "Are you sure? This action cannot be reversed.",
  onClickConfirm,
  title = "Confirm Action",
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <Modal closeModal={closeModal} title={title}>
      <InfoPanel className={s({ mb: "normal" })} level="warning">
        <Text>{description}</Text>
      </InfoPanel>

      <Group gap="normal">
        <Button
          onClick={(e) => {
            e.preventDefault();
            closeModal();
          }}
          style="secondary"
          type="button"
        >
          Cancel
        </Button>
        <StatusButton
          onClick={(e) => {
            e.preventDefault();

            startTransition(async () => {
              await onClickConfirm();
              closeModal();
            });
          }}
          color="error"
          style="secondary"
          type="button"
          isPending={isPending}
        >
          Confirm
        </StatusButton>
      </Group>
    </Modal>
  );
}
