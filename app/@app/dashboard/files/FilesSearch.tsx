"use client";

import * as styles from "./style.css";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../../../../components/Button";
import { Group } from "../../../../components/Group";
import { RemoveIcon } from "../../../../components/Icon/RemoveIcon";
import { SearchIcon } from "../../../../components/Icon/SearchIcon";
import { Input } from "../../../../components/Input";
import { InternalLink } from "../../../../components/Link/InternalLink";
import { Select } from "../../../../components/Select";
import { Stack } from "../../../../components/Stack";
import { useCan } from "../../../../hooks/useCan";
import * as formdata from "../../../../utils/formdata";

interface Props {
  className?: string;
  searchTerm?: string;
  visibility?: "public" | "private";
}

export function FilesSearch({ className, searchTerm, visibility }: Props) {
  const router = useRouter();
  const can = useCan();
  const [selectedVisibility, setSelectedVisibility] = useState(visibility);

  return (
    <form
      className={className}
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

        const query = params.toString();

        router.push("/dashboard/files" + (query ? "?" + query : ""));
      }}
    >
      <Stack>
        <Input
          name="search"
          label="Name or Description"
          placeholder="e.g. 2024 AGM Minutes"
          defaultValue={searchTerm}
          required={false}
        />
        {can("stratas.files.create") && (
          <Select
            actionRight={
              selectedVisibility && (
                <Button
                  icon={<RemoveIcon />}
                  color="primary"
                  onClick={() => setSelectedVisibility(undefined)}
                  style="tertiary"
                  type="button"
                />
              )
            }
            name="visibility"
            onChange={(e) =>
              setSelectedVisibility(e.currentTarget.value as typeof visibility)
            }
            placeholder="Visibility"
            label="Visibility"
            value={selectedVisibility || ""}
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </Select>
        )}
        <Group>
          <Button
            type="submit"
            defaultValue={visibility}
            icon={<SearchIcon />}
            style="primary"
            color="primary"
            w="full"
          >
            Search
          </Button>
          {searchTerm && (
            <InternalLink
              className={styles.filesSearchClear}
              href="/dashboard/files"
            >
              <Button color="error" icon={<RemoveIcon />} style="tertiary" />
            </InternalLink>
          )}
        </Group>
      </Stack>
    </form>
  );
}
