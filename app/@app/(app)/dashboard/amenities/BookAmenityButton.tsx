"use client";

import { useState } from "react";

import { Button } from "../../../../../components/Button";
import { Modal } from "../../../../../components/Modal";
import { BookAmenityForm } from "./BookAmenityForm";
import { Amenity } from "./page";

interface Props {
  amenity: Amenity;
  className?: string;
}

export function BookAmenityButton({ amenity, className }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        className={className}
        color="primary"
        onClick={() => setShowModal(true)}
        fullWidth={false}
      >
        Book {amenity.name}
      </Button>
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          title={`Book ${amenity.name}`}
        >
          <BookAmenityForm amenity={amenity} />
        </Modal>
      )}
    </>
  );
}
