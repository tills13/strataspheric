import { Button } from "../Button";

interface Props extends React.ComponentProps<typeof Button> {
  icon: React.ReactNode;
  desktopText: React.ReactNode;
}

export function NavActionButton(props: Props) {
  return <Button {...props} iconTextBehaviour="centerRemainder" />;
}
