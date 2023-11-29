import "./globalStyles.css";
import * as styles from "./style.css";
import { fontHeaderVar, fontPrimaryVar } from "./theme.css";

import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import { auth } from "../auth";
import { GlobalFooter } from "../components/GlobalFooter";
import { protocol, tld } from "../constants";
import { getCurrentStrata } from "../data/stratas/getStrataByDomain";
import { getUserStratas } from "../data/users/getUserStratas";
import { variable } from "../theme";
import { laila, sourceSans } from "./fonts";

const fontPrimaryVariable = variable(fontPrimaryVar);
const fontHeaderVariable = variable(fontHeaderVar);

export const metadata: Metadata = {
  title: "Strataspheric - Strata Management",
  description: "Strata management that sparks joy",
  openGraph: {
    description: "Strata management that sparks joy",
  },
  twitter: {
    description: "Strata management that sparks joy",
  },
  metadataBase: new URL(protocol + "//" + tld),
};

export default async function RootLayout({
  app,
  marketing,
}: {
  app: React.ReactNode;
  marketing: React.ReactNode;
}) {
  let p0 = Date.now();
  const session = await auth();
  console.log("t1", Date.now() - p0, "ms");
  const strata = await getCurrentStrata();
  console.log("t2", Date.now() - p0, "ms");

  const sessionStratas = session?.user?.id
    ? await getUserStratas(session.user.id)
    : [];

  console.log("t3", Date.now() - p0, "ms");

  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                :root {
                    ${fontPrimaryVariable}: ${sourceSans.style.fontFamily}, sans-serif;
                    ${fontHeaderVariable}: ${laila.style.fontFamily};
                }
            `,
          }}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fff" />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#272b33" />
      </head>
      <body>
        <SessionProvider session={session}>
          <div className={styles.body}>{strata ? app : marketing}</div>
          <GlobalFooter sessionStratas={sessionStratas} />
        </SessionProvider>

        <div id="modal-root" />
      </body>
    </html>
  );
}
