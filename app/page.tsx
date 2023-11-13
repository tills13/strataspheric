import * as styles from "./style.css";

import React from "react";
import { auth } from "../auth";
import { notFound, redirect } from "next/navigation";
import { SignInForm } from "../components/SignInForm";
import Link from "next/link";
import { Header } from "../components/Header";
import { JoinStrataForm } from "../components/JoinStrataForm";
import { requestToJoinStrataAction } from "./actions";
import { DividerText } from "../components/DividerText";
import { Button } from "../components/Button";
import { ElementGroup } from "../components/ElementGroup";
import { getCurrentStrata } from "../data/stratas/getStrata";
import { SignInToStrataPage } from "../components/SignInToStrataPage";
import { MarketingLandingPage } from "../components/MarketingLandingPage";

export const runtime = "edge";

export default async function Page({ searchParams }: any) {
  const session = await auth();
  const action = searchParams["action"];

  if (session) {
    redirect("/dashboard");
  }

  const strata = await getCurrentStrata();

  if (strata?.visibility === "public" && action === undefined) {
    redirect("/dashboard");
  }

  return strata ? (
    <SignInToStrataPage action={action} strata={strata} />
  ) : (
    <MarketingLandingPage />
  );
}
