import * as styles from "./style.css";

import { Header } from "../../../../../components/Header";
import { RightIcon } from "../../../../../components/Icon/RightIcon";
import { ExternalLink } from "../../../../../components/Link/ExternalLink";
import { protocol } from "../../../../../constants";
import { findStratas } from "../../../../../data/stratas/findStratas";
import { classnames } from "../../../../../utils/classnames";
import { StrataSearchForm } from "./StrataSearchForm";

export const runtime = "edge";

export default async function Page({ searchParams }) {
  const stratas = await findStratas({
    nameish: searchParams["name"],
    planish: searchParams["strataPlan"],
    address: searchParams["address"],
  });

  return (
    <div>
      <Header
        className={classnames(styles.header, styles.marginBottom.large)}
        priority={2}
      >
        Find a Strata
      </Header>

      <StrataSearchForm
        className={styles.marginBottom.large}
        name={searchParams["name"]}
        strataPlan={searchParams["strataPlan"]}
        address={searchParams["address"]}
      />

      {stratas !== undefined && (
        <>
          <Header
            className={classnames(styles.header, styles.marginBottom.large)}
            priority={2}
          >
            Stratas
          </Header>

          {stratas.length === 0 && <div>no stratas found</div>}

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
                    {strata.streetAddress} {strata.provinceState}{" "}
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
