import * as styles from "./style.css";

import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { InternalLink } from "../../../components/Link/InternalLink";
import { PricingCard } from "../../../components/PricingCard";
import { Slider } from "../../../components/Slider";
import { plans } from "../../../data/strataPlans/constants";
import { classnames } from "../../../utils/classnames";

export const runtime = "edge";

export default async function Page() {
  return (
    <div className={styles.landingWrapper}>
      <section className={classnames(styles.ctaSection)}>
        <Header className={styles.ctaHeader} priority={2}>
          Take your strata to
          <br />
          all new heights.
        </Header>
        <p className={styles.ctaText}></p>
        <InternalLink className={styles.ctaLink} href="/get-started?plan=basic">
          <Button className={styles.ctaButton}>Begin Onboarding</Button>
        </InternalLink>
      </section>

      <section
        className={classnames(
          styles.sectionPadded,
          styles.featuresSection,
          styles.marginBottom.large,
        )}
      >
        <Slider>
          <div className={styles.sideBySideFeature}>
            <div className={styles.sideBySideText}>
              <p>
                <b>Manage your files.</b> Stored securely and safely in the
                cloud. There when you, or anyone else in your strata, needs
                them.
              </p>
            </div>

            <img
              alt="files view for organization of strata documents"
              className={styles.sideBySideImage}
              src="/images/files.png"
            />
          </div>

          <div className={styles.sideBySideFeature}>
            <div className={styles.sideBySideText}>
              <p>
                <b>Find exactly what you need.</b> Powerful filtering tools to
                find the documents you are looking for.
              </p>
            </div>

            <img
              alt="files view for organization of strata documents"
              className={styles.sideBySideImage}
              src="/images/files.png"
            />
          </div>
        </Slider>
      </section>

      <section
        className={classnames(styles.sectionPadded, styles.plansSection)}
      >
        <Header className={styles.marginBottom.normal} priority={2}>
          Simple, month-by-month pricing
        </Header>

        <p
          className={classnames(
            styles.centerContent,
            styles.marginBottom.large,
          )}
        >
          Multi-year contracts only benefit the platform. Our plans are and will
          always be monthly giving you the freedom to try us out with little to
          no risk.
        </p>

        <div className={styles.plansContainer}>
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>
    </div>
  );
}
