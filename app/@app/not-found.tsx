import { NotFound } from "../../components/NotFound";

export const runtime = "edge";

export default function Page() {
  return (
    <>
      <NotFound returnTo="/" />
    </>
  );
}
