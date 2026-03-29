import { s } from "../../../../sprinkles.css";
import * as styles from "./style.css";

import { Header } from "../../../../components/Header";
import { Panel } from "../../../../components/Panel";
import { StaticPageContainer } from "../StaticPageContainer";
import { ContactForm } from "./ContactForm";
import { submitContactFormActionReducer } from "./actions";

export default function Page() {
  return (
    <StaticPageContainer centered>
      <Panel className={styles.contactContainer} p="large">
        <Header className={s({ mb: "large" })} as="h2">
          Contact
        </Header>

        <ContactForm submitActionReducer={submitContactFormActionReducer} />
      </Panel>
    </StaticPageContainer>
  );
}
