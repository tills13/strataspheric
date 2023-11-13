import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export default function Page() {
  return (
    <div>
      <Header priority={2}>Let's get to know you...</Header>

      <Input name="name" />
      <Input name="email" />

      <Header priority={2}>Let's get to know your strata...</Header>

      <Input name="strata_name" />

      <label htmlFor="is_public">
        <Header priority={2}>I want my strata's content to be public</Header>
        <Checkbox id="is_public" name="is_public" />
      </label>

      <Button>I'm done</Button>
    </div>
  );
}
