import * as styles from "./style.css";

import { Header } from "../../../../../components/Header";
import { JoinForm } from "../../../../../components/JoinForm";
import { JoinFromToken } from "./JoinFromToken";
import { joinAction } from "./actions";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  if (searchParams["token"]) {
    return <JoinFromToken token={searchParams["token"]} />;
  }

  return <JoinForm onSubmit={joinAction} />;
}
