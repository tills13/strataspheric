import { Strata } from "../../data";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { InfoWidgetMapEmbed } from "./InfoWidgetMapEmbed";

interface Props {
  strata: Strata;
}

export function InfoWidgetContact({ strata }: Props) {
  return (
    <Stack>
      {strata.latitude && strata.longitude && (
        <InfoWidgetMapEmbed lat={strata.latitude} long={strata.longitude} />
      )}
      <Text as="address" color="secondary" fontSize="large">
        {strata.streetAddress}
        <br />
        {strata.city} {strata.provinceState}
        <br />
        {strata.postalCode}
      </Text>
    </Stack>
  );
}
