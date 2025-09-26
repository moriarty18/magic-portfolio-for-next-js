'use client';

import React, { useState, useEffect, forwardRef } from 'react';
import { SpacingToken } from '../types';
import styles from './RevealFx.module.scss';
import { Flex } from '.';

/**
 * @interface RevealFxProps
 * @description Defines the props for the RevealFx component.
 * @extends React.ComponentProps<typeof Flex>
 * @property {React.ReactNode} children - The content to be revealed.
 * @property {'slow' | 'medium' | 'fast'} [speed='medium'] - The speed of the reveal animation.
 * @property {number} [delay=0] - The delay in seconds before the animation starts.
 * @property {boolean} [revealedByDefault=false] - If true, the component is visible by default without animation.
 * @property {number | SpacingToken} [translateY] - The vertical distance the component will travel during the reveal.
 * @property {boolean} [trigger] - An external boolean to manually trigger the reveal animation.
 * @property {React.CSSProperties} [style] - Optional inline styles for the component's container.
 * @property {string} [className] - Optional CSS class name for the component's container.
 */
/**
 * @interface RevealFxProps
 * @description Defines the props for the RevealFx component.
 * @extends React.ComponentProps<typeof Flex>
 * @property {React.ReactNode} children - The content to be revealed.
 * @property {'slow' | 'medium' | 'fast'} [speed='medium'] - The speed of the reveal animation.
 * @property {number} [delay=0] - The delay in seconds before the animation starts.
 * @property {boolean} [revealedByDefault=false] - If true, the component is visible by default without animation.
 * @property {number | SpacingToken} [translateY] - The vertical distance the component will travel during the reveal.
 * @property {boolean} [trigger] - An external boolean to manually trigger the reveal animation.
 * @property {React.CSSProperties} [style] - Optional inline styles for the component's container.
 * @property {string} [className] - Optional CSS class name for the component's container.
 */
interface RevealFxProps extends React.ComponentProps<typeof Flex> {
	children: React.ReactNode;
	speed?: 'slow' | 'medium' | 'fast';
	delay?: number;
	revealedByDefault?: boolean;
	translateY?: number | SpacingToken;
	trigger?: boolean;
	style?: React.CSSProperties;
	className?: string;
}

/**
 * @name RevealFx
 * @description
 * A component that applies a "reveal" animation to its children, making them
 * slide into view from a translated position. The animation can be delayed
 * or controlled externally with a trigger.
 * @param {RevealFxProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered component with the reveal effect.
 * @example
 * <RevealFx delay={0.5} translateY={20}>
 *   <p>This will slide in from below.</p>
 * </RevealFx>
 */
const RevealFx = forwardRef<HTMLDivElement, RevealFxProps>(({
	children,
	speed = 'medium',
	delay = 0,
	revealedByDefault = false,
	translateY,
	trigger,
	style,
	className,
	...rest
}, ref) => {
	const [isRevealed, setIsRevealed] = useState(revealedByDefault);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsRevealed(true);
		}, delay * 1000);

		return () => clearTimeout(timer);
	}, [delay]);

	useEffect(() => {
		if (trigger !== undefined) {
			setIsRevealed(trigger);
		}
	}, [trigger]);

	const getSpeedDuration = () => {
		switch (speed) {
			case 'fast':
				return '1s';
			case 'medium':
				return '2s';
			case 'slow':
				return '3s';
			default:
				return '2s';
		}
	};

	const getTranslateYValue = () => {
		if (typeof translateY === 'number') {
			return `${translateY}rem`;
		} else if (typeof translateY === 'string') {
			return `var(--static-space-${translateY})`;
		}
		return undefined;
	};

	const translateValue = getTranslateYValue();

	const combinedClassName = `${styles.revealFx} ${isRevealed ? styles.revealed : styles.hidden} ${className || ''}`;

	const revealStyle: React.CSSProperties = {
		transitionDuration: getSpeedDuration(),
		transform: isRevealed ? 'translateY(0)' : `translateY(${translateValue})`,
		...style,
	};

	return (
		<Flex
			fillWidth
			justifyContent="center"
			ref={ref}
			aria-hidden="true"
			style={revealStyle}
			className={combinedClassName}
			{...rest}>
			{children}
		</Flex>
	);
});

RevealFx.displayName = 'RevealFx';
export { RevealFx };