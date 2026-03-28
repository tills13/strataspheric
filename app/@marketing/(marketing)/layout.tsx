import { GlobalFooter } from "../../../components/GlobalFooter";
import { GlobalMarketingHeader } from "../../../components/GlobalMarketingHeader";
import { HeroBackground } from "./HeroBackground";

export default async function RootMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeroBackground />
      <GlobalMarketingHeader />
      {children}
      <GlobalFooter />
    </>
  );
}
