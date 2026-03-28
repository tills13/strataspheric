import "./globalStyles.css";
import * as styles from "./style.css";
import { fontHeaderVar, fontPrimaryVar } from "./theme.css";

import { Metadata } from "next";
import { cookies } from "next/headers";

import { auth } from "../auth";
import { ADMIN_COOKIE_NAME } from "../auth/cookies";
import { AssumeUserBar } from "../components/AssumeUserBar";
import { FlexBox } from "../components/FlexBox";
import { NotFound } from "../components/NotFound";
import { SessionProvider } from "../components/SessionProvider";
import { protocol, tld } from "../constants";
import { getCurrentStrata } from "../data/stratas/getStrataByDomain";
import { variable } from "../theme";
import { ReactQueryQueryClientProvider } from "./ReactQueryQueryClientProvider";
import { bricolageGrotesque, plusJakartaSans } from "./fonts";

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
  const [session, strata, cookieStore] = await Promise.all([
    auth(),
    getCurrentStrata(),
    cookies(),
  ]);

  const isAssuming = cookieStore.has(ADMIN_COOKIE_NAME);
  const node = strata ? app : marketing;

  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                :root {
                    ${fontPrimaryVariable}: ${plusJakartaSans.style.fontFamily}, system-ui, sans-serif;
                    ${fontHeaderVariable}: ${bricolageGrotesque.style.fontFamily}, system-ui, sans-serif;
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
        <ReactQueryQueryClientProvider>
          <SessionProvider session={session}>
            {isAssuming && session && (
              <AssumeUserBar assumedUserName={session.user.name} />
            )}
            {node ? (
              <div className={styles.body}>{node}</div>
            ) : (
              <FlexBox
                align="center"
                className={styles.errorBody}
                justify="center"
              >
                <NotFound />
              </FlexBox>
            )}

            <div id="modal-root" />
          </SessionProvider>
        </ReactQueryQueryClientProvider>
      </body>
    </html>
  );
}
