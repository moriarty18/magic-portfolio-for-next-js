'use client';

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import classNames from 'classnames';
import { DropdownWrapper, Input, InputProps } from '.';
import { DropdownOptions } from '.';
import inputStyles from './Input.module.scss';

/**
 * @interface SelectProps
 * @description Defines the props for the Select component.
 * @extends Omit<InputProps, 'onSelect' | 'value'>
 * @property {DropdownOptions[]} options - An array of option objects to be displayed in the dropdown.
 * @property {string} value - The currently selected value, which should correspond to the `value` of one of the options.
 * @property {React.CSSProperties} [style] - Optional inline styles for the select input.
 * @property {(option: DropdownOptions) => void} onSelect - A callback function invoked with the selected option object when an option is chosen.
 * @property {(option: DropdownOptions) => React.ReactNode} [renderDropdownOptions] - An optional function to customize the rendering of each option in the dropdown.
 * @property {() => React.ReactNode} [renderCustomDropdownContent] - An optional function to render custom content inside the dropdown, separate from the options.
 */
/**
 * @interface SelectProps
 * @description Defines the props for the Select component.
 * @extends Omit<InputProps, 'onSelect' | 'value'>
 * @property {DropdownOptions[]} options - An array of option objects to be displayed in the dropdown.
 * @property {string} value - The currently selected value, which should correspond to the `value` of one of the options.
 * @property {React.CSSProperties} [style] - Optional inline styles for the select input.
 * @property {(option: DropdownOptions) => void} onSelect - A callback function invoked with the selected option object when an option is chosen.
 * @property {(option: DropdownOptions) => React.ReactNode} [renderDropdownOptions] - An optional function to customize the rendering of each option in the dropdown.
 * @property {() => React.ReactNode} [renderCustomDropdownContent] - An optional function to render custom content inside the dropdown, separate from the options.
 */
interface SelectProps extends Omit<InputProps, 'onSelect' | 'value'> {
    options: DropdownOptions[];
    value: string;
    style?: React.CSSProperties;
    onSelect: (option: DropdownOptions) => void;
    renderDropdownOptions?: (option: DropdownOptions) => React.ReactNode;
    renderCustomDropdownContent?: () => React.Node;
}

/**
 * @name Select
 * @description
 * A custom select component that provides a styled and accessible dropdown menu for selections.
 * It is built on top of the `Input` and `DropdownWrapper` components.
 * @param {SelectProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root wrapper element.
 * @returns {React.ReactElement} The rendered Select component.
 */
const Select = forwardRef<HTMLDivElement, SelectProps>(({
    options,
    value,
    style,
    onSelect,
    renderDropdownOptions,
    renderCustomDropdownContent,
    ...inputProps
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(!!value);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        setIsDropdownOpen(true);
        if (inputProps.onFocus) inputProps.onFocus(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (!selectRef.current?.contains(event.relatedTarget as Node)) {
            setIsDropdownOpen(false);
        }
        if (value || event.target.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
        if (inputProps.onBlur) inputProps.onBlur(event);
    };

    const handleSelect = (option: DropdownOptions) => {
        onSelect(option);
        setIsDropdownOpen(false);
        setIsFilled(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <DropdownWrapper
            ref={selectRef}
            dropdownOptions={options}
            dropdownProps={{
                onOptionSelect: handleSelect
            }}
            renderCustomDropdownContent={renderCustomDropdownContent}>
            <Input
                {...inputProps}
                style={{ cursor: 'pointer', textOverflow: 'ellipsis', ...style }}
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                readOnly
                className={classNames({
                    [inputStyles.filled]: isFilled,
                    [inputStyles.focused]: isFocused,
                })}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
            />
        </DropdownWrapper>
    );
});

Select.displayName = 'Select';

export { Select };
export type { SelectProps };