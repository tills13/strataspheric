// import * as styles from "./style.css";

import React from "react";
import { auth } from "../auth";
import { redirect } from "next/navigation";
// import { SignInForm } from "../components/SignInForm";
import { getStrata } from "../data/stratas";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  const strata = await getStrata();

  if (!strata) {
    return null;
  }

  return <div />;

  // return (
  //   <div className={styles.landingPageContainer}>
  //     <div className={styles.landingPageFormContainer}>
  //       <h1 className={styles.landingPageHeader}>Sign in to {strata.name}</h1>
  //       <SignInForm className={styles.loginForm} />
  //     </div>
  //   </div>
  // );
}
