import { Button } from "./Button";
import { ElementGroup } from "./ElementGroup";
import { Input } from "./Input";

interface Props {
  className?: string;
  requestToJoinStrata: (fd: FormData) => void;
  strataId: string;
}

export function JoinStrataForm({
  className,
  requestToJoinStrata,
  strataId,
}: Props) {
  return (
    <form action={requestToJoinStrata} className={className}>
      <input name="strata_id" type="hidden" defaultValue={strataId} />

      <ElementGroup orientation="column">
        <Input id="email" name="email" type="email" placeholder="Email" />
        <Input id="name" name="name" type="text" placeholder="Full Name" />

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />

        <Button type="submit">Submit</Button>
      </ElementGroup>
    </form>
  );
}
