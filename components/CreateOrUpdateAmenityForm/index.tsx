import { s } from "../../sprinkles.css";

import { Amenity } from "../../data/amenities/getAmenity";
import { AttachFileField } from "../AttachFileField";
import { ImageIcon } from "../Icon/ImageIcon";
import { SaveIcon } from "../Icon/SaveIcon";
import { Input } from "../Input";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

const IMAGE_FILE_TYPES = ["image/png", "image/jpeg"];

interface Props {
  amenity?: Amenity;
  upsertAmenity: (fd: FormData) => void;
  upsertFile: React.ComponentProps<typeof AttachFileField>["upsertFile"];
}

export function CreateOrUpdateAmenityForm({
  amenity,
  upsertAmenity,
  upsertFile,
}: Props) {
  return (
    <form action={upsertAmenity}>
      <AttachFileField
        className={s({ mb: "large" })}
        defaultIcon={<ImageIcon />}
        fileTypes={IMAGE_FILE_TYPES}
        name="imageFileId"
        placeholder="Preview Image"
        upsertFile={upsertFile}
        showImagePreview
      />
      <Stack className={s({ flex: 1 })}>
        <Input
          name="name"
          label="Name"
          placeholder="e.g. Guest Suite"
          defaultValue={amenity?.name}
        />

        <TextArea
          name="description"
          label="Description"
          placeholder="e.g. Sleeps four..."
          rows={4}
          defaultValue={amenity?.description}
        />
        <Input
          name="costPerHour"
          label="Cost per Hour ($)"
          defaultValue={amenity?.costPerHour ?? undefined}
          type="number"
        />

        <StatusButton
          color="primary"
          iconRight={<SaveIcon />}
          style="primary"
          type="submit"
        >
          {amenity ? "Update Amenity" : "Add Amenity"}
        </StatusButton>
      </Stack>
    </form>
  );
}
