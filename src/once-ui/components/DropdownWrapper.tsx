'use client';

import React, { useState, useRef, useEffect, ReactNode, forwardRef, useImperativeHandle } from 'react';
import { useFloating, shift, offset, flip, size, autoUpdate } from '@floating-ui/react-dom';
import { Flex, Dropdown, DropdownProps, DropdownOptions } from '.';
import styles from './Select.module.scss';
import classNames from 'classnames';

/**
 * @interface DropdownWrapperProps
 * @description Defines the props for the DropdownWrapper component.
 * @property {ReactNode} children - The trigger element that, when clicked, will open the dropdown.
 * @property {DropdownOptions[]} dropdownOptions - An array of option objects to be passed to the Dropdown.
 * @property {Omit<DropdownProps, 'options'> & { onOptionSelect?: (option: DropdownOptions) => void }} [dropdownProps] - Props to be passed down to the underlying `Dropdown` component.
 * @property {string} [selectedOption] - The value of the currently selected option, used to highlight it in the dropdown.
 * @property {React.CSSProperties} [style] - Optional inline styles for the wrapper container.
 * @property {string} [className] - Optional CSS class name for the wrapper container.
 * @property {() => ReactNode} [renderCustomDropdownContent] - An optional function to render custom, non-option content inside the dropdown.
 */
interface DropdownWrapperProps {
    children: ReactNode;
    dropdownOptions: DropdownOptions[];
    dropdownProps?: Omit<DropdownProps, 'options'> & { onOptionSelect?: (option: DropdownOptions) => void };
    selectedOption?: string;
    style?: React.CSSProperties;
    className?: string;
    renderCustomDropdownContent?: () => ReactNode;
}

/**
 * @name DropdownWrapper
 * @description
 * A higher-order component that wraps a trigger element and a `Dropdown`. It manages
 * the visibility and positioning of the dropdown using `@floating-ui/react-dom`. It
 * handles opening the dropdown on click, and closing it on outside clicks or when the
 * Escape key is pressed.
 * @param {DropdownWrapperProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root wrapper element.
 * @returns {React.ReactElement} The rendered DropdownWrapper with its trigger and the conditionally rendered dropdown.
 */
const DropdownWrapper = forwardRef<HTMLDivElement, DropdownWrapperProps>(({
    children,
    dropdownOptions,
    dropdownProps = {},
    selectedOption,
    style,
    className,
    renderCustomDropdownContent,
}, ref) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const {
        x,
        y,
        strategy,
        refs,
        update,
    } = useFloating({
        placement: 'bottom-start',
        middleware: [
            offset(4),
            flip(),
            shift(),
            size({
                apply({ availableWidth, availableHeight, elements }) {
                    Object.assign(elements.floating.style, {
                        maxWidth: `${availableWidth}px`,
                        maxHeight: `${availableHeight}px`,
                    });
                },
            }),
        ],
        whileElementsMounted: autoUpdate,
    });

    useImperativeHandle(ref, () => wrapperRef.current as HTMLDivElement);

    useEffect(() => {
        if (wrapperRef.current) {
            refs.setReference(wrapperRef.current);
        }
    }, [refs]);

    useEffect(() => {
        if (isDropdownOpen) {
            update();
            
            if (dropdownRef.current && selectedOption) {
                const selectedElement = dropdownRef.current.querySelector(`[data-value="${selectedOption}"]`);
                if (selectedElement) {
                    selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            }
        }
    }, [isDropdownOpen, update, selectedOption]);

    const setDropdownRef = (node: HTMLDivElement | null) => {
        dropdownRef.current = node;
        refs.setFloating(node);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            setDropdownOpen(false);
        }
    };

    const stopPropagation = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
    };

    const {
        onOptionSelect = () => {},
        ...restDropdownProps
    } = dropdownProps;

    return (
        <Flex
            style={{
                WebkitTapHighlightColor: 'transparent',
                ...style
            }}
            className={className}
            position="relative"
            ref={wrapperRef}
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}>
            {children}
            {isDropdownOpen && (
                <Flex
                    zIndex={1}
                    className={classNames(styles.dropdown, styles.fadeIn)}
                    ref={setDropdownRef}
                    style={{
                        minWidth: '100%',
                        position: strategy,
                        top: Math.round(y) + 'px',
                        left: Math.round(x) + 'px',
                    }}>
                    <Dropdown
                        options={dropdownOptions}
                        onOptionSelect={(option) => {
                            onOptionSelect(option);
                            setDropdownOpen(false);
                        }}
                        {...restDropdownProps}
                        selectedOption={selectedOption}>
                        {renderCustomDropdownContent && (
                            <div
                                onClick={stopPropagation}
                                onKeyDown={stopPropagation}>
                                {renderCustomDropdownContent()}
                            </div>
                        )}
                    </Dropdown>
                </Flex>
            )}
        </Flex>
    );
});

DropdownWrapper.displayName = 'DropdownWrapper';

export { DropdownWrapper };