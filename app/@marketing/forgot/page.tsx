import { PageProps } from "../../../.next/types/app/@marketing/forgot/page";
import { Input } from "../../../components/Input";
import { Panel } from "../../../components/Panel";
import { Stack } from "../../../components/Stack";
import { StatusButton } from "../../../components/StatusButton";
import { StaticPageContainer } from "../StaticPageContainer";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { resetPasswordAction } from "./actions";

export const runtime = "edge";

export default async function Page({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (token) {
    return (
      <StaticPageContainer centered>
        <Panel>
          <form action={resetPasswordAction}>
            <input name="token" type="hidden" defaultValue={token} />
            <Stack>
              <Input label="Password" name="password" type="password" />

              <Input
                label="Confirm Password"
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
      <Panel>
        <ForgotPasswordForm />
      </Panel>
    </StaticPageContainer>
  );
}
