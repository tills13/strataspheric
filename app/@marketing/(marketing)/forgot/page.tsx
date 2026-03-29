import * as styles from "./style.css";

import { Input } from "../../../../components/Input";
import { Panel } from "../../../../components/Panel";
import { Stack } from "../../../../components/Stack";
import { StatusButton } from "../../../../components/StatusButton";
import { StaticPageContainer } from "../StaticPageContainer";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { resetPasswordAction } from "./actions";

export default async function Page({ searchParams }: PageProps<"/forgot">) {
  const { token } = await searchParams;

  if (token) {
    return (
      <StaticPageContainer centered>
        <Panel className={styles.forgotContainer} p="large">
          <form action={resetPasswordAction}>
            <input name="token" type="hidden" defaultValue={token} />
            <Stack>
              <Input placeholder="Password" name="password" type="password" />

              <Input
                placeholder="Confirm Password"
                name="confirm_password"
                type="password"
              />

              <StatusButton color="primary">Reset Password</StatusButton>
            </Stack>
          </form>
        </Panel>
      </StaticPageContainer>
    );
  }

  return (
    <StaticPageContainer centered>
      <Panel className={styles.forgotContainer} p="large">
        <ForgotPasswordForm />
      </Panel>
    </StaticPageContainer>
  );
}
