import React, { forwardRef } from 'react';
import classNames from 'classnames';

import styles from './Spinner.module.scss';

/**
 * @interface SpinnerProps
 * @description Defines the props for the Spinner component.
 * @property {'xs' | 's' | 'm' | 'l' | 'xl'} [size='m'] - The size of the spinner.
 * @property {string} [ariaLabel='Loading'] - The ARIA label for accessibility, describing what is loading.
 * @property {string} [className] - Optional CSS class name for the spinner's container.
 * @property {React.CSSProperties} [style] - Optional inline styles for the spinner's container.
 */
/**
 * @interface SpinnerProps
 * @description Defines the props for the Spinner component.
 * @property {'xs' | 's' | 'm' | 'l' | 'xl'} [size='m'] - The size of the spinner.
 * @property {string} [ariaLabel='Loading'] - The ARIA label for accessibility, describing what is loading.
 * @property {string} [className] - Optional CSS class name for the spinner's container.
 * @property {React.CSSProperties} [style] - Optional inline styles for the spinner's container.
 */
interface SpinnerProps {
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * @name Spinner
 * @description
 * A component that displays a spinning loading indicator. It is accessible,
 * with a `role="status"` and a configurable `aria-label`.
 * @param {SpinnerProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered Spinner component.
 * @example
 * <Spinner size="l" ariaLabel="Loading search results..." />
 */
const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(({
    size = 'm',
    className,
    style,
    ariaLabel = 'Loading'
}, ref) => {
    return (
        <div
            ref={ref}
            className={classNames(styles.bounding, styles[size], className)}
            style={style}
            role="status"
            aria-label={ariaLabel}>
            <div className={styles.spinner} />
        </div>
    );
});

Spinner.displayName = 'Spinner';

export { Spinner };