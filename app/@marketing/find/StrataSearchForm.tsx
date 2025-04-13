"use client";

import { useRouter } from "next/navigation";

import { Input } from "../../../components/Input";
import { Stack } from "../../../components/Stack";
import { StatusButton } from "../../../components/StatusButton";
import * as formdata from "../../../utils/formdata";

interface Props {
  className?: string;
  name?: string;
  strataPlan?: string;
  address?: string;
}

export function StrataSearchForm({
  className,
  name,
  strataPlan,
  address,
}: Props) {
  const router = useRouter();

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const params = new URLSearchParams();

        if (formdata.getString(fd, "name")) {
          params.set("name", formdata.getString(fd, "name"));
        }

        if (formdata.getString(fd, "strataPlan")) {
          params.set("strataPlan", formdata.getString(fd, "strataPlan"));
        }

        if (formdata.getString(fd, "address")) {
          params.set("address", formdata.getString(fd, "address"));
        }

        const query = params.toString();

        router.push("/find" + (query ? "?" + query : ""));
      }}
    >
      <Stack>
        <Input label="Strata Name" name="name" defaultValue={name} />

        <Input
          label="Strata Plan ID"
          name="strataPlan"
          defaultValue={strataPlan}
        />

        <Input label="Address" name="address" defaultValue={address} />

        <StatusButton color="primary" type="submit">
          Find
        </StatusButton>
      </Stack>
    </form>
  );
}
