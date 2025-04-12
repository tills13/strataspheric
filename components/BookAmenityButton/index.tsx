"use client";

import { useState } from "react";

import { Amenity } from "../../data/amenities/getAmenity";
import { BookAmenityForm } from "../BookAmenityForm";
import { Button } from "../Button";
import { Modal } from "../Modal";

interface Props {
  amenity: Amenity;
  className?: string;
  createAmenityBooking: (fd: FormData) => void;
}

export function BookAmenityButton({
  amenity,
  className,
  createAmenityBooking,
}: Props) {
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
          <BookAmenityForm
            amenity={amenity}
            createAmenityBooking={createAmenityBooking}
          />
        </Modal>
      )}
    </>
  );
}
