import * as React from 'react';
import { classNames } from '@stewed/utils';

import classes from './button.module.scss';

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonProps extends ButtonType {
    appearance?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    children: React.ReactNode;
}

export const Button = React.forwardRef(
    (
        {
            appearance = 'primary',
            size = 'md',
            disabled = false,
            children,
            ...otherProps
        }: ButtonProps,
        ref: React.Ref<HTMLButtonElement & HTMLAnchorElement>
    ): React.ReactElement => {
        const { href, className, onClick } = otherProps;
        let Tag = 'button';
        const rootClassName = classes.button;
        const computedClasses = classNames(
            rootClassName,
            className,
            `${rootClassName}--${appearance}`,
            `${rootClassName}--${size}`,
            disabled && `${rootClassName}--disabled`,
        );

        const handleClick = (
            event: React.MouseEvent<HTMLButtonElement>
        ): void => {
            if (disabled) return;
            if (onClick) onClick(event);
        };

        let computedProps = {
            ...otherProps,
            ref,
            className: computedClasses,
            onClick: handleClick,
        };

        if (href) {
            Tag = 'a';
            computedProps = {
                ...computedProps,
                ...{
                    tabIndex: disabled ? -1 : undefined,
                    href,
                },
            };
        } else {
            computedProps = {
                ...computedProps,
                ...{
                    disabled,
                },
            };
        }

        return <Tag {...computedProps}>{children}</Tag>;
    }
);

Button.displayName = 'Button';
