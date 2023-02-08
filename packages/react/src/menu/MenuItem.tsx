import * as React from 'react';
import { classNames } from '@stewed/utils';

import styles from './Base.module.scss';

export interface MenuItemProps {
    skin?: 'default' | 'danger';
    startSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
    className?: string;
    selected?: boolean;
    disabled?: boolean;
}

export const MenuItem = ({
    className,
    skin = 'default',
    selected,
    disabled,
    children,
}: React.PropsWithChildren<MenuItemProps>): React.ReactElement => {
    const rootClassName = 'menu__item';
    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            skin !== 'default' && styles[`${rootClassName}--${skin}`],
            selected && styles[`${rootClassName}--selected`],
            disabled && styles[`${rootClassName}--disabled`],
            className
        ),
    };
    return (
        <button
            className={cssClasses.root}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
        >
            {children}
        </button>
    );
};