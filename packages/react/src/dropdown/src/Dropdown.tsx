import React, { useRef, useState } from "react";
// UI Components
import { Motion, Scope } from "../..";
// Hooks
import { useBem, useFloating, useClickOutside, type FloatingPlacement } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface DropdownChildrenProps<T> {
  /** Ref to attach to the `Dropdown` element */
  ref: React.Ref<T>;
  /** Callback to open the dropdown */
  open: () => void;
  /** Callback to close dropdown  */
  close: () => void;
  /** Indicates whether the dropdown is currently open */
  isOpen: boolean;
}

export interface DropdownProps<T>
  extends Omit<React.ComponentPropsWithRef<"div">, "children" | "content"> {
  /**
   * Specifies the preferred placement of the `Dropdown` relative to its trigger.
   * @example "top", "bottom", "left", "right"
   */
  placement?: FloatingPlacement;
  /** Indicates whether the `Dropdown` is currently open. */
  open?: boolean;
  /**
   * Allows the `Dropdown` to remain open even when clicking outside of it.
   * @default false
   */
  allowClickOutside?: boolean;
  /** Callback function invoked when the dialog is clicked outside. */
  onClickOutside?: () => void;
  /**
   * Function that returns a React element used as the anchor for the `Dropdown`.
   * @param props - Render props for the `Dropdown` component, including the necessary event handlers.
   * @returns A React element that serves as the anchor for the `Dropdown`.
   */
  renderAnchor: (props: DropdownChildrenProps<T>) => React.ReactElement;
  /**
   * Function that returns a React element with events to trigger `Dropdown` position and visibility.
   * @param props - Render props for `Dropdown` component, excluding the `ref` property.
   * @returns A React element that controls the position and visibility of the `Dropdown`.
   */
  children: (props: Omit<DropdownChildrenProps<T>, "ref">) => React.ReactElement;
}

/**
 * Dropdown component is a floating element designed to serve as a lightweight context menu,
 * perfect for containing navigation options and action items within a user interface.
 *
 * @example
 * ```tsx
 * <Dropdown<HTMLButtonElement>
 *   placement="top"
 *   renderAnchor={({ ref, open }) => (
 *     <button ref={ref} onClick={open}>Conor McGregor</button>
 *   )}>
 *   Surprise surprise, the king is back...
 * </Dropdown>
 * ```
 *
 * @remarks This component props extended from React.ComponentPropsWithRef<"div">.
 *
 * @param {DropdownProps} props - The props for the Dropdown component.
 * @returns {React.ReactElement} - The rendered Dropdown component.
 */
export function Dropdown<T extends HTMLElement>({
  placement = "bottom-start",
  open,
  className,
  style,
  allowClickOutside = false,
  onClickOutside,
  renderAnchor,
  children,
  ...props
}: DropdownProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Dropdown, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  // Create a reference to manage the dropdown element
  const dropdownRef = useRef<T>(null);

  const [isOpen, setOpen] = useState(open);

  // Determines the visibility of the Dropdown based on controlled (open) or uncontrolled (isOpen) state.
  const isVisible = open || isOpen;

  // Floating position calculation hook
  const { floating, x, y, isPositioned } = useFloating<T, HTMLDivElement>({
    open: isVisible,
    placement,
    reference: dropdownRef.current,
    offset: 4,
  });

  // Hook to handle clicks outside the floating element.
  useClickOutside({
    enabled: isVisible,
    ignoredElements: [dropdownRef.current as Element, floating.current as Element],
    onClickOutside: () => (allowClickOutside ? onClickOutside : setOpen(false)),
  });

  // Opens the dropdown by setting the state to true.
  const onHandleOpen = (): void => {
    setOpen(true);
  };

  // Closes the dropdown by setting the state to false.
  const onHandleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      {renderAnchor({
        ref: dropdownRef,
        open: onHandleOpen,
        close: onHandleClose,
        isOpen: !!isVisible,
      })}
      {isVisible && (
        <Scope elevation="navigation">
          <Motion animation="fade-in">
            <div
              ref={floating}
              className={cssClasses.root}
              style={{
                ...style,
                visibility: isPositioned ? "visible" : "hidden",
                left: `${x}px`,
                top: `${y}px`,
              }}
              {...props}>
              {children({ open: onHandleOpen, close: onHandleClose, isOpen: !!isVisible })}
            </div>
          </Motion>
        </Scope>
      )}
    </>
  );
}
