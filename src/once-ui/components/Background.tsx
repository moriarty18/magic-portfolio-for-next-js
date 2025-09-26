'use client';

import React, { CSSProperties, forwardRef, useEffect, useRef, useState } from 'react';
import { SpacingToken } from '../types';

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<T | null>).current = value;
    }
}

export interface MaskOptions {
    none: 'none';
    cursor: 'cursor';
    topLeft: 'topLeft';
    topRight: 'topRight';
    bottomLeft: 'bottomLeft';
    bottomRight: 'bottomRight';
}

type MaskType = keyof MaskOptions;

/**
 * @interface BackgroundProps
 * @description Defines the props for the Background component.
 * @property {CSSProperties['position']} [position='fixed'] - The CSS position of the background layers.
 * @property {GradientProps} [gradient] - Configuration for the gradient effect.
 * @property {DotsProps} [dots] - Configuration for the dots effect.
 * @property {LinesProps} [lines] - Configuration for the lines effect.
 * @property {MaskType} [mask='none'] - The type of mask to apply to the background effects.
 * @property {string} [className] - Optional CSS class name for the background layers.
 * @property {React.CSSProperties} [style] - Optional inline styles for the background layers.
 */
export interface BackgroundProps {
    position?: CSSProperties['position'];
    gradient?: GradientProps;
    dots?: DotsProps;
    lines?: LinesProps;
    mask?: MaskType;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * @interface GradientProps
 * @description Defines the props for the gradient background effect.
 * @property {boolean} [display] - Whether to display the gradient effect.
 * @property {number} [opacity] - The opacity of the gradient effect.
 */
export interface GradientProps {
    display?: boolean;
    opacity?: number;
}

/**
 * @interface DotsProps
 * @description Defines the props for the dots background effect.
 * @property {boolean} [display] - Whether to display the dots effect.
 * @property {number} [opacity] - The opacity of the dots effect.
 * @property {string} [color] - The color of the dots.
 * @property {SpacingToken} [size] - The size and spacing of the dots from the spacing tokens.
 */
export interface DotsProps {
    display?: boolean;
    opacity?: number;
    color?: string;
    size?: SpacingToken;
}

/**
 * @interface LinesProps
 * @description Defines the props for the lines background effect.
 * @property {boolean} [display] - Whether to display the lines effect.
 * @property {number} [opacity] - The opacity of the lines effect.
 * @property {SpacingToken} [size] - The size and spacing of the lines.
 */
export interface LinesProps {
    display?: boolean;
    opacity?: number;
    size?: SpacingToken;
}

/**
 * @name Background
 * @description
 * A component that renders a layered, decorative background with optional effects
 * like gradients, dots, and lines. It also supports various masking options,
 * including a dynamic mask that follows the user's cursor.
 * @param {BackgroundProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered Background component.
 */
const Background = forwardRef<HTMLDivElement, BackgroundProps>(
    ({
        position = 'fixed',
        gradient = {},
        dots = {},
        lines = {},
        mask = 'none',
        className,
        style
    }, forwardedRef) => {
        const dotsColor = dots.color ?? 'brand-on-background-weak';
        const dotsSize = dots.size ?? '16';

        const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
        const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
        const maskSize = 1200;
        const backgroundRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            setRef(forwardedRef, backgroundRef.current);
        }, [forwardedRef]);

        useEffect(() => {
            const handleMouseMove = (event: MouseEvent) => {
                if (backgroundRef.current) {
                    const rect = backgroundRef.current.getBoundingClientRect();
                    setCursorPosition({
                        x: event.clientX - rect.left,
                        y: event.clientY - rect.top,
                    });
                }
            };

            document.addEventListener('mousemove', handleMouseMove);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
            };
        }, []);

        useEffect(() => {
            let animationFrameId: number;

            const updateSmoothPosition = () => {
                setSmoothPosition((prev) => {
                    const dx = cursorPosition.x - prev.x;
                    const dy = cursorPosition.y - prev.y;
                    const easingFactor = 0.05;

                    return {
                        x: Math.round(prev.x + dx * easingFactor),
                        y: Math.round(prev.y + dy * easingFactor),
                    };
                });
                animationFrameId = requestAnimationFrame(updateSmoothPosition);
            };

            if (mask === 'cursor') {
                animationFrameId = requestAnimationFrame(updateSmoothPosition);
            }

            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }, [cursorPosition, mask]);

        const commonStyles: CSSProperties = {
            position,
            top: '0',
            left: '0',
            zIndex: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            ...style,
        };

        const maskStyle = (): CSSProperties => {
            switch (mask) {
                case 'none':
                    return { maskImage: 'none' };
                case 'cursor':
                    return {
                        maskImage: `radial-gradient(circle ${maskSize / 2}px at ${smoothPosition.x}px ${smoothPosition.y}px, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                        maskSize: '100% 100%',
                    };
                case 'topLeft':
                    return {
                        maskImage: `radial-gradient(circle ${maskSize / 2}px at 0% 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                        maskSize: '100% 100%',
                    };
                case 'topRight':
                    return {
                        maskImage: `radial-gradient(circle ${maskSize / 2}px at 100% 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                        maskSize: '100% 100%',
                    };
                case 'bottomLeft':
                    return {
                        maskImage: `radial-gradient(circle ${maskSize / 2}px at 0% 100%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                        maskSize: '100% 100%',
                    };
                case 'bottomRight':
                    return {
                        maskImage: `radial-gradient(circle ${maskSize / 2}px at 100% 100%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                        maskSize: '100% 100%',
                    };
                default:
                    return {};
            }
        };

        return (
            <>
                {gradient.display && (
                    <div
                        ref={backgroundRef}
                        className={className}
                        style={{
                            ...commonStyles,
                            opacity: gradient.opacity,
                            background: 'radial-gradient(100% 100% at 50% 0%, var(--static-transparent) 0%, var(--page-background) 100%), radial-gradient(90% 80% at 10% 20%, var(--brand-background-medium) 0%, var(--static-transparent) 100%), radial-gradient(200% 120% at 50% 0%, var(--accent-solid-medium) 0%, var(--static-transparent) 100%)',
                            ...maskStyle(),
                        }}
                    />
                )}
                {dots.display && (
                    <div
                        ref={backgroundRef}
                        className={className}
                        style={{
                            ...commonStyles,
                            opacity: dots.opacity,
                            backgroundImage: `radial-gradient(var(--${dotsColor}) 0.5px, var(--static-transparent) 1px)`,
                            backgroundSize: `var(--static-space-${dotsSize}) var(--static-space-${dotsSize})`,
                            ...maskStyle(),
                        }}
                    />
                )}
                {lines.display && (
                    <div
                        ref={backgroundRef}
                        className={className}
                        style={{
                            ...commonStyles,
                            opacity: lines.opacity,
                            backgroundImage: `repeating-linear-gradient(45deg, var(--brand-on-background-weak) 0, var(--brand-on-background-weak) 0.5px, var(--static-transparent) 0.5px, var(--static-transparent) ${dots.size})`,
                            ...maskStyle(),
                        }}
                    />
                )}
            </>
        );
    }
);

Background.displayName = 'Background';

export { Background };