// import "./globalStyles.css";
// import "./theme.css";

import { auth } from "../auth";
import { SignOutButton } from "../components/SignOutButton";
// import Link from "next/link";

export const runtime = "edge";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        {session && session.user && (
          <header>
            <div></div>
            <div>
              <>
                {session.user.name} <SignOutButton />
              </>
            </div>
          </header>
        )}
        {children}
      </body>
    </html>
  );
}
