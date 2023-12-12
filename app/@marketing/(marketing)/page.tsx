/* eslint-disable @next/next/no-img-element */
import {
  button,
  buttonSizes,
  buttonVariants,
  colors,
} from "../../../components/Button/style.css";
import * as styles from "./style.css";

import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { InternalLink } from "../../../components/Link/InternalLink";
import { PricingCard } from "../../../components/PricingCard";
import { Slider } from "../../../components/Slider";
import { TabLayout } from "../../../components/TabLayout";
import { Tab } from "../../../components/TabLayout/Tab";
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
          <Button
            className={classnames(
              button,
              buttonSizes.large,
              colors.primary,
              styles.ctaButton,
            )}
          >
            Begin Onboarding
          </Button>
        </InternalLink>
      </section>

      <section
        className={classnames(
          styles.sectionPadded,
          styles.featuresSection,
          styles.marginBottom.large,
        )}
      >
        <TabLayout
          defaultTab="Files"
          tabs={["Files", "Events", "Meetings", "Inbox", "Directory"]}
        >
          <Tab name="Files">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideText}>
                <p>
                  <b>Manage your files.</b>
                  <br />
                  Stored securely and safely in the cloud. There when you, or
                  anyone else in your strata, needs them.
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
                  <b>Find exactly what you need.</b>
                  <br />
                  Powerful filtering tools to find the documents you are looking
                  for.
                </p>
              </div>

              <div className={styles.sideBySideImageStack}>
                <img
                  alt="files view for organization of strata documents"
                  className={styles.sideBySideImage}
                  src="/images/search.png"
                />
                <img
                  alt="files view for organization of strata documents"
                  className={styles.sideBySideImageStackRootImage}
                  src="/images/files_filtered.png"
                />
              </div>
            </div>
          </Tab>

          <Tab name="Events">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideText}>
                <p>
                  <b>See the future.</b>
                  <br />
                  Easily share information about upcoming Strata events.
                  Automatically send email reminders before an important date.
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
                  <b>Amentity booking.</b>
                  <br />
                  Specify bookable amenities and allow members to automatically
                  book them with or without strata approval.
                </p>
              </div>

              <div className={styles.sideBySideImageStack}>
                <img
                  alt="files view for organization of strata documents"
                  className={styles.sideBySideImage}
                  src="/images/search.png"
                />
                <img
                  alt="files view for organization of strata documents"
                  className={styles.sideBySideImageStackRootImage}
                  src="/images/files_filtered.png"
                />
              </div>
            </div>
          </Tab>

          <Tab name="Meetings">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideText}>
                <p>
                  <b>Plan ahead.</b>
                  <br />
                  Plan meetings based on what&apos;s happening in your
                  strata&apos;s Strataspheric account.
                </p>
              </div>

              <div className={styles.sideBySideImageStack}>
                <img
                  alt="files view for organization of strata documents"
                  className={styles.sideBySideImage}
                  src="/images/add_to_agenda.png"
                />
                <img
                  alt="files view for organization of strata documents"
                  className={styles.sideBySideImageStackRootImage}
                  src="/images/agenda.png"
                />
              </div>
            </div>
          </Tab>

          <Tab name="Inbox">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideText}>
                <p>
                  <b>Stay connected.</b>
                  <br />
                  Receieve, discuss, and respond to strata members. Archive
                  messages to reference whenever you need to.
                </p>
              </div>

              <div className={styles.sideBySideImageStack}>
                <img
                  alt="files view for organization of strata documents"
                  className={styles.sideBySideImage}
                  src="/images/inbox_chat.png"
                />
                <img
                  alt="files view for organization of strata documents"
                  className={styles.sideBySideImageStackRootImage}
                  src="/images/inbox.png"
                />
              </div>
            </div>
          </Tab>
        </TabLayout>
      </section>

      <section
        className={classnames(
          styles.sectionPadded,
          styles.centerContent,
          styles.marginBottom.large,
        )}
      >
        <Header className={styles.marginBottom.normal} priority={2}>
          For Professionals
        </Header>
        <p className={styles.marginBottom.large}>
          Supports Strata management through 3rd party services via a powerful,
          permissions-based usage model. Realtors can easily search for Stratas
          and request important documents through the portal.
        </p>

        <InternalLink href="/find">
          <Button
            className={classnames(
              button,
              buttonSizes.large,
              colors.primary,
              styles.marginBottom.normal,
              styles.ctaButton,
            )}
          >
            Connect with a Strata
          </Button>
        </InternalLink>

        <InternalLink href="/join">
          <Button
            className={classnames(
              button,
              buttonSizes.normal,
              buttonVariants.tertiary,
              styles.ctaButton,
            )}
          >
            Join Strataspheric
          </Button>
        </InternalLink>
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
