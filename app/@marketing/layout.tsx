import { GlobalMarketingHeader } from "../../components/GlobalMarketingHeader";

export default async function RootDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalMarketingHeader />
      <div>{children}</div>
    </>
  );
}
