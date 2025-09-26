'use client';

import React, { useState, useRef, useEffect, KeyboardEvent, ReactNode, forwardRef, HTMLAttributes, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { Flex, Text } from '.';
import styles from './Dropdown.module.scss';

/**
 * @interface DropdownOptions
 * @description Defines the structure for a single option within the Dropdown component.
 * @property {React.ReactNode} label - The main content to display for the option.
 * @property {string} value - A unique value identifying the option.
 * @property {React.ReactNode} [hasPrefix] - An optional element to display before the label.
 * @property {React.ReactNode} [hasSuffix] - An optional element to display after the label.
 * @property {React.ReactNode} [description] - An optional description to display below the label.
 * @property {boolean} [dividerAfter] - If true, a divider is rendered after this option.
 * @property {boolean} [danger] - If true, applies a danger style to the option (e.g., for destructive actions).
 */
interface DropdownOptions {
    label: React.ReactNode;
    value: string;
    hasPrefix?: React.ReactNode;
    hasSuffix?: React.ReactNode;
    description?: React.ReactNode;
    dividerAfter?: boolean;
    danger?: boolean;
}

/**
 * @interface DropdownProps
 * @description Defines the props for the Dropdown component.
 * @extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>
 * @property {DropdownOptions[]} options - An array of option objects to be rendered in the dropdown.
 * @property {string} [selectedOption] - The `value` of the currently selected option.
 * @property {(option: DropdownOptions) => void} onOptionSelect - Callback function invoked when an option is selected.
 * @property {string} [className] - Optional CSS class name for the dropdown container.
 * @property {ReactNode} [children] - Optional children to render at the top of the dropdown list.
 * @property {() => void} [onEscape] - Optional callback function invoked when the Escape key is pressed.
 */
interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    options: DropdownOptions[];
    selectedOption?: string;
    onOptionSelect: (option: DropdownOptions) => void;
    className?: string;
    children?: ReactNode;
    onEscape?: () => void;
}

/**
 * @name Dropdown
 * @description
 * A fully accessible dropdown menu component that supports keyboard navigation
 * (arrow keys, Enter, Escape) and type-ahead to find options. It is a low-level
 * component, typically used within a wrapper like `DropdownWrapper` to manage
 * visibility and positioning.
 * @param {DropdownProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered Dropdown component.
 */
const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
    options,
    selectedOption,
    onOptionSelect,
    className,
    children,
    onEscape,
    ...props
}, ref) => {
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [typedChars, setTypedChars] = useState<string>('');
    const internalRef = useRef<HTMLDivElement>(null);
    const typingTimeoutRef = useRef<number | null>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (focusedIndex === null) {
            setFocusedIndex(0);
        } else {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setFocusedIndex((prevIndex) => (prevIndex !== null && prevIndex < options.length - 1 ? prevIndex + 1 : 0));
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setFocusedIndex((prevIndex) => (prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : options.length - 1));
            } else if (event.key === 'Enter' && focusedIndex !== null) {
                onOptionSelect(options[focusedIndex]);
            } else if (/^[a-zA-Z0-9]$/.test(event.key)) {
                setTypedChars((prevChars) => prevChars + event.key);
            }
        }

        if (event.key === 'Escape') {
            if (onEscape) onEscape();
        }
    };

    const handleOptionClick = (option: DropdownOptions) => {
        onOptionSelect(option);
    };

    const handleOptionMouseEnter = (index: number) => {
        setFocusedIndex(index);
    };

    useEffect(() => {
        if (internalRef.current && focusedIndex !== null) {
            const focusedOption = internalRef.current.querySelectorAll<HTMLElement>('.' + styles.option)[focusedIndex];
            if (focusedOption) {
                focusedOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                focusedOption.focus();
            }
        }
    }, [focusedIndex]);

    useEffect(() => {
        if (typedChars.length > 0) {
            const matchIndex = options.findIndex(option => option.value.toLowerCase().startsWith(typedChars.toLowerCase()));
            if (matchIndex !== -1) {
                setFocusedIndex(matchIndex);
            }
            if (typingTimeoutRef.current !== null) {
                clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = window.setTimeout(() => {
                setTypedChars('');
            }, 500);
        }
    }, [typedChars, options]);

    useEffect(() => {
        if (internalRef.current && selectedOption !== undefined) {
            const selectedIndex = options.findIndex(option => option.value === selectedOption);
            if (selectedIndex !== -1) {
                setFocusedIndex(selectedIndex);
                const selectedOptionElement = internalRef.current.querySelectorAll<HTMLElement>('.' + styles.option)[selectedIndex];
                if (selectedOptionElement) {
                    selectedOptionElement.scrollIntoView({ behavior: 'auto', block: 'nearest' });
                }
            }
        }
    }, [selectedOption, options]);

    return (
        <Flex
            flex={1}
            overflowY="auto"
            direction="column"
            padding="4"
            border="neutral-medium"
            borderStyle="solid-1"
            radius="m-4"
            background="surface"
            gap="2"
            minWidth={12}
            className={classNames(styles.dropdown, className || '')}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            ref={internalRef}
            role="listbox"
            {...props}>
            {children}
            {options.map((option, index) => (
                <React.Fragment key={index}>
                    <Flex
                        alignItems="center"
                        paddingX="12"
                        paddingY="8"
                        gap="12"
                        radius="m"
                        role="option"
                        aria-selected={selectedOption === option.value}
                        className={classNames(styles.option, {
                            [styles.focused]: focusedIndex === index,
                            [styles.selected]: selectedOption === option.value,
                            [styles.danger]: option.danger,
                        })}
                        onClick={() => handleOptionClick(option)}
                        onMouseEnter={() => handleOptionMouseEnter(index)}
                        tabIndex={-1}
                        data-value={option.value}>
                        {option.hasPrefix && <Flex className={styles.prefix}>{option.hasPrefix}</Flex>}
                        <Flex style={{ whiteSpace: 'nowrap' }} direction="column" className={styles.optionText}>
                            <Text
                                onBackground="neutral-strong"
                                variant="label-default-s">
                                {option.label}
                            </Text>
                            {option.description && (
                                <Text
                                    variant="body-default-xs"
                                    onBackground="neutral-weak">
                                    {option.description}
                                </Text>
                            )}
                        </Flex>
                        {option.hasSuffix &&
                            <Flex className={styles.suffix}>
                                {option.hasSuffix}
                            </Flex>
                        }
                    </Flex>
                    {option.dividerAfter &&
                        <div className={styles.divider}/>
                    }
                </React.Fragment>
            ))}
        </Flex>
    );
});

Dropdown.displayName = 'Dropdown';

export { Dropdown };
export type { DropdownOptions, DropdownProps };