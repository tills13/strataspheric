import * as styles from "./style.css";

import { Header } from "../Header";
import { Input } from "../Input";

export function JoinFormFields() {
  return (
    <>
      <Header className={styles.header2} priority={2}>
        Let&apos;s get to know you...
      </Header>

      <Input
        className={styles.input}
        id="name"
        name="name"
        placeholder="Name"
        required
      />

      <Input
        className={styles.input}
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
      />

      <Header className={styles.header3} priority={3}>
        A password to protect your account
      </Header>

      <Input
        className={styles.input}
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        required
      />

      <Input
        className={styles.input}
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
      />
    </>
  );
}
