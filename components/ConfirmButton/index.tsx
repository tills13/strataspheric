"use client";

import { useState } from "react";

import { Button } from "../Button";
import { ConfirmModal } from "../ConfirmModal";
import { StatusButton } from "../StatusButton";

type StatusButtonProps = React.ComponentProps<typeof StatusButton>;
type ConfirmModalProps = React.ComponentProps<typeof ConfirmModal>;

interface Props
  extends Omit<StatusButtonProps, "isPending" | "onClick" | "type"> {
  confirmModalDescription?: ConfirmModalProps["description"];
  confirmModalTitle?: ConfirmModalProps["title"];
  onClickConfirm: () => void | Promise<void>;
}

export function ConfirmButton({
  children,
  confirmModalDescription,
  confirmModalTitle,
  onClickConfirm,
  ...delegateProps
}: Props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <>
      <Button
        {...delegateProps}
        onClick={(e) => {
          e.preventDefault();
          setShowConfirmModal(true);
        }}
        type="button"
      >
        {children}
      </Button>

      {showConfirmModal && (
        <ConfirmModal
          closeModal={() => setShowConfirmModal(false)}
          onClickConfirm={onClickConfirm}
          description={confirmModalDescription}
          title={confirmModalTitle}
        />
      )}
    </>
  );
}
