'use client';

import React, { useEffect, useState, forwardRef } from 'react';
import styles from './GlitchFx.module.scss';

/**
 * @interface GlitchFxProps
 * @description Defines the props for the GlitchFx component.
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @property {React.ReactNode} children - The content to which the glitch effect will be applied.
 * @property {'slow' | 'medium' | 'fast'} [speed='medium'] - The speed of the glitch animation.
 * @property {number} [interval=2500] - The time in milliseconds between glitches when `trigger` is 'custom'.
 * @property {'instant' | 'hover' | 'custom'} [trigger='instant'] - Defines how the glitch effect is activated.
 * @property {boolean} [continuous=true] - If true, the glitch effect runs continuously.
 * @property {React.CSSProperties} [style] - Optional inline styles for the component's container.
 * @property {string} [className] - Optional CSS class name for the component's container.
 */
interface GlitchFxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    speed?: 'slow' | 'medium' | 'fast';
    interval?: number;
    trigger?: 'instant' | 'hover' | 'custom';
    continuous?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

/**
 * @name GlitchFx
 * @description
 * A component that applies a CSS-based glitch visual effect to its children.
 * The effect's activation can be controlled to be instant, on hover, or at a custom interval.
 * @param {GlitchFxProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered component with the glitch effect.
 * @example
 * <GlitchFx trigger="hover" speed="fast">
 *   <p>Hover over me to see the glitch effect.</p>
 * </GlitchFx>
 */
const GlitchFx = forwardRef<HTMLDivElement, GlitchFxProps>(({
    children,
    speed = 'medium',
    interval = 2500,
    trigger = 'instant',
    continuous = true,
    style,
    className,
    ...rest
}, ref) => {
    const [isGlitching, setIsGlitching] = useState(continuous || trigger === 'instant');

    useEffect(() => {
        if (continuous || trigger === 'instant') {
            setIsGlitching(true);
        }
    }, [continuous, trigger]);

    const handleMouseEnter = () => {
        if (trigger === 'hover') {
            setIsGlitching(true);
        }
    };

    const handleMouseLeave = () => {
        if (trigger === 'hover') {
            setIsGlitching(false);
        }
    };

    const triggerGlitch = () => {
        if (trigger === 'custom') {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 500);
        }
    };

    useEffect(() => {
        if (trigger === 'custom') {
            const glitchInterval = setInterval(triggerGlitch, interval);
            return () => clearInterval(glitchInterval);
        }
    }, [trigger, interval]);

    const speedClass = styles[speed];

    const combinedClassName = `${styles.glitchFx} ${speedClass} ${isGlitching ? styles.active : ''} ${className || ''}`;

    return (
        <div
            ref={ref}
            style={style}
            className={combinedClassName}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...rest}>
            <div className={styles.original}>
                {children}
            </div>

            <div className={`${styles.glitchLayer} ${styles.blueShift}`}>
                {children}
            </div>

            <div className={`${styles.glitchLayer} ${styles.redShift}`}>
                {children}
            </div>
        </div>
    );
});

GlitchFx.displayName = 'GlitchFx';
export { GlitchFx };