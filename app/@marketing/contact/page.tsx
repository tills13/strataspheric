import { s } from "../../../sprinkles.css";

import { Header } from "../../../components/Header";
import { StaticPageContainer } from "../StaticPageContainer";
import { ContactForm } from "./ContactForm";
import { submitContactFormActionReducer } from "./actions";

export const runtime = "edge";

export default function Page() {
  return (
    <StaticPageContainer>
      <Header className={s({ mb: "large" })} priority={2}>
        Contact
      </Header>

      <ContactForm submitActionReducer={submitContactFormActionReducer} />
    </StaticPageContainer>
  );
}
