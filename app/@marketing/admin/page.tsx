import * as styles from "./style.css";

import { Grid } from "../../../components/Grid";
import { Money } from "../../../components/Money";
import { Stack } from "../../../components/Stack";
import { Text } from "../../../components/Text";
import { getAdminStats } from "../../../data/admin/getAdminStats";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <Stack p="normal" gap="normal">
      <Text as="h1" fontSize="large" fw="bold">
        Dashboard
      </Text>
      <Grid cols={{ base: 1, tablet: 3 }} gap="normal">
        <div className={styles.statCard}>
          <Stack gap="small">
            <div className={styles.statCardValue}>{stats.strataCount}</div>
            <div className={styles.statCardLabel}>Stratas</div>
          </Stack>
        </div>
        <div className={styles.statCard}>
          <Stack gap="small">
            <div className={styles.statCardValue}>{stats.userCount}</div>
            <div className={styles.statCardLabel}>Users</div>
          </Stack>
        </div>
        <div className={styles.statCard}>
          <Stack gap="small">
            <div className={styles.statCardValue}>
              <Money amount={stats.monthlyRevenue} fontSize="unset" />
            </div>
            <div className={styles.statCardLabel}>Monthly Revenue</div>
          </Stack>
        </div>
      </Grid>
    </Stack>
  );
}
