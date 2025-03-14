/* eslint-disable @next/next/no-img-element */
import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { InternalLink } from "../../components/Link/InternalLink";
import { PricingCard } from "../../components/PricingCard";
import { Stack } from "../../components/Stack";
import { TabLayout } from "../../components/TabLayout";
import { Tab } from "../../components/TabLayout/Tab";
import { Text } from "../../components/Text";
import { plans } from "../../data/strataPlans/constants";
import { classnames } from "../../utils/classnames";

export const runtime = "edge";

export default async function Page() {
  return (
    <div className={styles.landingWrapper}>
      <section className={classnames(styles.ctaSection, s({ p: "normal" }))}>
        <Header
          className={classnames(styles.ctaHeader, s({ mb: "xl" }))}
          priority={2}
        >
          Take your strata to
          <br />
          all new heights 🚀.
        </Header>

        <InternalLink className={styles.ctaLink} href="/get-started?plan=basic">
          <Button className={styles.ctaButton} color="primary" size="large">
            Begin Onboarding
          </Button>
        </InternalLink>
      </section>

      <section
        className={classnames(styles.featuresSection, s({ mb: "large" }))}
      >
        <TabLayout
          defaultTab="Files"
          tabs={["Files", "Events", "Meetings", "Inbox", "Directory"]}
          tabsClassName={styles.tabLayoutTabs}
        >
          <Tab name="Files">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideTextContainer}>
                <Stack>
                  <Header priority={3}>Manage your files.</Header>
                  <Text>
                    Stored securely and safely in the cloud. There when you, or
                    anyone else in your strata, needs them.
                  </Text>
                </Stack>
              </div>

              <img
                alt="files view for organization of strata documents"
                className={styles.sideBySideImage}
                src="/images/files.png"
              />
            </div>

            <div className={styles.sideBySideFeatureReversed}>
              <div className={styles.sideBySideTextContainer}>
                <Stack>
                  <Header priority={3}>Find exactly what you need.</Header>
                  <Text>
                    Powerful filtering tools to find the documents you are
                    looking for.
                  </Text>
                </Stack>
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
              <div className={styles.sideBySideTextContainer}>
                <Stack>
                  <Header priority={3}>See the future.</Header>
                  <Text>
                    Easily share information about upcoming Strata events.
                    Automatically send email reminders before an important date.
                  </Text>
                </Stack>
              </div>

              <img
                alt="files view for organization of strata documents"
                className={styles.sideBySideImage}
                src="/images/files.png"
              />
            </div>

            <div className={styles.sideBySideFeatureReversed}>
              <div className={styles.sideBySideTextContainer}>
                <Stack>
                  <Header priority={3}>
                    Generate revenue from your shared amenities.
                  </Header>
                  <Text>
                    Specify bookable amenities and allow members to
                    automatically book them with or without strata approval.
                  </Text>
                </Stack>
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
              <div className={styles.sideBySideTextContainer}>
                <Stack>
                  <Header priority={3}>Plan ahead.</Header>
                  <Text>
                    Plan meetings based on what&apos;s happening in your
                    strata&apos;s Strataspheric account.
                  </Text>
                </Stack>
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
              <div className={styles.sideBySideTextContainer}>
                <Stack>
                  <Header priority={3}>Stay connected.</Header>
                  <Text>
                    Receieve, discuss, and respond to strata members. Archive
                    messages to reference whenever you need to.
                  </Text>
                </Stack>
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
          styles.centerContent,
          s({ mb: "large", p: "normal" }),
        )}
      >
        <Header className={s({ mb: "normal" })} priority={2}>
          For Professionals
        </Header>
        <p className={s({ mb: "large" })}>
          Supports Strata management through 3rd party services via a powerful,
          permissions-based usage model. Realtors can easily search for Stratas
          and request important documents through the portal.
        </p>

        <InternalLink href="/find">
          <Button
            className={classnames(s({ mb: "normal" }), styles.ctaButton)}
            color="primary"
            size="large"
          >
            Connect with a Strata
          </Button>
        </InternalLink>

        <InternalLink href="/join">
          <Button className={classnames(styles.ctaButton)} style="tertiary">
            Join Strataspheric
          </Button>
        </InternalLink>
      </section>

      <section className={classnames(s({ p: "normal" }), styles.plansSection)}>
        <Header className={s({ mb: "normal" })} priority={2}>
          Simple, month-by-month pricing
        </Header>

        <p className={classnames(styles.centerContent, s({ mb: "large" }))}>
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
