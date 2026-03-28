import * as styles from "./style.css";

interface Props {
  assumedUserName: string;
}

export function AssumeUserBar({ assumedUserName }: Props) {
  return (
    <div className={styles.assumeBar}>
      <span>You are currently assuming {assumedUserName}</span>
      <a className={styles.stopButton} href="/api/admin/stop-assuming">
        Stop Assuming
      </a>
    </div>
  );
}
