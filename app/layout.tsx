import "./globalStyles.css";
import * as styles from "./style.css";
import { fontPrimary } from "./theme.css";
import { variable } from "./theme";

import { auth } from "../auth";
import { GlobalHeader } from "../components/GlobalHeader";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { getCurrentStrata } from "../data/stratas/getStrata";
import { sourceSansPro } from "./fonts";

const fontPrimaryVariable = variable(fontPrimary);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                :root {
                    ${fontPrimaryVariable}: ${sourceSansPro.style.fontFamily}, sans-serif;
                }
            `,
          }}
        />
      </head>
      <body>
        <div className={styles.body}>
          <SessionProvider session={session}>
            <GlobalHeader session={session} strata={strata} />
            <div>{children}</div>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
