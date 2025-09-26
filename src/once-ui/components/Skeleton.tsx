'use client';

import React, { forwardRef} from 'react';
import classNames from 'classnames';

import styles from './Skeleton.module.scss';

/**
 * @interface SkeletonProps
 * @description Defines the props for the Skeleton component.
 * @property {'line' | 'circle' | 'block'} shape - The shape of the skeleton placeholder.
 * @property {'xl' | 'l' | 'm' | 's' | 'xs'} [width] - The width of the skeleton placeholder, based on t-shirt sizes.
 * @property {'xl' | 'l' | 'm' | 's' | 'xs'} [height] - The height of the skeleton placeholder, based on t-shirt sizes.
 * @property {'1' | '2' | '3' | '4' | '5' | '6'} [delay] - An optional animation delay, useful for creating staggered loading effects.
 * @property {React.CSSProperties} [style] - Optional inline styles for the skeleton container.
 * @property {string} [className] - Optional CSS class name for the skeleton container.
 */
/**
 * @interface SkeletonProps
 * @description Defines the props for the Skeleton component.
 * @property {'line' | 'circle' | 'block'} shape - The shape of the skeleton placeholder.
 * @property {'xl' | 'l' | 'm' | 's' | 'xs'} [width] - The width of the skeleton placeholder, based on t-shirt sizes.
 * @property {'xl' | 'l' | 'm' | 's' | 'xs'} [height] - The height of the skeleton placeholder, based on t-shirt sizes.
 * @property {'1' | '2' | '3' | '4' | '5' | '6'} [delay] - An optional animation delay, useful for creating staggered loading effects.
 * @property {React.CSSProperties} [style] - Optional inline styles for the skeleton container.
 * @property {string} [className] - Optional CSS class name for the skeleton container.
 */
interface SkeletonProps {
    shape: 'line' | 'circle' | 'block';
    width?: 'xl' | 'l' | 'm' | 's' | 'xs';
    height?: 'xl' | 'l' | 'm' | 's' | 'xs';
    delay? : '1' | '2' | '3' | '4' | '5' | '6';
    style?: React.CSSProperties;
    className?: string;
}

/**
 * @name Skeleton
 * @description
 * A component used to display a placeholder preview of content while it is loading.
 * It provides a better user experience by indicating that content is on its way.
 * @param {SkeletonProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered Skeleton component.
 * @example
 * <Skeleton shape="circle" width="xl" height="xl" />
 * <Skeleton shape="line" width="l" />
 */
const Skeleton: React.FC<SkeletonProps> = forwardRef<HTMLDivElement, SkeletonProps>(({
    shape = 'line',
    width,
    height,
    delay,
    style,
    className
}, ref) => {
    return (
        <div
            ref={ref}
            style={style}
            className={classNames(
                styles.skeleton,
                styles[shape],
                width && styles['w-' + width],
                height && styles['h-' + height],
                delay && styles['delay-' + delay],
                className
            )}/>
    );
});

Skeleton.displayName = 'Skeleton';

export { Skeleton };