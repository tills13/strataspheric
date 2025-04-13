import { Header } from "../../../components/Header";
import { StaticPageContainer } from "../StaticPageContainer";

export const runtime = "edge";

export default function Page() {
  return (
    <StaticPageContainer>
      <Header as="h2">Terms</Header>
    </StaticPageContainer>
  );
}
