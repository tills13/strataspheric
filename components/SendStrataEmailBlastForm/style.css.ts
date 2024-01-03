import { iconColorVar, vars } from "../../app/theme.css";
import { icon } from "../Icon/style.css";
import { style } from "@vanilla-extract/css";

export const form = style({});

export const formHeader = style({
  marginBottom: vars.spacing.normal,
});

export const formElement = style({
  marginBottom: vars.spacing.small,
  width: "100%",
});

export const formTextArea = style({
  marginBottom: vars.spacing.small,
  width: "100%",
});

export const recipientsSelect = style({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: vars.spacing.small,
});

export const recipientCheckbox = style({
  position: "absolute",
  top: -1000,
  left: -1000,
});

export const recipient = style({
  display: "block",
  padding: vars.spacing.small,
  color: vars.fontColors.primary,
  border: `2px solid ${vars.colors.borderDefault}`,
  borderRadius: vars.borderRadius,
  cursor: "pointer",
  overflow: "hidden",

  selectors: {
    [`&:has(${recipientCheckbox}:checked)`]: {
      borderColor: vars.colors.borderDefaultHover,
    },
    "&:hover": {
      // backgroundColor: vars.colors.primaryHover,
    },
  },
});

export const recipientCheck = style([
  icon,
  {
    display: "inline-block",
    height: "24px",
    verticalAlign: "top",
    marginRight: vars.spacing.small,
    opacity: 0.5,
    vars: {
      [iconColorVar]: vars.colors.primary,
    },

    selectors: {
      [`${recipient}:has(${recipientCheckbox}:checked) &`]: {
        opacity: 1,
        vars: {
          [iconColorVar]: vars.colors.green700,
        },
      },
    },
  },
]);
