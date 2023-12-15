import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  const rootName = "card__footer";
  const cssClasses = {
    root: classNames(styles[rootName], className),
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
