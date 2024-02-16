import React, { useEffect, useMemo } from "react";
// Tokens
import { defaultTokens, type Tokens, type Components, Radius, Elevation } from "@stewed/tokens";
// Utilities
import { objectKeys } from "@stewed/utilities";
// Hooks
import { type ThemeContextProps, useTheme } from "./ThemeContext";

type ThemeContextOmittedProps<T extends string> = Omit<
  ThemeContextProps<T>,
  "setTheme" | "setTokens" | "theme"
>;

type OutputTokens = Exclude<Tokens, "components"> & {
  [K in keyof Components]?: {
    radius?: string;
    elevation?: string;
  };
};

type ComponentObject = {
  radius?: Radius;
  elevation?: Elevation;
};

export interface RootProps<T extends string>
  extends React.ComponentPropsWithRef<"div">,
    ThemeContextOmittedProps<T> {
  /** Additional class name for styling. */
  className?: string;
  /** React components to be rendered within the Root component. */
  children?: React.ReactNode;
}

/**
 * Root component for applying themed styles to its children based on the current theme.
 *
 * @param {RootProps} props - Props for the Root component.
 * @returns {React.ReactElement} - React element representing the root component with themed styles applied.
 */
export function Root<T extends string>({ children, ...props }: RootProps<T>): React.ReactElement {
  // Theme and tokens from the context
  const { theme, tokens } = useTheme();

  const currentTheme = theme || "default";

  const outputObject = useMemo(() => {
    const mergedTokens = objectKeys(defaultTokens).reduce((acc: OutputTokens, key) => {
      acc[key] = {
        ...defaultTokens[key],
        ...(tokens?.[currentTheme]?.[key] || {}),
      };
      return acc;
    }, {});

    if (tokens?.[currentTheme]?.components) {
      mergedTokens.components = objectKeys(defaultTokens.components || {}).reduce(
        (acc: Components, component) => {
          acc[component] = {
            ...((defaultTokens.components || {})[component] as Record<
              keyof Components,
              Components[keyof Components]
            >),
            ...(tokens[currentTheme]?.components?.[component] || {}),
          };
          return acc;
        },
        {},
      );
    }

    return objectKeys(mergedTokens).reduce((acc: OutputTokens, key) => {
      if (mergedTokens.components && key === "components") {
        objectKeys(mergedTokens.components).forEach((component) => {
          const componentObj: ComponentObject | undefined = mergedTokens?.components?.[component];
          if (componentObj) {
            acc[component] = {
              ...componentObj,
              ...(componentObj.radius && {
                radius: mergedTokens.radius?.[componentObj.radius] || componentObj.radius,
              }),
              ...(componentObj.elevation && {
                elevation:
                  mergedTokens.elevation?.[componentObj.elevation] || componentObj.elevation,
              }),
            };
          }
        });
      } else {
        acc[key] = mergedTokens[key];
      }

      return acc;
    }, {}) as OutputTokens;
  }, [currentTheme, tokens]);

  // Convert merged tokens to CSS custom properties
  const cssProperties = useMemo(() => {
    return Object.fromEntries(
      Object.entries(outputObject).flatMap(([context, data]) =>
        Object.entries(data).map(([key, value]) => [
          `--${context}-${key}`.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
          value,
        ]),
      ),
    );
  }, [outputObject]);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.setAttribute("data-theme", currentTheme);

    styleTag.innerHTML = `[data-theme="${currentTheme}"] { \n${Object.entries(cssProperties)
      .map(([property, value]) => `${property}: ${value};`)
      .join("\n")}\n}`;

    document.head.appendChild(styleTag);

    return () => {
      styleTag.remove();
    };
  }, [cssProperties, currentTheme]);

  return (
    <>
      <div data-theme={currentTheme} {...props}>
        {children}
      </div>
    </>
  );
}
