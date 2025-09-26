'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Logo.module.scss';
import { SpacingToken } from '../types';
import { Flex } from '.';

const sizeMap: Record<string, SpacingToken> = {
    xs: '20',
    s: '24',
    m: '32',
    l: '40',
    xl: '48',
};

/**
 * @interface LogoProps
 * @description Defines the props for the Logo component.
 * @extends React.AnchorHTMLAttributes<HTMLAnchorElement>
 * @property {string} [className] - Optional CSS class name for the logo container.
 * @property {'xs' | 's' | 'm' | 'l' | 'xl'} [size='m'] - The size of the logo.
 * @property {React.CSSProperties} [style] - Optional inline styles for the logo container.
 * @property {boolean} [wordmark=true] - If true, the wordmark part of the logo is displayed.
 * @property {boolean} [icon=true] - If true, the icon part of the logo is displayed.
 * @property {string} [iconSrc] - The URL for a custom icon image, which overrides the default CSS-based icon.
 * @property {string} [wordmarkSrc] - The URL for a custom wordmark image, which overrides the default CSS-based wordmark.
 * @property {string} [href] - If provided, the logo will be rendered as a link.
 */
interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    style?: React.CSSProperties;
    wordmark?: boolean;
    icon?: boolean;
    iconSrc?: string;
    wordmarkSrc?: string;
    href?: string;
}

/**
 * @name Logo
 * @description
 * A component for displaying a logo. It can consist of a default CSS-styled icon
 * and wordmark, or use custom images provided via `iconSrc` and `wordmarkSrc`.
 * It can be rendered as a static element or a link.
 * @param {LogoProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered Logo component.
 * @example
 * <Logo href="/" size="l" />
 * <Logo iconSrc="/custom-icon.svg" wordmark={false} />
 */
const Logo: React.FC<LogoProps> = ({
    size = 'm',
    wordmark = true,
    icon = true,
    href,
    iconSrc,
    wordmarkSrc,
    className,
    style,
    ...props
}) => {
    useEffect(() => {
        if (!icon && !wordmark) {
            console.warn("Both 'icon' and 'wordmark' props are set to false. The logo will not render any content.");
        }
    }, [icon, wordmark]);

    const content = (
        <>
            {icon && !iconSrc && (
                <div
                    style={{ height: `var(--static-space-${sizeMap[size]})` }}
                    className={styles.icon}
                />
            )}
            {iconSrc && (
                <img
                    style={{ height: `var(--static-space-${sizeMap[size]})`, width: 'auto' }}
                    alt="Trademark"
                    src={iconSrc}
                />
            )}
            {wordmark && !wordmarkSrc && (
                <div
                    style={{ height: `var(--static-space-${sizeMap[size]})` }}
                    className={styles.type}
                />
            )}
            {wordmarkSrc && (
                <img
                    style={{ height: `var(--static-space-${sizeMap[size]})`, width: 'auto'}}
                    alt="Trademark"
                    src={wordmarkSrc}
                />
            )}
        </>
    );

    return href ? (
        <Link
            className={classNames('radius-l', 'flex', className)}
            style={{ height: 'fit-content', ...style }}
            href={href}
            aria-label="Trademark"
            {...props}>
            {content}
        </Link>
    ) : (
        <Flex
            className={classNames('radius-l', 'flex', className)}
            style={{ height: 'fit-content', ...style }}
            aria-label="Trademark">
            {content}
        </Flex>
    );
};

Logo.displayName = 'Logo';
export { Logo };