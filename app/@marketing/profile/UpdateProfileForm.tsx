"use client";

import { s } from "../../../sprinkles.css";

import { Session } from "next-auth";
import { useFormState } from "react-dom";

import { Header } from "../../../components/Header";
import { SaveIcon } from "../../../components/Icon/SaveIcon";
import { Input } from "../../../components/Input";
import { InputField } from "../../../components/InputField";
import { StatusButton } from "../../../components/StatusButton";
import { classnames } from "../../../utils/classnames";
import { updateUserActionReducer } from "./actions";

interface Props {
  user: Session["user"];
}

export function UpdateProfileForm({ user }: Props) {
  const [state, dispatch] = useFormState(updateUserActionReducer, {
    success: undefined,
  });

  return (
    <form action={dispatch}>
      <Header className={s({ mb: "large" })} priority={2}>
        Update Profile
      </Header>

      <div className={s({ mb: "large" })}>
        <Header className={s({ mb: "normal" })} priority={3}>
          Name
        </Header>

        <Input
          className={s({ w: "full" })}
          placeholder="Full name"
          name="name"
          defaultValue={user.name || ""}
        />
      </div>

      <div className={s({ mb: "large" })}>
        <Header className={s({ mb: "normal" })} priority={3}>
          Password
        </Header>
        <InputField
          wrapperClassName={classnames(s({ mb: "small", w: "full" }))}
          placeholder="Current Password"
          name="currentPassword"
          type="password"
        />

        <InputField
          wrapperClassName={classnames(s({ mb: "small", w: "full" }))}
          placeholder="Password"
          name="password"
          type="password"
        />
        <InputField
          wrapperClassName={classnames(s({ mb: "small", w: "full" }))}
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
        />
      </div>

      <StatusButton
        color="success"
        iconRight={<SaveIcon />}
        style="secondary"
        success={state.success}
      >
        Update
      </StatusButton>
    </form>
  );
}
