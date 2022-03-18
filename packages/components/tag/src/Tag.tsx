import * as React from 'react';
import { classNames } from '@stewed/utils';

type TagType = React.HTMLAttributes<HTMLSpanElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export interface TagProps extends TagType {
    appearance?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Tag: React.FC<TagProps> = ({
    appearance = 'primary',
    size = 'md',
    className,
    children,
    ...otherProps
}): React.ReactElement => {
    const { href } = otherProps;
    const Tag = href ? 'a' : 'span';
    const rootClassName = 'tag';
    const computedClasses = classNames(
        rootClassName,
        className,
        `${rootClassName}--${appearance}`,
        `${rootClassName}--${size}`,
    );

    return (
        <Tag className={computedClasses} href={href} {...otherProps}>
            {children}
        </Tag>
    );
};
