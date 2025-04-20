import { iconColorVar, vars } from "../../app/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

import { calc } from "@vanilla-extract/css-utils";
import { recipe } from "@vanilla-extract/recipes";

export const buttonBase = style({
  position: "relative",
  fontWeight: 700,
  borderWidth: 2,
  borderStyle: "solid",

  outline: "none",
  cursor: "pointer",

  textTransform: "capitalize",
  whiteSpace: "nowrap",

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.8,
    },
  },
});

export const buttonSizes = styleVariants({
  small: {
    height: vars.sizes.small,
    padding: `0 ${vars.spacing.small}`,
  },
  normal: {
    height: vars.sizes.normal,
    padding: `0 ${vars.spacing.normal}`,
  },
  large: {
    height: vars.sizes.large,
    padding: `0 ${vars.spacing.large}`,
  },
  xl: {
    height: vars.sizes.xl,
    padding: `0 ${vars.spacing.xl}`,
  },
  xxl: {
    height: vars.sizes.xxl,
    padding: `0 ${vars.spacing.xxl}`,
  },
});

export const button = recipe({
  base: [
    buttonBase,
    {
      borderRadius: vars.borderRadius,
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

    withIcon: {
      true: {
        display: "flex",
        alignItems: "center",
        padding: vars.spacing.xs,
        height: vars.sizes.normal,
        gap: vars.spacing.normal,
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
          [iconColorVar]: vars.colors.red700,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.red500} 12%, transparent)`,
                color: vars.colors.red900,
                borderColor: vars.colors.red900,
                vars: {
                  [iconColorVar]: vars.colors.red900,
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
          [iconColorVar]: vars.colors.green900,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.green500} 12%, transparent)`,
                color: vars.colors.green900,
                borderColor: vars.colors.green900,
                vars: {
                  [iconColorVar]: vars.colors.green900,
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
          [iconColorVar]: vars.colors.orange900,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.orange500} 12%, transparent)`,
                color: vars.colors.orange900,
                borderColor: vars.colors.orange900,
                vars: {
                  [iconColorVar]: vars.colors.orange900,
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
          [iconColorVar]: vars.colors.red700,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.red500} 12%, transparent)`,
                color: vars.colors.red900,
                vars: {
                  borderColor: `color-mix(in srgb, ${vars.colors.red500} 12%, transparent)`,
                  [iconColorVar]: vars.colors.red900,
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
          [iconColorVar]: vars.colors.green900,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.green500} 12%, transparent)`,
                color: vars.colors.green900,
                vars: {
                  borderColor: `color-mix(in srgb, ${vars.colors.green500} 12%, transparent)`,
                  [iconColorVar]: vars.colors.green900,
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
          [iconColorVar]: vars.colors.orange900,
        },

        "@media": {
          "(hover: hover) and (pointer: fine)": {
            selectors: {
              "&:hover": {
                backgroundColor: `color-mix(in srgb, ${vars.colors.orange500} 12%, transparent)`,
                color: vars.colors.orange900,
                vars: {
                  borderColor: `color-mix(in srgb, ${vars.colors.orange500} 12%, transparent)`,
                  [iconColorVar]: vars.colors.orange900,
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

export const iconContainer = style({
  display: "flex",
  alignItems: "center",
  height: "100%",
  flexGrow: 0,
  aspectRatio: "1/1",
  borderRadius: calc(vars.borderRadius).subtract("2px").toString(),
  backgroundColor: "rgba(255, 255, 255, 0.1)",

  selectors: {
    [`${button.classNames.variants.style.secondary} &`]: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  },
});

export const emptyIconContainer = style([
  iconContainer,
  {
    background: "none",

    selectors: {
      [`${button.classNames.variants.style.secondary} &`]: {
        background: "none",
      },
    },
  },
]);

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
