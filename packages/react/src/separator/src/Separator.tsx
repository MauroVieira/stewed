import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
import type { Spacings } from "../../tokens";
// Styles
import styles from "./styles/index.module.scss";

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * Change the visual style of the separator.
   * @default primary
   */
  skin?: "primary" | "neutral" | "critical";
  /** Adds space between separator on the horizontal and vertical axes. */
  space?: {
    x?: Spacings;
    y?: Spacings;
  };
  /**
   * Specifies the orientation of the separator.
   * @default horizontal
   */
  orientation?: "vertical" | "horizontal";
}

/**
 * This component displays an separator component.
 * Separator component usually used for visually separating content.
 *
 * @example
 * ```tsx
 * <Separator skin="primary" space={{ x: 'sm', y: 'md' }} orientation="horizontal" />
 * ```
 *
 * @remarks This component props extended from React.HTMLAttributes<HTMLHRElement>.
 *
 * @param {SeparatorProps} props - The props for the Separator component.
 * @returns {React.ReactElement} - The rendered Separator component.
 */
export function Separator({
  skin = "neutral",
  space = { x: "none", y: "sm" },
  orientation = "horizontal",
  className,
  ...props
}: SeparatorProps): React.ReactElement {
  const rootName = "separator";
  const cssClasses = {
    root: classNames(
      styles[rootName],
      styles[`${rootName}--${skin}`],
      styles[`${rootName}--${orientation}`],
      space?.x && styles[`${rootName}--space-x-${space.x}`],
      space?.y && styles[`${rootName}--space-y-${space.y}`],
      className,
    ),
  };

  return <hr className={cssClasses.root} {...props} />;
}