"use client";

import * as styles from "./style.css";

import { useRouter } from "next/navigation";

import { Button } from "../../../../components/Button";
import { ElementGroup } from "../../../../components/ElementGroup";
import { RemoveIcon } from "../../../../components/Icon/RemoveIcon";
import { Input } from "../../../../components/Input";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { SelectField } from "../../../../components/SelectField";
import * as formdata from "../../../../utils/formdata";

interface Props {
  searchTerm?: string;
  visibility?: "public" | "private";
}

export function FilesSearch({ searchTerm, visibility }: Props) {
  const router = useRouter();

  return (
    <form
      className={styles.filesSearchForm}
      onSubmit={(e) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const params = new URLSearchParams();

        if (formdata.getString(fd, "search")) {
          params.set("search", formdata.getString(fd, "search"));
        }

        if (formdata.getString(fd, "visibility")) {
          params.set("visibility", formdata.getString(fd, "visibility"));
        }

        console.log("here", params.toString());

        const query = params.toString();

        router.push("/dashboard/files" + (query ? "?" + query : ""));
      }}
    >
      <Input
        name="search"
        label="Name or Description"
        placeholder="e.g. 2024 AGM Minutes"
        defaultValue={searchTerm}
        required={false}
      />
      <SelectField name="visibility" label="Visibility">
        <option value="private">Private</option>
        <option value="public">Public</option>
      </SelectField>
      <ElementGroup gap="small">
        <Button type="submit" defaultValue={visibility} fullWidth>
          Search
        </Button>
        <InternalLink
          className={styles.filesSearchClear}
          href="/dashboard/files"
        >
          <Button color="error" icon={<RemoveIcon />} style="secondary" />
        </InternalLink>
      </ElementGroup>
    </form>
  );
}
