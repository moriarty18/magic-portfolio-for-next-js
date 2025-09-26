'use client';

import React, { useState, useRef, useCallback, useEffect, forwardRef, ReactNode } from 'react';
import classNames from 'classnames';

const defaultAllowedCharacters = ['X', '$', '@', 'a', 'H', 'z', 'o', '0', 'y', '#', '?', '*', '0', '1', '+'];

/**
 * @name getRandomCharacter
 * @description A utility function to get a random character from a given character set.
 * @param {string[]} charset - The array of characters to choose from.
 * @returns {string} A single random character.
 */
function getRandomCharacter(charset: string[]): string {
	const randomIndex = Math.floor(Math.random() * charset.length);
	return charset[randomIndex];
}

/**
 * @name createEventHandler
 * @description A factory function that creates the main animation handler for the text scramble effect. It returns an async function that, when called, performs the animation loop.
 * @param {string} originalText - The original text to reveal.
 * @param {React.Dispatch<React.SetStateAction<string>>} setText - The state setter for the displayed text.
 * @param {boolean} inProgress - A flag to prevent multiple animations from running simultaneously.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setInProgress - The state setter for the `inProgress` flag.
 * @param {'fast' | 'medium' | 'slow'} speed - The speed of the animation.
 * @param {string[]} charset - The character set for the scrambling effect.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} [setHasAnimated] - Optional state setter to track if the animation has run (for 'instant' trigger).
 * @returns {() => Promise<void>} An async function that triggers the animation.
 */
function createEventHandler(
	originalText: string,
	setText: React.Dispatch<React.SetStateAction<string>>,
	inProgress: boolean,
	setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
	speed: 'fast' | 'medium' | 'slow',
	charset: string[],
	setHasAnimated?: React.Dispatch<React.SetStateAction<boolean>>
) {
	const speedSettings = {
		fast: { BASE_DELAY: 10, REVEAL_DELAY: 10, INITIAL_RANDOM_DURATION: 100 },
		medium: { BASE_DELAY: 30, REVEAL_DELAY: 30, INITIAL_RANDOM_DURATION: 300 },
		slow: { BASE_DELAY: 60, REVEAL_DELAY: 60, INITIAL_RANDOM_DURATION: 600 }
	};

	const { BASE_DELAY, REVEAL_DELAY, INITIAL_RANDOM_DURATION } = speedSettings[speed];

	const generateRandomText = () =>
		originalText
		.split('')
		.map((char) => (char === ' ' ? ' ' : getRandomCharacter(charset)))
		.join('');

	return async () => {
		if (inProgress) return;

		setInProgress(true);

		let randomizedText = generateRandomText();
		const endTime = Date.now() + INITIAL_RANDOM_DURATION;

		while (Date.now() < endTime) {
			setText(randomizedText);
			await new Promise((resolve) => setTimeout(resolve, BASE_DELAY));
			randomizedText = generateRandomText();
		}

		for (let i = 0; i < originalText.length; i++) {
			await new Promise((resolve) => setTimeout(resolve, REVEAL_DELAY));
			setText(
				`${originalText.substring(0, i + 1)}${randomizedText.substring(i + 1)}`
			);
		}

		setInProgress(false);
		if (setHasAnimated) {
			setHasAnimated(true);
		}
	};
}

/**
 * @interface LetterFxProps
 * @description Defines the props for the LetterFx component.
 * @property {ReactNode} children - The text content to be animated. Must be a string.
 * @property {'hover' | 'instant' | 'custom'} [trigger='hover'] - How the animation is triggered. 'instant' runs once on load, 'hover' runs on mouse over, 'custom' requires using the `onTrigger` callback.
 * @property {'fast' | 'medium' | 'slow'} [speed='medium'] - The speed of the reveal animation.
 * @property {string[]} [charset] - An optional array of characters to use for the scrambling effect.
 * @property {(triggerFn: () => void) => void} [onTrigger] - A callback function that receives the animation trigger function. Used when `trigger` is 'custom'.
 * @property {string} [className] - Optional CSS class name for the component's container.
 * @property {React.CSSProperties} [style] - Optional inline styles for the component's container.
 */
type LetterFxProps = {
	children: ReactNode;
	trigger?: 'hover' | 'instant' | 'custom';
	speed?: 'fast' | 'medium' | 'slow';
	charset?: string[];
	onTrigger?: (triggerFn: () => void) => void;
	className?: string;
	style?: React.CSSProperties;
};

/**
 * @name LetterFx
 * @description
 * A component that applies a "scrambling" or "decoding" animation effect to a string of text.
 * @param {LetterFxProps} props - The props for the component.
 * @param {React.Ref<HTMLSpanElement>} ref - A ref for the component's root span element.
 * @returns {React.ReactElement} The rendered component with the text effect.
 * @example
 * <LetterFx speed="fast">Hello World</LetterFx>
 * <LetterFx trigger="instant">Animate this on load</LetterFx>
 */
const LetterFx = forwardRef<HTMLSpanElement, LetterFxProps>(({
	children,
	trigger = 'hover',
	speed = 'medium',
	charset = defaultAllowedCharacters,
	onTrigger,
	className,
	style,
}, ref) => {
	const [text, setText] = useState<string>(typeof children === 'string' ? children : '');
	const [inProgress, setInProgress] = useState<boolean>(false);
	const [hasAnimated, setHasAnimated] = useState<boolean>(false);
	const originalText = useRef<string>(typeof children === 'string' ? children : '');

	const eventHandler = useCallback(createEventHandler(
		originalText.current,
		setText,
		inProgress,
		setInProgress,
		speed,
		charset,
		trigger === 'instant' ? setHasAnimated : undefined
	), [inProgress, trigger, speed, charset]);

	useEffect(() => {
		if (typeof children === 'string') {
			setText(children);
			originalText.current = children;

			if (trigger === 'instant' && !hasAnimated) {
				eventHandler();
			}
		}
	}, [children, trigger, eventHandler, hasAnimated]);

	useEffect(() => {
		if (trigger === 'custom' && onTrigger) {
			onTrigger(eventHandler);
		}
	}, [trigger, onTrigger, eventHandler]);

	return (
		<span
			ref={ref}
			className={classNames(className)}
			style={style}
			onMouseOver={trigger === 'hover' ? eventHandler : undefined}
		>
			{text}
		</span>
	);
});

LetterFx.displayName = 'LetterFx';

export { LetterFx };