import { Header } from "../../../../components/Header";

export const runtime = "edge";

export default function Page() {
  return (
    <div>
      <Header priority={2}>About</Header>
    </div>
  );
}
