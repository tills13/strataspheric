import { protocol } from "../../constants";
import { Strata } from "../../data";
import { ExternalLink } from "../Link/ExternalLink";
import { Stack } from "../Stack";
import { StrataChip } from "../StrataChip";

interface Props {
  stratas: Strata[];
}

export function UserStrataSelector({ stratas }: Props) {
  return (
    <Stack>
      {stratas.map((strata) => (
        <ExternalLink
          key={strata.id}
          href={`${protocol}//${strata.domain}`}
          noUnderline
        >
          <StrataChip strata={strata} />
        </ExternalLink>
      ))}
    </Stack>
  );
}
