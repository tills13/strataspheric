"use client";

import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { Session } from "next-auth";
import { useFormState } from "react-dom";

import { Header } from "../../../../../components/Header";
import { Input } from "../../../../../components/Input";
import { StatusButton } from "../../../../../components/StatusButton";
import { classnames } from "../../../../../utils/classnames";
import { updateUserActionReducer } from "./actions";

interface Props {
  user: Session["user"];
}

export function UpdateProfileForm({ user }: Props) {
  const [state, dispatch] = useFormState(updateUserActionReducer, {
    success: undefined,
  });

  return (
    <form onClick={dispatch}>
      <Header className={s({ mb: "large" })} priority={2}>
        Update Profile
      </Header>

      <div className={s({ mb: "large" })}>
        <Header className={s({ mb: "normal" })} priority={3}>
          Name
        </Header>
        <Input
          className={styles.input}
          placeholder="Full name"
          name="name"
          defaultValue={user.name || ""}
        />
      </div>

      <div className={s({ mb: "large" })}>
        <Header className={s({ mb: "normal" })} priority={3}>
          Password
        </Header>
        <Input
          className={classnames(styles.input, s({ mb: "small" }))}
          placeholder="Current Password"
          name="currentPassword"
        />

        <Input
          className={classnames(styles.input, s({ mb: "small" }))}
          placeholder="Password"
          name="password"
        />
        <Input
          className={classnames(styles.input, s({ mb: "small" }))}
          placeholder="Confirm Password"
          name="confirmPassword"
        />
      </div>

      <StatusButton color="primary" style="secondary" success={state.success}>
        Update
      </StatusButton>
    </form>
  );
}
