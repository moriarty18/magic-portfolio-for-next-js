'use client';

import React, { ReactNode, forwardRef } from 'react';
import Link from 'next/link';

import { Spinner, Icon } from '.';
import styles from './Button.module.scss';

/**
 * @interface CommonProps
 * @description Defines the common props shared between the Button and Anchor variations.
 * @property {'primary' | 'secondary' | 'tertiary' | 'danger'} [variant='primary'] - The visual style of the button.
 * @property {'s' | 'm' | 'l'} [size='m'] - The size of the button.
 * @property {string} [label] - The text content of the button. Can also be provided as children.
 * @property {string} [prefixIcon] - The name of an icon to display before the label.
 * @property {string} [suffixIcon] - The name of an icon to display after the label.
 * @property {boolean} [loading=false] - If true, displays a spinner and disables the button.
 * @property {boolean} [fillWidth=false] - If true, the button will take up the full width of its container.
 * @property {ReactNode} [children] - The content of the button. Can be used instead of `label`.
 * @property {string} [href] - If provided, the component will render as a link.
 * @property {string} [className] - Optional CSS class name.
 * @property {React.CSSProperties} [style] - Optional inline styles.
 */
interface CommonProps {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
    size?: 's' | 'm' | 'l';
    label?: string;
    prefixIcon?: string;
    suffixIcon?: string;
    loading?: boolean;
    fillWidth?: boolean;
    children?: ReactNode;
    href?: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * @typedef {CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} ButtonProps
 * @description Defines the complete set of props for a standard `<button>` element.
 */
export type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * @typedef {CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>} AnchorProps
 * @description Defines the complete set of props for an `<a>` element (link).
 */
export type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const isExternalLink = (url: string) => /^https?:\/\//.test(url);

/**
 * @name Button
 * @description
 * A versatile button component that can be rendered as a standard button, a Next.js Link,
 * or an external anchor tag based on the `href` prop. It supports different variants,
 * sizes, icons, and a loading state.
 * @param {ButtonProps | AnchorProps} props - The props for the component.
 * @param {React.Ref<HTMLButtonElement | HTMLAnchorElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered Button component.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps | AnchorProps>(({
    variant = 'primary',
    size = 'm',
    label,
    children,
    prefixIcon,
    suffixIcon,
    loading = false,
    fillWidth = false,
    href,
    className,
    style,
    ...props
}, ref) => {
    const labelSize = size === 'l' ? 'font-l' : size === 'm' ? 'font-m' : 'font-s';
    const iconSize = size === 'l' ? 'm' : size === 'm' ? 's' : 'xs';

    const content = (
        <>
            {prefixIcon && !loading && <Icon name={prefixIcon} size={iconSize} />}
            {loading && <Spinner size={size} />}
            <div className={`font-label font-strong ${styles.label} ${labelSize}`}>{label || children}</div>
            {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
        </>
    );

    const commonProps = {
        className: `${styles.button} ${styles[variant]} ${styles[size]} ${fillWidth ? styles.fillWidth : styles.fitContent} ${className || ''}`,
        style: { ...style, textDecoration: 'none' },
    };

    if (href) {
        const isExternal = isExternalLink(href);

        if (isExternal) {
            return (
                <a
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    target="_blank"
                    rel="noreferrer"
                    {...commonProps}
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    {content}
                </a>
            );
        }

        return (
            <Link
                href={href}
                ref={ref as React.Ref<HTMLAnchorElement>}
                {...commonProps}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {content}
            </Link>
        );
    }

    return (
        <button
            ref={ref as React.Ref<HTMLButtonElement>}
            {...commonProps}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            {content}
        </button>
    );
});

Button.displayName = 'Button';

export { Button };