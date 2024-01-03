import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
  name: string;
}

export function UserInitialsAvatar({ className, name }: Props) {
  const initials = name
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <div className={classnames(className, styles.userInitialsAvatar)}>
      {initials}
    </div>
  );
}
