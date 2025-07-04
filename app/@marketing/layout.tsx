import { GlobalFooter } from "../../components/GlobalFooter";
import { GlobalMarketingHeader } from "../../components/GlobalMarketingHeader";

export default async function RootMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalMarketingHeader />
      {children}
      <GlobalFooter />
    </>
  );
}
