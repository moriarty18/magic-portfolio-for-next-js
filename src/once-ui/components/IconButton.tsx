'use client';

import React, { forwardRef, useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';

import { Icon, Tooltip } from '.';
import buttonStyles from './Button.module.scss';
import iconStyles from './IconButton.module.scss';

/**
 * @interface CommonProps
 * @description Defines the common props shared between the IconButton and Anchor variations.
 * @property {string} [icon='refresh'] - The name of the icon to display.
 * @property {'s' | 'm' | 'l'} [size='m'] - The size of the icon button.
 * @property {string} [tooltip] - The text to display in a tooltip on hover.
 * @property {'top' | 'bottom' | 'left' | 'right'} [tooltipPosition='top'] - The position of the tooltip.
 * @property {'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost'} [variant='primary'] - The visual style of the button.
 * @property {string} [className] - Optional CSS class name.
 * @property {React.CSSProperties} [style] - Optional inline styles.
 * @property {string} [href] - If provided, the component will render as a link.
 * @property {ReactNode} [children] - Custom content to render inside the button, which will override the default icon.
 */
interface CommonProps {
    icon?: string;
    size?: 's' | 'm' | 'l';
    tooltip?: string;
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
    className?: string;
    style?: React.CSSProperties;
    href?: string;
    children?: ReactNode;
}

/**
 * @typedef {CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} IconButtonProps
 * @description Defines the complete set of props for a standard icon `<button>` element.
 */
export type IconButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * @typedef {CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>} AnchorProps
 * @description Defines the complete set of props for an icon `<a>` element (link).
 */
export type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const isExternalLink = (url: string) => /^https?:\/\//.test(url);

/**
 * @name IconButton
 * @description
 * A polymorphic button component designed for displaying an icon. It can be rendered as a
 * standard button, a Next.js Link, or an external anchor tag. It includes a built-in,
 * delayed tooltip for improved user experience.
 * @param {IconButtonProps | AnchorProps} props - The props for the component.
 * @param {React.Ref<HTMLButtonElement | HTMLAnchorElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered IconButton component.
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps | AnchorProps>(({
    icon = 'refresh',
    size = 'm',
    tooltip,
    tooltipPosition = 'top',
    variant = 'primary',
    className,
    style,
    href,
    children,
    ...props
}, ref) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isHover) {
            timer = setTimeout(() => {
                setTooltipVisible(true);
            }, 400);
        } else {
            setTooltipVisible(false);
        }

        return () => clearTimeout(timer);
    }, [isHover]);

    const content = (
        <>
            {children ? (
                children
            ) : (
                <Icon name={icon} size="s" />
            )}
            {tooltip && isTooltipVisible && (
                <div style={{ position: "absolute" }} className={iconStyles[tooltipPosition]}>
                    <Tooltip label={tooltip} />
                </div>
            )}
        </>
    );

    const commonProps = {
        className: `${buttonStyles.button} ${buttonStyles[variant]} ${iconStyles[size]} ${className || ''}`,
        style: { ...style },
        onMouseEnter: () => setIsHover(true),
        onMouseLeave: () => setIsHover(false),
        'aria-label': tooltip || icon,
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

IconButton.displayName = 'IconButton';

export { IconButton };
