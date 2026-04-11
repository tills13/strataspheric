import { s } from "../../../sprinkles.css";
import * as styles from "./style.css";

import { Button } from "../../../components/Button";
import { Grid } from "../../../components/Grid";
import { Header } from "../../../components/Header";
import { InternalLink } from "../../../components/Link/InternalLink";
import { PricingCard } from "../../../components/PricingCard";
import { Stack } from "../../../components/Stack";
import { TabLayout } from "../../../components/TabLayout";
import { Tab } from "../../../components/TabLayout/Tab";
import { Text } from "../../../components/Text";
import { plans } from "../../../data/strataPlans/constants";
import { classnames } from "../../../utils/classnames";

export default async function Page() {
  return (
    <div className={styles.landingWrapper}>
      <section className={styles.ctaSection}>
        <Stack className={styles.ctaContent} gap="large" align="center">
          <h2 className={styles.ctaHeader}>
            Strata management,{" "}
            <span className={styles.ctaAccent}>elevated.</span>
          </h2>

          <Text
            as="p"
            className={styles.centerContent}
            color="secondary"
            fontSize="large"
          >
            Modern strata management that keeps owners informed, councils
            organized, and communities connected.
          </Text>

          <InternalLink
            className={styles.ctaLink}
            href="/get-started?plan=basic"
          >
            <Button className={styles.ctaButton} color="primary" size="large">
              Begin Onboarding
            </Button>
          </InternalLink>
        </Stack>
      </section>

      <section className={styles.featuresSection}>
        <TabLayout
          defaultTab="Files"
          tabs={[
            { name: "Files", label: "Documents", description: "Store & share" },
            { name: "Events", label: "Calendar", description: "Stay in sync" },
            {
              name: "Meetings",
              label: "Meetings",
              description: "Run agendas",
            },
            {
              name: "Inbox",
              label: "Inbox",
              description: "Unified threads",
            },
            {
              name: "Directory",
              label: "Directory",
              description: "Know your community",
            },
          ]}
          tabsClassName={styles.tabLayoutTabs}
        >
          <Tab name="Files">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="normal">
                  <span className={styles.featureLabel}>Documents</span>
                  <h3 className={styles.featureHeading}>
                    All your building documents,{" "}
                    <span className={styles.featureAccent}>one place</span>.
                  </h3>
                  <p className={styles.featureDescription}>
                    Bylaws, minutes, financial reports, inspection records.
                    Stored securely in the cloud and accessible to anyone in
                    your strata, anytime.
                  </p>
                </Stack>
              </div>

              <div className={styles.imageWrapper}>
                <img
                  alt="files view for organization of strata documents"
                  className={styles.sideBySideImage}
                  src="/images/files.png"
                />
              </div>
            </div>

            <div className={styles.sideBySideFeatureReversed}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="normal">
                  <span className={styles.featureLabel}>Search</span>
                  <h3 className={styles.featureHeading}>
                    Find{" "}
                    <span className={styles.featureAccent}>exactly</span> what
                    you need.
                  </h3>
                  <p className={styles.featureDescription}>
                    Filter by type, date, or keyword. No more digging through
                    email chains or shared drives to find that one PDF.
                  </p>
                </Stack>
              </div>

              <div className={styles.imageWrapper}>
                <div className={styles.sideBySideImageStack}>
                  <img
                    alt="search overlay for finding documents"
                    className={styles.sideBySideImage}
                    src="/images/search.png"
                  />
                  <img
                    alt="filtered file results"
                    className={styles.sideBySideImageStackRootImage}
                    src="/images/files_filtered.png"
                  />
                </div>
              </div>
            </div>
          </Tab>

          <Tab name="Events">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="normal">
                  <span className={styles.featureLabel}>Calendar</span>
                  <h3 className={styles.featureHeading}>
                    <span className={styles.featureAccent}>Never</span> miss
                    what matters.
                  </h3>
                  <p className={styles.featureDescription}>
                    A shared calendar keeps your entire strata aligned. AGMs,
                    maintenance windows, and community events are always visible
                    at a glance.
                  </p>
                </Stack>
              </div>

              <div className={styles.imageWrapper}>
                <img
                  alt="strata events calendar view"
                  className={styles.sideBySideImage}
                  src="/images/agenda.png"
                />
              </div>
            </div>

            <div className={styles.sideBySideFeatureReversed}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="normal">
                  <span className={styles.featureLabel}>Reminders</span>
                  <h3 className={styles.featureHeading}>
                    Automatic reminders,{" "}
                    <span className={styles.featureAccent}>zero effort</span>.
                  </h3>
                  <p className={styles.featureDescription}>
                    Set it and forget it. Email reminders go out before
                    important dates so your community is always prepared.
                  </p>
                </Stack>
              </div>

              <div className={styles.imageWrapper}>
                <img
                  alt="event notification settings"
                  className={styles.sideBySideImage}
                  src="/images/agenda_chat.png"
                />
              </div>
            </div>
          </Tab>

          <Tab name="Meetings">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="normal">
                  <span className={styles.featureLabel}>Agendas</span>
                  <h3 className={styles.featureHeading}>
                    Run{" "}
                    <span className={styles.featureAccent}>shorter</span>,
                    better meetings.
                  </h3>
                  <p className={styles.featureDescription}>
                    Build agendas directly from strata activity. Pull in open
                    issues, upcoming invoices, and recent correspondence so
                    nothing falls through the cracks.
                  </p>
                </Stack>
              </div>

              <div className={styles.imageWrapper}>
                <div className={styles.sideBySideImageStack}>
                  <img
                    alt="add item to meeting agenda"
                    className={styles.sideBySideImage}
                    src="/images/add_to_agenda.png"
                  />
                  <img
                    alt="meeting agenda overview"
                    className={styles.sideBySideImageStackRootImage}
                    src="/images/agenda.png"
                  />
                </div>
              </div>
            </div>
          </Tab>

          <Tab name="Inbox">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="normal">
                  <span className={styles.featureLabel}>Messaging</span>
                  <h3 className={styles.featureHeading}>
                    <span className={styles.featureAccent}>One inbox</span> for
                    everything.
                  </h3>
                  <p className={styles.featureDescription}>
                    Stop juggling shared email accounts. Council members can
                    receive, discuss, and respond to residents from a single
                    unified inbox with full conversation history.
                  </p>
                </Stack>
              </div>

              <div className={styles.imageWrapper}>
                <div className={styles.sideBySideImageStack}>
                  <img
                    alt="inbox thread conversation"
                    className={styles.sideBySideImage}
                    src="/images/inbox_chat.png"
                  />
                  <img
                    alt="inbox message list"
                    className={styles.sideBySideImageStackRootImage}
                    src="/images/inbox.png"
                  />
                </div>
              </div>
            </div>
          </Tab>

          <Tab name="Directory">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="normal">
                  <span className={styles.featureLabel}>People</span>
                  <h3 className={styles.featureHeading}>
                    Know your{" "}
                    <span className={styles.featureAccent}>community</span>.
                  </h3>
                  <p className={styles.featureDescription}>
                    A complete directory of owners, tenants, and council
                    members. Track unit assignments, roles, and monthly
                    contributions in one place.
                  </p>
                </Stack>
              </div>

              <div className={styles.imageWrapper}>
                <img
                  alt="strata member directory"
                  className={styles.sideBySideImage}
                  src="/images/files.png"
                />
              </div>
            </div>

            <div className={styles.sideBySideFeatureReversed}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="normal">
                  <span className={styles.featureLabel}>Permissions</span>
                  <h3 className={styles.featureHeading}>
                    Manage access with{" "}
                    <span className={styles.featureAccent}>confidence</span>.
                  </h3>
                  <p className={styles.featureDescription}>
                    Role-based permissions ensure the right people see the right
                    information. Owners, council, and property managers each get
                    a tailored experience.
                  </p>
                </Stack>
              </div>

              <div className={styles.imageWrapper}>
                <img
                  alt="member profile and permissions"
                  className={styles.sideBySideImage}
                  src="/images/files_filtered.png"
                />
              </div>
            </div>
          </Tab>
        </TabLayout>
      </section>

      <section className={styles.sectionDivider}>
        <Stack gap="normal" align="center">
          <Header as="h2">
            For <span className={styles.featureAccent}>Professionals</span>
          </Header>
          <Text
            as="p"
            className={styles.centerContent}
            color="secondary"
            fontSize="medium"
          >
            Supports Strata management through 3rd party services via a
            powerful, permissions-based usage model. Realtors can easily search
            for Stratas and request important documents through the portal.
          </Text>

          <Stack gap="small" align="center" mt="normal">
            <InternalLink href="/find">
              <Button className={styles.ctaButton} color="primary" size="large">
                Connect with a Strata
              </Button>
            </InternalLink>

            <InternalLink href="/join" noUnderline>
              <Button className={styles.ctaButton} style="tertiary">
                Join Strataspheric
              </Button>
            </InternalLink>
          </Stack>
        </Stack>
      </section>

      <section className={classnames(styles.sectionDivider, s({ pb: "xxl" }))}>
        <Stack gap="normal" align="center">
          <Header as="h2">Simple, month-by-month pricing</Header>
          <Text
            as="p"
            className={styles.centerContent}
            color="secondary"
            fontSize="medium"
          >
            Multi-year contracts only benefit the platform. Our plans are and
            will always be monthly giving you the freedom to try us out with
            little to no risk.
          </Text>
        </Stack>

        <div className={classnames(s({ mt: "40" }), styles.pricingGrid)}>
          <Grid cols={{ base: 1, desktop: 3 }}>
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </Grid>
        </div>
      </section>
    </div>
  );
}
