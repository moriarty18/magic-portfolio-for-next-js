'use client';

import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';
import { iconLibrary } from '../icons';
import { ColorScheme, ColorWeight } from '../types';

const sizeMap: Record<string, string> = {
    xs: 'var(--static-space-16)',
    s: 'var(--static-space-20)',
    m: 'var(--static-space-24)',
    l: 'var(--static-space-32)',
    xl: 'var(--static-space-40)',
};

/**
 * @interface IconProps
 * @description Defines the props for the Icon component.
 * @property {string} name - The name of the icon to render, which must exist as a key in the `iconLibrary`.
 * @property {`${ColorScheme}-${ColorWeight}`} [onBackground] - The color of the icon when placed on a standard background.
 * @property {`${ColorScheme}-${ColorWeight}`} [onSolid] - The color of the icon when placed on a solid background.
 * @property {'xs' | 's' | 'm' | 'l' | 'xl'} [size='m'] - The size of the icon.
 * @property {boolean} [decorative=true] - If true, the icon is treated as decorative and hidden from screen readers. If false, it's treated as semantic and its name is used as the `aria-label`.
 * @property {string} [className] - Optional CSS class name for the icon's container.
 * @property {React.CSSProperties} [style] - Optional inline styles for the icon's container.
 */
type IconProps = {
    name: string;
    onBackground?: `${ColorScheme}-${ColorWeight}`;
    onSolid?: `${ColorScheme}-${ColorWeight}`;
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    decorative?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

/**
 * @name Icon
 * @description
 * A component that renders an SVG icon from a centralized library. It allows for easy
 * customization of size and color, and provides accessibility options.
 * @param {IconProps} props - The props for the component.
 * @param {React.Ref<HTMLSpanElement>} ref - A ref for the component's root span element.
 * @returns {React.ReactElement | null} The rendered Icon component, or null if the icon name is not found.
 * @example
 * <Icon name="home" size="l" onBackground="brand-strong" />
 */
const Icon = forwardRef<HTMLDivElement, IconProps>(({
    name,
    onBackground,
    onSolid,
    size = 'm',
    decorative = true,
    className,
    style,
}, ref) => {
    const IconComponent: IconType | undefined = iconLibrary[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" does not exist in the library.`);
        return null;
    }

    if (onBackground && onSolid) {
        console.warn("You cannot use both 'onBackground' and 'onSolid' props simultaneously. Only one will be applied.");
    }

    let colorClass = 'color-inherit';

    if (onBackground) {
        const [scheme, weight] = onBackground.split('-') as [ColorScheme, ColorWeight];
        colorClass = `${scheme}-on-background-${weight}`;
    } else if (onSolid) {
        const [scheme, weight] = onSolid.split('-') as [ColorScheme, ColorWeight];
        colorClass = `${scheme}-on-solid-${weight}`;
    }

    return (
        <span
            ref={ref}
            className={classNames(colorClass, className)}
            style={{ display: 'contents', fontSize: sizeMap[size], ...style }}
            role={decorative ? "presentation" : undefined}
            aria-hidden={decorative ? "true" : undefined}
            aria-label={decorative ? undefined : name}>
            <IconComponent />
        </span>
    );
});

Icon.displayName = 'Icon';

export { Icon };