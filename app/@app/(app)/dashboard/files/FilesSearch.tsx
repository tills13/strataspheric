"use client";

import * as buttonStyles from "../../../../../components/Button/style.css";
import * as styles from "./style.css";

import { useRouter } from "next/navigation";

import { Button } from "../../../../../components/Button";
import { ElementGroup } from "../../../../../components/ElementGroup";
import { Header } from "../../../../../components/Header";
import { RemoveIcon } from "../../../../../components/Icon/RemoveIcon";
import { IconButton } from "../../../../../components/IconButton";
import { Input } from "../../../../../components/Input";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { RemoveButton } from "../../../../../components/RemoveButton";
import { Select } from "../../../../../components/Select";
import { classnames } from "../../../../../utils/classnames";
import * as formdata from "../../../../../utils/formdata";

interface Props {
  searchTerm?: string;
  visibility?: "public" | "private";
}

export function FilesSearch({ searchTerm, visibility }: Props) {
  const router = useRouter();

  return (
    <div className={styles.fileSearchContainer}>
      <Header className={styles.marginBottom.small} priority={3}>
        Search
      </Header>
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

          const query = params.toString();

          router.push("/dashboard/files" + (query ? "?" + query : ""));
        }}
      >
        <Input
          className={styles.filesSearchInput}
          name="search"
          placeholder="Name or Description"
          defaultValue={searchTerm}
        />
        <Select name="visibility">
          <option value="">Visibility</option>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </Select>
        <ElementGroup gap="small">
          <Button
            className={styles.filesSearchSubmit}
            type="submit"
            defaultValue={visibility}
          >
            Search
          </Button>
          <InternalLink href="/dashboard/files">
            <IconButton>
              <RemoveIcon />
            </IconButton>
          </InternalLink>
        </ElementGroup>
      </form>
    </div>
  );
}
