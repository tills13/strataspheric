import "./globalStyles.css";
import * as styles from "./style.css";
import { fontHeaderVar, fontPrimaryVar } from "./theme.css";

import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

import { auth } from "../auth";
import { GlobalFooter } from "../components/GlobalFooter";
import { protocol, tld } from "../constants";
import { getCurrentStrata } from "../data/stratas/getStrataByDomain";
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
  const strata = await getCurrentStrata();

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
        <div className={styles.body}>{strata ? app : marketing}</div>

        <Suspense>
          <GlobalFooter />
        </Suspense>

        <div id="modal-root" />
      </body>
    </html>
  );
}
