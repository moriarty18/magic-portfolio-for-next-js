'use client';

import React, { forwardRef } from 'react';
import { Arrow, Flex, Icon, SmartLink, Text } from '.';

import styles from './Badge.module.scss'
import classNames from 'classnames';

/**
 * @interface BadgeProps
 * @description Defines the props for the Badge component.
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @property {string} [title] - The text content to display within the badge.
 * @property {string} [icon] - The name of the icon to display in the badge.
 * @property {boolean} [arrow=true] - Whether to display an animated arrow on hover.
 * @property {React.ReactNode} [children] - Custom content to render inside the badge.
 * @property {string} [href] - If provided, the badge will be rendered as a link (`<a>` tag).
 * @property {React.CSSProperties} [style] - Optional inline styles for the badge container.
 * @property {string} [className] - Optional CSS class name for the badge container.
 * @property {boolean} [effect=true] - Whether to enable the hover animation effect.
 */
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    icon?: string;
    arrow?: boolean;
    children?: React.ReactNode;
    href?: string;
    style?: React.CSSProperties;
    className?: string;
    effect?: boolean;
}

/**
 * @name Badge
 * @description
 * A component that displays a small, styled badge. It can contain a title, an icon,
 * and custom children. If an `href` is provided, it renders as a link; otherwise, it
 * renders as a `div`. It includes a hover effect and an animated arrow by default.
 * @param {BadgeProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement | HTMLAnchorElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered Badge component.
 */
const Badge = forwardRef<HTMLDivElement | HTMLAnchorElement, BadgeProps>(({
    title,
    icon,
    arrow = true,
    children,
    href,
    effect = true,
    style,
    className,
    ...props
}, ref) => {
    const commonProps = {
        style,
        className,
        children: (
            <Flex
                id="badge"
                paddingX="20" paddingY="12"
                className={classNames(styles.badge, effect && styles.animation)}
                alignItems="center"
                radius="full" background="neutral-weak" shadow="l">
                { icon && (
                    <Icon className="mr-8"
                        size="s"
                        name={icon}
                        onBackground="brand-medium"/>
                )}
                {title && (
                    <Text
                        onBackground="brand-strong"
                        variant="label-strong-s">
                        {title}
                    </Text>
                )}
                {children}
                { arrow && (
                    <Arrow trigger="#badge"/>
                )}
            </Flex>
        ),
    };

    if (href) {
        return (
            <SmartLink
                unstyled
                style={{borderRadius: 'var(--radius-full)'}}
                href={href}
                ref={ref as React.Ref<HTMLAnchorElement>}
                {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}>
                <Flex {...commonProps}/>
            </SmartLink>
        );
    }

    return (
        <Flex
            ref={ref as React.Ref<HTMLDivElement>}
            {...commonProps}
            {...props as React.HTMLAttributes<HTMLDivElement>}
        />
    );
});

Badge.displayName = 'Badge';
export { Badge };