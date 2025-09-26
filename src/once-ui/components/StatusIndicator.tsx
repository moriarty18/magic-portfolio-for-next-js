'use client';

import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './StatusIndicator.module.scss';

/**
 * @interface StatusIndicatorProps
 * @description Defines the props for the StatusIndicator component.
 * @property {'s' | 'm' | 'l'} size - The size of the status indicator.
 * @property {'green' | 'yellow' | 'red' | 'gray'} color - The color of the status indicator, representing a specific status.
 * @property {string} [ariaLabel] - An accessible label for the indicator, defaults to describing the color.
 * @property {string} [className] - Optional CSS class name for the indicator.
 * @property {React.CSSProperties} [style] - Optional inline styles for the indicator.
 */
interface StatusIndicatorProps {
    size: 's' | 'm' | 'l';
    color: 'green' | 'yellow' | 'red' | 'gray';
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * @name StatusIndicator
 * @description
 * A simple visual component used to indicate a status, such as online, away, or busy,
 * typically represented by a colored dot.
 * @param {StatusIndicatorProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered StatusIndicator component.
 * @example
 * <StatusIndicator size="m" color="green" ariaLabel="User is online" />
 */
const StatusIndicator = forwardRef<HTMLDivElement, StatusIndicatorProps>(({
    size,
    color,
    className,
    style,
    ariaLabel = `${color} status indicator`
}, ref) => {
    return (
        <div
            ref={ref}
            style={style}
            className={classNames(styles.statusIndicator, styles[size], styles[color], className)}
            aria-label={ariaLabel}/>
    );
});

StatusIndicator.displayName = 'StatusIndicator';

export { StatusIndicator };