'use client';

import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './Arrow.module.scss';
import { Flex } from '.';

/**
 * @interface ArrowProps
 * @description Defines the props for the Arrow component.
 * @property {string} trigger - A CSS selector for the element that will trigger the arrow's animation on hover.
 * @property {number} [scale=0.8] - The scale factor of the arrow.
 * @property {'onBackground' | 'onSolid'} [color='onBackground'] - The color theme of the arrow.
 * @property {React.CSSProperties} [style] - Optional inline styles for the arrow container.
 * @property {string} [className] - Optional CSS class name for the arrow container.
 */
interface ArrowProps {
    trigger: string;
    scale?: number;
    color?: 'onBackground' | 'onSolid';
    style?: React.CSSProperties;
    className?: string;
}

/**
 * @name Arrow
 * @description
 * A component that renders an animated arrow. The arrow becomes visible and animates
 * when the user hovers over a specified trigger element.
 * @param {ArrowProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered Arrow component.
 * @example
 * <Button id="my-button">
 *   Hover me
 *   <Arrow trigger="#my-button" />
 * </Button>
 */
const Arrow: React.FC<ArrowProps> = ({
    trigger,
    scale = 0.8,
    color = 'onBackground',
    style,
    className
}) => {
    const arrowContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const triggerElement = document.querySelector(trigger);

        if (triggerElement && arrowContainerRef.current) {
            const handleMouseOver = () => {
                arrowContainerRef.current?.classList.add(styles.active);
            };

            const handleMouseOut = () => {
                arrowContainerRef.current?.classList.remove(styles.active);
            };

            triggerElement.addEventListener('mouseenter', handleMouseOver);
            triggerElement.addEventListener('mouseleave', handleMouseOut);

            return () => {
                triggerElement.removeEventListener('mouseenter', handleMouseOver);
                triggerElement.removeEventListener('mouseleave', handleMouseOut);
            };
        }
    }, [trigger]);

    return (
        <Flex>
            <Flex ref={arrowContainerRef}
                position="relative" marginLeft="4"
                alignItems="center" justifyContent="flex-end"
                className={classNames(styles.arrowContainer, className)}
                style={{transform: `scale(${scale})`, ...style}}>
                <Flex className={classNames(styles.arrow, styles[color])} height={0.1}/>
                <Flex className={classNames(styles.arrowHead, styles[color])} height={0.0875}/>
                <Flex className={classNames(styles.arrowHead, styles[color])} height={0.0875}/>
            </Flex>
        </Flex>
    );
};

Arrow.displayName = 'Arrow';
export { Arrow };