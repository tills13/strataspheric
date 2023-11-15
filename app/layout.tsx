import "./globalStyles.css";
import * as styles from "./style.css";
import { fontHeader, fontPrimary } from "./theme.css";
import { variable } from "../theme";

import { laila, sourceSans } from "./fonts";
import { GlobalFooter } from "../components/GlobalFooter";
import { getCurrentStrata } from "../data/stratas/getStrata";

const fontPrimaryVariable = variable(fontPrimary);
const fontHeaderVariable = variable(fontHeader);

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
      </head>
      <body>
        <div className={styles.body}>
          {strata ? marketing : app}
          <GlobalFooter />
        </div>

        <div id="modal-root" />
      </body>
    </html>
  );
}
