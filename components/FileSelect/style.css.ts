import { buttonSizes } from "../Button/style.css";
import { style } from "@vanilla-extract/css";

export const loadingState = style([
  buttonSizes.normal,
  {
    display: "flex",
    alignItems: "center",
  },
]);
