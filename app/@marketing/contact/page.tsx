import { s } from "../../../sprinkles.css";

import { Button } from "../../../components/Button";
import { Header } from "../../../components/Header";
import { InputField } from "../../../components/InputField";
import { StatusButton } from "../../../components/StatusButton";
import { TextArea } from "../../../components/TextArea";
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
