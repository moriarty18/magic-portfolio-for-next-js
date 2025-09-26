'use client';

import React, { useState, useEffect, forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Flex, Text } from '.';
import styles from './Input.module.scss';

/**
 * @interface InputProps
 * @description Defines the props for the Input component.
 * @extends React.InputHTMLAttributes<HTMLInputElement>
 * @property {string} id - A unique identifier for the input, used to link the label and description.
 * @property {string} label - The label for the input, which can act as a floating label or a placeholder.
 * @property {'s' | 'm'} [height='m'] - The height of the input field.
 * @property {React.ReactNode} [error] - An error message to display below the input, which also applies an error style.
 * @property {React.ReactNode} [description] - A description or helper text to display below the input.
 * @property {string} [radius] - Custom CSS `border-radius` value for the input container.
 * @property {string} [className] - Optional CSS class name for the component's wrapper.
 * @property {React.ReactNode} [hasPrefix] - An element to render as a prefix inside the input container.
 * @property {React.ReactNode} [hasSuffix] - An element to render as a suffix inside the input container.
 * @property {boolean} [labelAsPlaceholder=false] - If true, the `label` is used as a placeholder instead of a floating label.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    height?: 's' | 'm';
    error?: React.ReactNode;
    description?: React.ReactNode;
    radius?: string;
    className?: string;
    hasPrefix?: React.ReactNode;
    hasSuffix?: React.ReactNode;
    labelAsPlaceholder?: boolean;
}

/**
 * @name Input
 * @description
 * A styled and accessible text input component that supports floating labels,
 * placeholders, prefix/suffix elements, error states, and helper text.
 * @param {InputProps} props - The props for the component.
 * @param {React.Ref<HTMLInputElement>} ref - A ref for the underlying input element.
 * @returns {React.ReactElement} The rendered Input component.
 * @example
 * <Input
 *   id="username"
 *   label="Username"
 *   description="Enter your unique username."
 *   error={isError ? "Username is already taken." : undefined}
 *   hasPrefix={<Icon name="person" />}
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({
    id,
    label,
    height = 'm',
    error,
    description,
    radius,
    className,
    hasPrefix,
    hasSuffix,
    labelAsPlaceholder = false,
    children,
    onFocus,
    onBlur,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(!!props.value);

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (event.target.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
        if (onBlur) onBlur(event);
    };

    useEffect(() => {
        setIsFilled(!!props.value);
    }, [props.value]);

    const inputClassNames = classNames(styles.input, 'font-body', 'font-default', 'font-m', {
        [styles.filled]: isFilled,
        [styles.focused]: isFocused,
        [styles.withPrefix]: hasPrefix,
        [styles.withSuffix]: hasSuffix,
        [styles.labelAsPlaceholder]: labelAsPlaceholder,
        [styles.hasChildren]: children,
    });

    return (
        <div className={classNames(styles.wrapper, className, { [styles.error]: error })}>
            <div className={classNames(styles.base, { [styles.s]: height === 's'}, { [styles.m]: height === 'm'})}
                style={{borderRadius: radius}}>
                { hasPrefix && (
                    <Flex
                        paddingLeft="12"
                        className={styles.prefix}>
                        {hasPrefix}
                    </Flex>
                )}
                <div className={styles.content}>
                    <input
                        {...props}
                        ref={ref}
                        id={id}
                        placeholder={labelAsPlaceholder ? label : props.placeholder}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={inputClassNames}
                        aria-describedby={error ? `${id}-error` : undefined}
                        aria-invalid={!!error}
                    />
                    { !labelAsPlaceholder && (
                        <Text
                            as="label"
                            variant="label-default-m"
                            htmlFor={id}
                            className={classNames(styles.label, styles.inputLabel, {
                                [styles.floating]: isFocused || isFilled,
                            })}>
                            {label}
                        </Text>
                    )}
                    { children && (
                        <div className={styles.children}>
                            {children}
                        </div>
                    )}
                </div>
                { hasSuffix && (
                    <Flex
                        paddingRight="12"
                        className={styles.suffix}>
                        {hasSuffix}
                    </Flex>
                )}
            </div>
            { error && (
                <Flex paddingX="16">
                    <Text
                        as="span"
                        id={`${id}-error`}
                        variant="body-default-s"
                        onBackground="danger-weak">
                        {error}
                    </Text>
                </Flex>
            )}
            { description && (
                <Flex paddingX="16">
                    <Text
                        as="span"
                        id={`${id}-description`}
                        variant="body-default-s"
                        onBackground="neutral-weak">
                        {description}
                    </Text>
                </Flex>
            )}
        </div>
    );
});

Input.displayName = "Input";

export { Input };
export type { InputProps };