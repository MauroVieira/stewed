import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Style
import styles from "./styles/index.module.scss";

const defaultElement = "div";

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface BoxProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  /** Specifies the type of element to use as box. */
  as?: T;
  /** The direction of the box container. */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  /** The gap between box items. Can be a predefined size or a custom value. */
  gap?: Sizes;
  /** Aligns box items along the main axis. */
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  /** Aligns box items along the cross axis. */
  items?: "start" | "end" | "center" | "baseline" | "stretch";
  /** Determines whether box items should wrap to the next line if they exceed the container's width. */
  wrap?: "wrap" | "wrap-reverse" | "nowrap";
  /** Adds space between box items on the horizontal and vertical axes. */
  space?: {
    x?: Sizes;
    y?: Sizes;
  };
  /** Renders the box container as an inline element. */
  inline?: boolean;
  /** Allows the box container to grow to fill available space. */
  grow?: boolean;
}

/**
 * This component displays an box component.
 * Component that implements the CSS box box API.
 *
 * @example
 * ```tsx
 * <Box direction="column" gap="sm"></Box>
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param {BoxProps} props - The props for the Box component.
 * @returns {React.ReactElement} - The rendered Box component.
 */
export const Box = fixedForwardRef(function UnwrappedBox<T extends React.ElementType>(
  {
    as,
    direction = "row",
    gap,
    justify,
    items,
    wrap,
    space,
    inline,
    grow,
    className,
    children,
    ...props
  }: BoxProps<T> &
    DistributiveOmit<
      React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
      "as"
    >,
  ref: React.ForwardedRef<unknown>,
): React.ReactElement {
  const Comp = as || defaultElement;
  const rootClassName = "box";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      styles[`${rootClassName}--${direction}`],
      gap && styles[`${rootClassName}--gap-${gap}`],
      justify && styles[`${rootClassName}--justify-${justify}`],
      items && styles[`${rootClassName}--items-${items}`],
      space?.x && styles[`${rootClassName}--space-x-${space.x}`],
      space?.y && styles[`${rootClassName}--space-y-${space.y}`],
      wrap && styles[`${rootClassName}--${wrap}`],
      inline && styles[`${rootClassName}--inline`],
      grow && styles[`${rootClassName}--grow`],
      className,
    ),
  };

  return (
    <Comp ref={ref} className={cssClasses.root} {...props}>
      {children}
    </Comp>
  );
});