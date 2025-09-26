'use client';

import React, { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { Icon } from '.';

/**
 * @interface SmartLinkProps
 * @description Defines the props for the SmartLink component.
 * @extends React.AnchorHTMLAttributes<HTMLAnchorElement>
 * @property {string} href - The URL for the link. Required.
 * @property {string} [prefixIcon] - The name of an icon to display before the link content.
 * @property {string} [suffixIcon] - The name of an icon to display after the link content.
 * @property {'xs' | 's' | 'm' | 'l' | 'xl'} [iconSize='xs'] - The size of the prefix or suffix icon.
 * @property {React.CSSProperties} [style] - Optional inline styles for the link.
 * @property {string} [className] - Optional CSS class name for the link.
 * @property {boolean} [selected] - If true, applies an underline style to indicate a selected or active state.
 * @property {boolean} [unstyled=false] - If true, removes all default styling from the link.
 * @property {ReactNode} children - The content of the link.
 */
interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    prefixIcon?: string;
    suffixIcon?: string;
    iconSize?: 'xs' | 's' | 'm' | 'l' | 'xl';
    style?: React.CSSProperties;
    className?: string;
    selected?: boolean;
    unstyled?: boolean;
    children: ReactNode;
}

/**
 * @name SmartLink
 * @description
 * An intelligent link component that automatically uses Next.js's `Link` for internal
 * routes and a standard `<a>` tag (with `target="_blank"`) for external URLs. It can be
 * styled with prefix/suffix icons or be completely unstyled.
 * @param {SmartLinkProps} props - The props for the component.
 * @param {React.Ref<HTMLAnchorElement>} ref - A ref for the component's root anchor element.
 * @returns {React.ReactElement} The rendered SmartLink component.
 */
const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(({ 
        href,
        prefixIcon,
        suffixIcon,
        iconSize='xs',
        style,
        className,
        selected,
        unstyled = false,
        children,
        ...props
    }, ref) => {
        const isExternal = href.startsWith('http') || href.startsWith('//');

        const content = (
            <>
                {prefixIcon && <Icon name={prefixIcon} size={iconSize} />}
                {children}
                {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
            </>
        );

        const commonProps = {
            ref,
            className: classNames(className || '', {
                'px-4 mx-4': !unstyled,
            }),
            style: !unstyled ? {
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--static-space-8)',
                borderRadius: 'var(--radius-s)',
                ...(selected && { textDecoration: 'underline' }),
                ...style
            } : { 
                textDecoration: 'none',
                color: 'inherit',
                ...style
            },
            ...props
        };

        if (isExternal) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    {...commonProps}>
                    {content}
                </a>
            );
        }

        return (
            <Link
                href={href}
                {...commonProps}
                {...props}>
                {content}
            </Link>
        );
    }
);

SmartLink.displayName = 'SmartLink';

export { SmartLink };