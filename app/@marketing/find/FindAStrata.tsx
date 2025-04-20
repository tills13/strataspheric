import * as styles from "./style.css";

import { PageProps } from "../../../.next/types/app/@marketing/find/page";
import { Header } from "../../../components/Header";
import { RightIcon } from "../../../components/Icon/RightIcon";
import { InfoPanel } from "../../../components/InfoPanel";
import { ExternalLink } from "../../../components/Link/ExternalLink";
import { Text } from "../../../components/Text";
import { protocol } from "../../../constants";
import { listStratas } from "../../../data/stratas/listStratas";

export async function FindAStrata({
  searchParams,
}: {
  searchParams: Awaited<PageProps["searchParams"]>;
}) {
  let stratas: Awaited<ReturnType<typeof listStratas>> = [];
  const { address, name, strataPlan } = searchParams;

  if (address || name || strataPlan) {
    stratas = await listStratas({
      nameish: name,
      planish: strataPlan,
      address: address,
    });
  }

  return (
    <>
      {stratas.length === 0 && (
        <InfoPanel alignment="center">
          <Text>No stratas match search criteria.</Text>
        </InfoPanel>
      )}

      <ul className={styles.stratasList}>
        {stratas.map((strata) => (
          <li className={styles.stratasListItemContainer} key={strata.id}>
            <ExternalLink
              className={styles.stratasListItem}
              href={protocol + "//" + strata.domain + "/dashboard"}
              target="_blank"
            >
              <Header as="h3">
                {strata.name}
                {strata.strataId && ` - ${strata.strataId}`}

                <RightIcon className={styles.stratasListItemArrow} />
              </Header>
              <p>
                {strata.streetAddress} {strata.city}, {strata.provinceState}{" "}
                {strata.postalCode}
              </p>
            </ExternalLink>
          </li>
        ))}
      </ul>
    </>
  );
}
