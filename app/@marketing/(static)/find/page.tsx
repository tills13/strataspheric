import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { Header } from "../../../../components/Header";
import { RightIcon } from "../../../../components/Icon/RightIcon";
import { InfoPanel } from "../../../../components/InfoPanel";
import { ExternalLink } from "../../../../components/Link/ExternalLink";
import { protocol } from "../../../../constants";
import { Strata } from "../../../../data";
import { findStratas } from "../../../../data/stratas/findStratas";
import { classnames } from "../../../../utils/classnames";
import { StrataSearchForm } from "./StrataSearchForm";

export const runtime = "edge";

export default async function Page({ searchParams }) {
  let stratas: Strata[] | undefined = undefined;

  if (
    searchParams["name"] ||
    searchParams["strataPlan"] ||
    searchParams["address"]
  ) {
    stratas = await findStratas({
      nameish: searchParams["name"],
      planish: searchParams["strataPlan"],
      address: searchParams["address"],
    });
  }

  return (
    <div>
      <Header
        className={classnames(styles.header, s({ mb: "large" }))}
        priority={2}
      >
        Find a Strata
      </Header>

      <StrataSearchForm
        className={s({ mb: "large" })}
        name={searchParams["name"]}
        strataPlan={searchParams["strataPlan"]}
        address={searchParams["address"]}
      />

      {stratas && (
        <>
          <Header
            className={classnames(styles.header, s({ mb: "large" }))}
            priority={2}
          >
            Stratas
          </Header>

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
      )}
    </div>
  );
}
