"use client";

import { s } from "../../sprinkles.css";

import { useState, useTransition } from "react";

import { Button } from "../Button";
import { ElementGroup } from "../ElementGroup";
import { InfoPanel } from "../InfoPanel";
import { Modal } from "../Modal";
import { StatusButton } from "../StatusButton";

type StatusButtonProps = React.ComponentProps<typeof StatusButton>;

interface Props
  extends Omit<StatusButtonProps, "isPending" | "onClick" | "type"> {
  onClickConfirm: () => void | Promise<void>;
}

export function ConfirmButton({
  children,
  onClickConfirm,
  ...delegateProps
}: Props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <StatusButton
        {...delegateProps}
        onClick={(e) => {
          e.preventDefault();
          setShowConfirmModal(true);
        }}
        type="button"
        isPending={isPending}
      >
        {children}
      </StatusButton>

      {showConfirmModal && (
        <Modal
          closeModal={() => setShowConfirmModal(false)}
          title="Confirm Action"
        >
          <InfoPanel
            className={s({ mb: "normal" })}
            level="warning"
            alignment="center"
          >
            Are you sure? This action cannot be reversed.
          </InfoPanel>

          <ElementGroup gap="small">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setShowConfirmModal(false);
              }}
              style="tertiary"
              type="button"
            >
              Cancel
            </Button>
            <StatusButton
              onClick={(e) => {
                e.preventDefault();

                startTransition(async () => {
                  await onClickConfirm();
                  setShowConfirmModal(false);
                });
              }}
              color="error"
              style="secondary"
              type="button"
              isPending={isPending}
            >
              Confirm
            </StatusButton>
          </ElementGroup>
        </Modal>
      )}
    </>
  );
}
