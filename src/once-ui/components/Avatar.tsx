'use client';

import React, { forwardRef } from 'react';

import { Skeleton, Icon, Text, StatusIndicator, Flex, SmartImage } from '.';
import styles from './Avatar.module.scss';

/**
 * @interface AvatarProps
 * @description Defines the props for the Avatar component.
 * @property {'xs' | 's' | 'm' | 'l' | 'xl'} [size='m'] - The size of the avatar.
 * @property {string} [value] - The initials to display if no `src` is provided. Cannot be used with `src`.
 * @property {string} [src] - The URL of the image to display. Cannot be used with `value`.
 * @property {boolean} [loading] - If true, displays a skeleton loader.
 * @property {boolean} [empty] - If true, displays a generic person icon.
 * @property {{color: 'green' | 'yellow' | 'red' | 'gray'}} [statusIndicator] - An optional status indicator to display on the avatar.
 * @property {React.CSSProperties} [style] - Optional inline styles for the avatar container.
 * @property {string} [className] - Optional CSS class name for the avatar container.
 */
interface AvatarProps {
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    value?: string;
    src?: string;
    loading?: boolean;
    empty?: boolean;
    statusIndicator?: {
        color: 'green' | 'yellow' | 'red' | 'gray';
    };
    style?: React.CSSProperties;
    className?: string;
}

const sizeMapping: Record<'xs' | 's' | 'm' | 'l' | 'xl', number> = {
    xs: 20,
    s: 24,
    m: 32,
    l: 48,
    xl: 160,
};

const statusIndicatorSizeMapping: Record<'xs' | 's' | 'm' | 'l' | 'xl', 's' | 'm' | 'l'> = {
    xs: 's',
    s: 's',
    m: 'm',
    l: 'm',
    xl: 'l',
};

/**
 * @name Avatar
 * @description
 * A component to display a user's avatar. It can render an image from a URL,
 * user initials, or a default icon. It also supports loading and empty states,
 * and can display an optional status indicator.
 * @param {AvatarProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered Avatar component.
 * @throws {Error} If both `value` and `src` props are provided.
 */
const Avatar: React.FC<AvatarProps> = forwardRef<HTMLDivElement, AvatarProps>(({
    size = 'm',
    value,
    src,
    loading,
    empty,
    statusIndicator,
    style,
    className
}, ref) => {
    const isEmpty = empty || (!src && !value);

    if (value && src) {
        throw new Error("Avatar cannot have both 'value' and 'src' props.");
    }

    if (loading) {
        return (
            <Skeleton
                style={{border: '1px solid var(--neutral-border-medium)'}}
                shape="circle"
                width={size}
                height={size}
                className={`${styles.avatar} ${className}`}
                aria-busy="true"
                aria-label="Loading avatar"/>
        );
    }

    const renderContent = () => {
        if (isEmpty) {
            return <Icon
                onBackground="neutral-medium"
                name="person"
                size={size as 'xs' | 's' | 'm' | 'l' | 'xl'}
                className={styles.icon}
                aria-label="Empty avatar"/>;
        }

        if (src) {
            return (
                <SmartImage
                    radius="full"
                    src={src}
                    fill
                    alt="Avatar"
                    sizes={`${sizeMapping[size]}px`}
                    className={styles.image}/>
            );
        }

        if (value) {
            return (
                <Text
                    as="span"
                    onBackground="neutral-weak"
                    variant={`body-default-${size}`}
                    className={styles.value}
                    aria-label={`Avatar with initials ${value}`}>
                    {value}
                </Text>
            );
        }

        return null;
    };

    return (
        <Flex
            ref={ref}
            role="img"
            position="relative"
            justifyContent="center" alignItems="center"
            radius="full" border="neutral-strong" borderStyle="solid-1" background="surface"
            style={style}
            className={`${styles.avatar} ${styles[size]} ${className || ''}`}>
            {renderContent()}
            {statusIndicator && (
                <StatusIndicator
                    size={statusIndicatorSizeMapping[size]}
                    color={statusIndicator.color}
                    className={`${styles.className || ''} ${styles.indicator} ${size === 'xl' ? styles.position : ''}`}
                    aria-label={`Status: ${statusIndicator.color}`}/>
            )}
        </Flex>
    );
});

Avatar.displayName = 'Avatar';

export { Avatar };
export type { AvatarProps };