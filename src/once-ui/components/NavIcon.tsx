'use client';

import React, { useState, forwardRef } from 'react';
import styles from './NavIcon.module.scss';
import { Flex } from '.';

/**
 * @interface NavIconProps
 * @description Defines the props for the NavIcon component.
 * @property {string} [className] - Optional CSS class name for the component's container.
 * @property {React.CSSProperties} [style] - Optional inline styles for the component's container.
 * @property {() => void} [onClick] - A callback function to be invoked when the icon is clicked.
 */
interface NavIconProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

/**
 * @name NavIcon
 * @description
 * An animated navigation icon, commonly known as a "hamburger" icon, that transforms
 * into a close (X) icon when clicked. It manages its own active state internally.
 * @param {NavIconProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered NavIcon component.
 */
const NavIcon = forwardRef<HTMLDivElement, NavIconProps>(({ className, style, onClick }, ref) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        if (onClick) {
            onClick();
        }
    };

    return (
        <Flex
            ref={ref}
            tabIndex={0}
            radius="m"
            position="relative"
            className={`${styles.button} ${className || ''}`}
            style={{ ...style }}
            onClick={handleClick}>
            <div className={`${styles.line} ${isActive ? `${styles.active}` : ''}`} />
            <div className={`${styles.line} ${isActive ? `${styles.active}` : ''}`} />
        </Flex>
    );
});

NavIcon.displayName = 'NavIcon';

export { NavIcon };