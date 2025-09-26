'use client';

import React, { forwardRef } from 'react';

import { Avatar, AvatarProps, Flex } from '.';
import styles from './AvatarGroup.module.scss';

/**
 * @interface AvatarGroupProps
 * @description Defines the props for the AvatarGroup component.
 * @property {AvatarProps[]} avatars - An array of `AvatarProps` objects to be displayed in the group.
 * @property {'xs' | 's' | 'm' | 'l' | 'xl'} [size='m'] - The size of the avatars in the group.
 * @property {boolean} [reverseOrder=false] - If true, reverses the stacking order (z-index) of the avatars.
 * @property {number} [limit] - The maximum number of avatars to display. If the total number of avatars exceeds the limit, a "+N" indicator is shown.
 * @property {string} [className] - Optional CSS class name for the avatar group container.
 * @property {React.CSSProperties} [style] - Optional inline styles for the avatar group container.
 */
interface AvatarGroupProps {
    avatars: AvatarProps[];
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    reverseOrder?: boolean;
    limit?: number;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * @name AvatarGroup
 * @description
 * A component that displays a group of overlapping avatars. It can limit the number
 * of avatars shown and display a count of the remaining ones.
 * @param {AvatarGroupProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered AvatarGroup component.
 */
const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(({
    avatars,
    size = 'm',
    reverseOrder = false,
    limit,
    className,
    style
}, ref) => {
    const displayedAvatars = limit ? avatars.slice(0, limit) : avatars;
    const remainingCount = limit && avatars.length > limit ? avatars.length - limit : 0;

    return (
        <Flex
            position="relative"
            alignItems="center"
            ref={ref}
            className={`${styles.avatarGroup} ${className || ''}`}
            style={style}
            zIndex={0}>
            {displayedAvatars.map((avatarProps, index) => (
                <Avatar
                    key={index}
                    size={size}
                    {...avatarProps}
                    className={styles.avatar}
                    style={{
                        ...avatarProps.style,
                        zIndex: reverseOrder ? displayedAvatars.length - index : index + 1
                    }}/>
            ))}
            {remainingCount > 0 && (
                <Avatar
                    value={`+${remainingCount}`}
                    className={styles.avatar}
                    size={size}
                    style={{
                        ...style,
                        zIndex: reverseOrder ?  -1 : displayedAvatars.length + 1
                    }}/>
            )}
        </Flex>
    );
});

AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup };
export type { AvatarGroupProps };