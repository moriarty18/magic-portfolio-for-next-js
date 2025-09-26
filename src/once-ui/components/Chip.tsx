'use client';

import React, { ReactNode, HTMLAttributes, MouseEventHandler, forwardRef } from 'react';
import classNames from 'classnames';
import { Text, Icon, IconButton, IconButtonProps, Flex } from '.';
import styles from './Chip.module.scss';

/**
 * @interface ChipProps
 * @description Defines the props for the Chip component.
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @property {string} label - The text content to display within the chip.
 * @property {boolean} [selected=true] - Whether the chip is in a selected state, affecting its visual style.
 * @property {string} [prefixIcon] - The name of an icon to display at the start of the chip.
 * @property {() => void} [onRemove] - If provided, a remove button is displayed and this function is called when it's clicked.
 * @property {React.MouseEventHandler<HTMLDivElement>} [onClick] - A callback function to handle clicks on the chip.
 * @property {React.ReactNode} [children] - Custom content to render inside the chip, can be used as an alternative to `label`.
 * @property {Partial<IconButtonProps>} [iconButtonProps] - Optional props to customize the remove icon button.
 * @property {React.CSSProperties} [style] - Optional inline styles for the chip container.
 * @property {string} [className] - Optional CSS class name for the chip container.
 */
interface ChipProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    selected?: boolean;
    prefixIcon?: string;
    onRemove?: () => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
    children?: ReactNode;
    iconButtonProps?: Partial<IconButtonProps>;
    style?: React.CSSProperties;
    className?: string;
}

/**
 * @name Chip
 * @description
 * A compact element that represents an input, attribute, or action. It can be
 * selected, clicked, and removed. It is accessible and can be interacted with
 * using the keyboard.
 * @param {ChipProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered Chip component.
 */
const Chip: React.FC<ChipProps> = forwardRef<HTMLDivElement, ChipProps>(({
    label,
    selected = true,
    prefixIcon,
    onRemove,
    onClick,
    children,
    iconButtonProps = {},
    style,
    className,
    ...props
}, ref) => {
    const defaultIconButtonProps: IconButtonProps = {
        icon: "close",
        variant: "ghost",
        size: "s",
        tooltip: "Remove",
        onClick: (e) => {
            e.stopPropagation();
            if (onRemove) onRemove();
        }
    };

    const combinedIconButtonProps = {
        ...defaultIconButtonProps,
        ...iconButtonProps,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            defaultIconButtonProps.onClick?.(e);
            iconButtonProps.onClick?.(e);
        }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onClick) onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
    };

    return (
        <Flex
            ref={ref}
            alignItems="center"
            radius="full"
            paddingX="8"
            paddingY="4"
            role="button"
            tabIndex={0}
            aria-pressed={selected}
            className={classNames(styles.chip, className, {
                [styles.selected]: selected,
                [styles.unselected]: !selected,
            })}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            style={style}
            {...props}>
            {prefixIcon && 
                <Icon name={prefixIcon} size="s" />
            }
            <Flex
                paddingX="8"
                paddingY="2">
                <Text
                    variant="body-default-s">
                    {label || children}
                </Text>
            </Flex>
            {onRemove && (
                <IconButton style={{color: 'inherit'}}
                    {...combinedIconButtonProps}/>
            )}
        </Flex>
    );
});

Chip.displayName = 'Chip';

export { Chip };