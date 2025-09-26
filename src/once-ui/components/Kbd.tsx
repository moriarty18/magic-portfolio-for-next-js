'use client';

import React, { ReactNode, forwardRef, HTMLAttributes } from 'react';

import { Text } from '.';
import classNames from 'classnames';
import styles from './Kbd.module.scss';

/**
 * @interface KbdProps
 * @description Defines the props for the Kbd component.
 * @extends React.HTMLAttributes<HTMLElement>
 * @property {string} [label] - The text to display inside the key. Can also be provided as children.
 * @property {React.ReactNode} [children] - The content to display inside the key.
 * @property {string} [className] - Optional CSS class name for the component.
 * @property {React.CSSProperties} [style] - Optional inline styles for the component.
 */
/**
 * @interface KbdProps
 * @description Defines the props for the Kbd component.
 * @extends React.HTMLAttributes<HTMLElement>
 * @property {string} [label] - The text to display inside the key. Can also be provided as children.
 * @property {React.ReactNode} [children] - The content to display inside the key.
 * @property {string} [className] - Optional CSS class name for the component.
 * @property {React.CSSProperties} [style] - Optional inline styles for the component.
 */
interface KbdProps extends HTMLAttributes<HTMLElement> {
    label?: string;
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * @name Kbd
 * @description
 * A component that renders its children inside a styled `<kbd>` element,
 * representing a keyboard key or user input.
 * @param {KbdProps} props - The props for the component.
 * @param {React.Ref<HTMLElement>} ref - A ref for the component's root kbd element.
 * @returns {React.ReactElement} The rendered Kbd component.
 * @example
 * <p>Press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy.</p>
 */
const Kbd = forwardRef<HTMLElement, KbdProps>(({
    label,
    children,
    className,
    style,
    ...props
}, ref) => (
    <kbd
        ref={ref}
        className={classNames(styles.kbd, className)}
        style={style}
        {...props}>
        <Text
            as="span"
            variant="label-default-s">
            {label || children}
        </Text>
    </kbd>
));

Kbd.displayName = 'Kbd';

export { Kbd };
export type { KbdProps };