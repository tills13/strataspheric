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
          <Header className={styles.ctaHeader} as="h2">
            Strata management,{" "}
            <span className={styles.ctaAccent}>elevated.</span>
          </Header>

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
          tabs={["Files", "Events", "Meetings", "Inbox", "Directory"]}
          tabsClassName={styles.tabLayoutTabs}
        >
          <Tab name="Files">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="12">
                  <Header as="h3">Manage your <span className={styles.featureAccent}>files</span>.</Header>
                  <Text color="secondary" fontSize="medium">
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
                <Stack gap="12">
                  <Header as="h3">Find <span className={styles.featureAccent}>exactly</span> what you need.</Header>
                  <Text color="secondary" fontSize="medium">
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
                <Stack gap="12">
                  <Header as="h3"><span className={styles.featureAccent}>Never</span> miss a date.</Header>
                  <Text color="secondary" fontSize="medium">
                    A shared calendar keeps your entire strata on the same page.
                    Upcoming AGMs, maintenance windows, and community events are
                    always visible at a glance.
                  </Text>
                </Stack>
              </div>

              <img
                alt="strata events calendar view"
                className={styles.sideBySideImage}
                src="/images/agenda.png"
              />
            </div>

            <div className={styles.sideBySideFeatureReversed}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="12">
                  <Header as="h3">Automatic reminders, <span className={styles.featureAccent}>zero effort</span>.</Header>
                  <Text color="secondary" fontSize="medium">
                    Set it and forget it. Strataspheric sends email reminders
                    before important dates so your community is always prepared.
                  </Text>
                </Stack>
              </div>

              <img
                alt="event notification settings"
                className={styles.sideBySideImage}
                src="/images/agenda_chat.png"
              />
            </div>
          </Tab>

          <Tab name="Meetings">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="12">
                  <Header as="h3">Run <span className={styles.featureAccent}>better</span> meetings.</Header>
                  <Text color="secondary" fontSize="medium">
                    Build agendas directly from strata activity. Pull in open
                    issues, upcoming invoices, and recent correspondence so
                    nothing falls through the cracks.
                  </Text>
                </Stack>
              </div>

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
          </Tab>

          <Tab name="Inbox">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="12">
                  <Header as="h3"><span className={styles.featureAccent}>One inbox</span> for everything.</Header>
                  <Text color="secondary" fontSize="medium">
                    Stop juggling shared email accounts. Council members can
                    receive, discuss, and respond to residents from a single
                    unified inbox with a full history of every conversation.
                  </Text>
                </Stack>
              </div>

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
          </Tab>

          <Tab name="Directory">
            <div className={styles.sideBySideFeature}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="12">
                  <Header as="h3">Know your <span className={styles.featureAccent}>community</span>.</Header>
                  <Text color="secondary" fontSize="medium">
                    A complete directory of owners, tenants, and council members.
                    Track unit assignments, roles, and monthly fees in one place.
                  </Text>
                </Stack>
              </div>

              <img
                alt="strata member directory"
                className={styles.sideBySideImage}
                src="/images/files.png"
              />
            </div>

            <div className={styles.sideBySideFeatureReversed}>
              <div className={styles.sideBySideTextContainer}>
                <Stack gap="12">
                  <Header as="h3">Manage access with <span className={styles.featureAccent}>confidence</span>.</Header>
                  <Text color="secondary" fontSize="medium">
                    Role-based permissions ensure the right people see the right
                    information. Owners, council, and property managers each get
                    a tailored experience.
                  </Text>
                </Stack>
              </div>

              <img
                alt="member profile and permissions"
                className={styles.sideBySideImage}
                src="/images/files_filtered.png"
              />
            </div>
          </Tab>
        </TabLayout>
      </section>

      <section className={styles.sectionDivider}>
        <Stack gap="normal" align="center">
          <Header as="h2">For <span className={styles.featureAccent}>Professionals</span></Header>
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
              <Button
                className={styles.ctaButton}
                color="primary"
                size="large"
              >
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

      <section
        className={classnames(styles.sectionDivider, s({ pb: "xxl" }))}
      >
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
