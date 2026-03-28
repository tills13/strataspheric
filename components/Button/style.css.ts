import { iconColorVar, vars } from "../../app/theme.css";
import { fieldBaseActionContainer } from "../Form/style.css";
import { style, styleVariants } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";
import { recipe } from "@vanilla-extract/recipes";

export const buttonBase = style({
  position: "relative",
  fontWeight: vars.fontWeights.bold,
  borderWidth: vars.borderWidth,
  borderStyle: "solid",

  outline: "none",
  cursor: "pointer",

  textTransform: "capitalize",
  whiteSpace: "nowrap",

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: vars.opacity.subtle,
    },

    [`${fieldBaseActionContainer} &`]: {
      padding: vars.spacing.xxs,
      height: "100%",
    },
  },
});

export const buttonSizes = styleVariants({
  small: { height: vars.sizes.small },
  normal: { height: vars.sizes.normal },
  large: { height: vars.sizes.large },
  xl: { height: vars.sizes.xl },
  xxl: { height: vars.sizes.xxl },
});

export const buttonSpacing = styleVariants({
  small: { padding: `0 ${vars.spacing.small}` },
  normal: { padding: `0 ${vars.spacing.normal}` },
  large: { padding: `0 ${vars.spacing.large}` },
  xl: { padding: `0 ${vars.spacing.xl}` },
  xxl: { padding: `0 ${vars.spacing.xxl}` },
});

export const button = recipe({
  base: [
    buttonBase,
    {
      borderRadius: vars.borderRadius.md,
      transition: `background-color ${vars.transitions.fast}, border-color ${vars.transitions.fast}, box-shadow ${vars.transitions.fast}`,
    },
  ],

  variants: {
    color: {
      default: {
        borderColor: vars.colors.borderDefault,
        color: vars.fontColors.primary,

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: vars.colors.borderDefaultHover,
                borderColor: vars.colors.borderDefaultHover,
                color: vars.fontColors.primaryHover,
              },
            },
          },
        },
      },
      error: {
        borderColor: vars.colors.red500,
        backgroundColor: vars.colors.red500,
        color: vars.colors.white,

        vars: {
          [iconColorVar]: vars.colors.white,
        },
      },
      primary: {
        borderColor: vars.colors.primary,
        backgroundColor: vars.colors.primary,
        color: vars.colors.white,
        boxShadow: vars.shadows.sm,

        vars: {
          [iconColorVar]: vars.colors.white,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: vars.colors.primaryHover,
                borderColor: vars.colors.primaryHover,
                color: vars.colors.white,
                boxShadow: vars.shadows.md,
              },
            },
          },
        },
      },
      success: {
        borderColor: vars.colors.green500,
        backgroundColor: vars.colors.green500,
        color: vars.colors.white,

        vars: {
          [iconColorVar]: vars.colors.white,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                borderColor: vars.colors.green700,
                backgroundColor: vars.colors.green700,
                color: vars.colors.white,
              },
            },
          },
        },
      },
      warning: {
        borderColor: vars.colors.orange500,
        backgroundColor: vars.colors.orange500,

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                borderColor: vars.colors.orange700,
                backgroundColor: vars.colors.orange700,
              },
            },
          },
        },
      },
    },

    size: {
      small: [buttonSizes.small],
      normal: [buttonSizes.normal],
      large: [buttonSizes.large],
      xl: [buttonSizes.xl],
      xxl: [buttonSizes.xxl],
    },

    style: {
      /* fill button */
      primary: {},
      /* border button */
      secondary: {},
      /* transparent */
      tertiary: {
        borderColor: "transparent",
        backgroundColor: "transparent",
        boxShadow: "none",
      },
    },

    iconOnly: {
      true: {
        display: "flex",
        alignItems: "center",
        aspectRatio: "1/1",
        padding: 0,
      },
    },

    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },

  compoundVariants: [
    // style=secondary x color
    {
      variants: {
        style: "secondary",
        color: "error",
      },
      style: {
        backgroundColor: `color-mix(in srgb, ${vars.colors.red500} 8%, transparent)`,
        color: vars.colors.red700,
        vars: {
          [iconColorVar]: vars.colors.red500,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.red500} 12%, transparent)`,
                color: vars.colors.red900,
                borderColor: vars.colors.red900,
                vars: {
                  [iconColorVar]: vars.colors.red700,
                },
              },
            },
          },
        },
      },
    },
    {
      variants: {
        style: "secondary",
        color: "primary",
      },
      style: {
        backgroundColor: `color-mix(in srgb, ${vars.colors.primary} 8%, transparent)`,
        color: vars.colors.primary,
        vars: {
          [iconColorVar]: vars.colors.primary,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.primary} 12%, transparent)`,
                color: vars.colors.primaryHover,
                borderColor: vars.colors.primaryHover,
                vars: {
                  [iconColorVar]: vars.colors.primaryHover,
                },
              },
            },
          },
        },
      },
    },
    {
      variants: {
        style: "secondary",
        color: "success",
      },
      style: {
        backgroundColor: `color-mix(in srgb, ${vars.colors.green500} 8%, transparent)`,
        color: vars.colors.green900,
        vars: {
          [iconColorVar]: vars.colors.green500,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.green500} 12%, transparent)`,
                color: vars.colors.green900,
                borderColor: vars.colors.green900,
                vars: {
                  [iconColorVar]: vars.colors.green700,
                },
              },
            },
          },
        },
      },
    },
    {
      variants: {
        style: "secondary",
        color: "warning",
      },
      style: {
        backgroundColor: `color-mix(in srgb, ${vars.colors.orange500} 8%, transparent)`,
        color: vars.colors.orange900,
        vars: {
          [iconColorVar]: vars.colors.orange500,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.orange500} 12%, transparent)`,
                color: vars.colors.orange900,
                borderColor: vars.colors.orange900,
                vars: {
                  [iconColorVar]: vars.colors.orange700,
                },
              },
            },
          },
        },
      },
    },

    // style=tertiary x color
    {
      variants: {
        style: "tertiary",
        color: "error",
      },
      style: {
        color: vars.colors.red700,
        vars: {
          [iconColorVar]: vars.colors.red500,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.red500} 12%, transparent)`,
                color: vars.colors.red900,
                vars: {
                  borderColor: `color-mix(in srgb, ${vars.colors.red500} 12%, transparent)`,
                  [iconColorVar]: vars.colors.red700,
                },
              },
            },
          },
        },
      },
    },
    {
      variants: {
        style: "tertiary",
        color: "primary",
      },
      style: {
        color: vars.colors.primary,
        vars: {
          [iconColorVar]: vars.colors.primary,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.primary} 12%, transparent)`,
                color: vars.colors.primaryHover,
                vars: {
                  borderColor: `color-mix(in srgb, ${vars.colors.primary} 12%, transparent)`,
                  [iconColorVar]: vars.colors.primaryHover,
                },
              },
            },
          },
        },
      },
    },
    {
      variants: {
        style: "tertiary",
        color: "success",
      },
      style: {
        color: vars.colors.green900,
        vars: {
          [iconColorVar]: vars.colors.green500,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.green500} 12%, transparent)`,
                color: vars.colors.green900,
                vars: {
                  borderColor: `color-mix(in srgb, ${vars.colors.green500} 12%, transparent)`,
                  [iconColorVar]: vars.colors.green700,
                },
              },
            },
          },
        },
      },
    },
    {
      variants: {
        style: "tertiary",
        color: "warning",
      },
      style: {
        color: vars.colors.orange900,
        vars: {
          [iconColorVar]: vars.colors.orange500,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.orange500} 12%, transparent)`,
                color: vars.colors.orange900,
                vars: {
                  borderColor: `color-mix(in srgb, ${vars.colors.orange500} 12%, transparent)`,
                  [iconColorVar]: vars.colors.orange700,
                },
              },
            },
          },
        },
      },
    },
  ],

  defaultVariants: {
    size: "normal",
    fullWidth: true,
  },
});

export const iconButton = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.spacing.normal,

  selectors: {
    "&:has(:nth-child(2))": {
      padding: vars.spacing.xxs,
    },
    [`${button.classNames.variants.size.small}&`]: {
      background: "blue",
      gap: vars.spacing.xs,
    },
  },
});

export const iconCenterRemainder = style({
  // selectors: {
  //   "&:has(:nth-child(2))": {
  //   }
  // }
  paddingLeft: vars.spacing.normal,
});

export const iconContainer = style({
  display: "flex",
  alignItems: "center",
  height: "100%",
  flexGrow: 0,
  aspectRatio: "1/1",
  borderRadius: calc(vars.borderRadius.md).subtract(vars.borderWidth).toString(),
  backgroundColor: "rgba(255, 255, 255, 0.1)",

  selectors: {

    // primary (fill) style - deeper accent tint
    [`${button.classNames.variants.color.error} &`]: {
      backgroundColor: `color-mix(in srgb, ${vars.colors.red700} 40%, transparent)`,
    },
    [`${button.classNames.variants.color.success} &`]: {
      backgroundColor: `color-mix(in srgb, ${vars.colors.green700} 40%, transparent)`,
    },
    [`${button.classNames.variants.color.warning} &`]: {
      backgroundColor: `color-mix(in srgb, ${vars.colors.orange700} 40%, transparent)`,
    },
    [`${button.classNames.variants.color.primary} &`]: {
      backgroundColor: `color-mix(in srgb, ${vars.colors.indigo800} 40%, transparent)`,
    },

    // secondary style - lighter accent tint (more specific, overrides above)
    [`${button.classNames.variants.style.secondary}${button.classNames.variants.color.error} &`]: {
      backgroundColor: `color-mix(in srgb, ${vars.colors.red500} 15%, transparent)`,
    },
    [`${button.classNames.variants.style.secondary}${button.classNames.variants.color.success} &`]: {
      backgroundColor: `color-mix(in srgb, ${vars.colors.green500} 15%, transparent)`,
    },
    [`${button.classNames.variants.style.secondary}${button.classNames.variants.color.warning} &`]: {
      backgroundColor: `color-mix(in srgb, ${vars.colors.orange500} 15%, transparent)`,
    },
    [`${button.classNames.variants.style.secondary}${button.classNames.variants.color.primary} &`]: {
      backgroundColor: `color-mix(in srgb, ${vars.colors.primary} 15%, transparent)`,
    },
  },
});

export const iconSpacer = style({
  height: "100%",
  flexGrow: 0,
  aspectRatio: "1/1",
});

export const buttonContentContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});

export const remainderPaddingLeft = style({
  paddingLeft: calc(vars.spacing.normal)
    .subtract(vars.spacing.small)
    .toString(),
});

export const remainderPaddingRight = style({
  paddingRight: calc(vars.spacing.normal)
    .subtract(vars.spacing.small)
    .toString(),
});
