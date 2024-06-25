import * as styles from "./style.css";

import { Header } from "../../../components/Header";
import { RightIcon } from "../../../components/Icon/RightIcon";
import { InfoPanel } from "../../../components/InfoPanel";
import { ExternalLink } from "../../../components/Link/ExternalLink";
import { protocol } from "../../../constants";
import { findStratas } from "../../../data/stratas/findStratas";

interface Props {
  searchParams: Record<string, string>;
}

export async function FindAStrata({ searchParams }: Props) {
  let stratas: Awaited<ReturnType<typeof findStratas>> = [];

  if (
    searchParams["address"] ||
    searchParams["name"] ||
    searchParams["strataPlan"]
  ) {
    stratas = await findStratas({
      nameish: searchParams["name"],
      planish: searchParams["strataPlan"],
      address: searchParams["address"],
    });
  }

  return (
    <>
      {stratas.length === 0 && (
        <InfoPanel alignment="center">
          No stratas match search criteria.
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
              <Header priority={3}>
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
