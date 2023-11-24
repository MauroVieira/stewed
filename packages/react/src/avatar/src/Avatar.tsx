import React from "react";
// Compound Component
import { AvatarGroup } from "./AvatarGroup";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface AvatarProps {
  /**
   * Defines the skin color of the avatar.
   * @default "primary"
   */
  skin?: "primary" | "secondary";
  /**
   * Specifies the size of the avatar.
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /**
   * Determines the appearance shape of the avatar.
   * @default "circle"
   */
  appearance?: "circle" | "square";
  /** The name associated with the avatar. */
  name?: string;
  /** Additional CSS class to apply to the avatar. */
  className?: string;
  /** The URL of the image to be displayed as the avatar. */
  src?: string;
}


export function Avatar({
  size = "md",
  skin = "primary",
  appearance = "circle",
  className,
  src,
  name,
}: AvatarProps): React.ReactElement {
  const rootClassName = "avatar";
  const cssClasses = {
    root: classNames(
      styles[rootClassName],
      appearance && styles[`${rootClassName}--${appearance}`],
      styles[`${rootClassName}--${size}`],
      styles[`${rootClassName}--${skin}`],
      className,
    ),
    img: styles[`${rootClassName}__img`],
  };

  const initials = name?.match(/[A-Z]/g)?.join("").slice(0, 2).toUpperCase();

  return (
    <div className={cssClasses.root}>
      {src ? <img className={cssClasses.img} src={src} alt={name} /> : initials}
    </div>
  );
}

// Compound component composition
Avatar.Group = AvatarGroup;
