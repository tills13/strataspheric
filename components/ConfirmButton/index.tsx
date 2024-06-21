"use client";

import { useState } from "react";

import { Button } from "../Button";
import { ConfirmModal } from "../ConfirmModal";
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
        />
      )}
    </>
  );
}
