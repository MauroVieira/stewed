import React from 'react';
import { classNames } from '@stewed/utilities';

import styles from './Base.module.scss';

export interface BadgeProps {
    skin?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
    count?: string;
    className?: string;
    children: React.ReactNode;
}

export const Badge = ({
    skin = 'primary',
    count,
    className,
    children,
}: BadgeProps): React.ReactElement => {
    const rootClassName = 'badge';

    const cssClasses = {
        root: classNames(
            styles[rootClassName],
            styles[`${rootClassName}--${skin}`],
            count && count.length > 2 && styles[`${rootClassName}--padded`],
            className
        ),
        count: styles[`${rootClassName}__count`],
    };
    return (
        <div className={cssClasses.root}>
            {children}
            <span className={cssClasses.count}>{count}</span>
        </div>
    );
};
