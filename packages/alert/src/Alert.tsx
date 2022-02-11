import * as React from 'react';
import { classNames } from '@stewed/utils';

export interface AlertProps {
    title?: string;
    appearance?: 'info' | 'success' | 'warning' | 'danger';
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({
    title,
    appearance = 'info',
    className,
    children,
}): React.ReactElement => {
    const rootClassName = 'alert';
    const computedClasses = classNames(
        rootClassName,
        className,
        `${rootClassName}--${appearance}`
    );
    return (
        <div className={computedClasses} role="alert">
            { title && (
                <div className={`${rootClassName}__title`}>
                    { title }
                </div>
            ) }
            <div className={`${rootClassName}__body`}>
                {children}
            </div>
        </div>
    );
};