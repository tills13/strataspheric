"use client";

import { AmenitiesBookerWeek } from "../../../../../components/AmenitiesBookerWeek";
import { Amenity } from "./page";

interface Props {
  amenity: Amenity;
}

export function BookAmenityForm({ amenity }: Props) {
  return (
    <div>
      <AmenitiesBookerWeek amentity={amenity} />
    </div>
  );
}
