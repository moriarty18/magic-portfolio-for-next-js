'use client';

import React, { forwardRef, ReactNode } from 'react';
import { IconButton, Button, Icon, Flex, Text } from '.';

/**
 * @interface FeedbackProps
 * @description Defines the props for the Feedback component.
 * @property {'info' | 'danger' | 'warning' | 'success'} [variant='info'] - The style and semantic variant of the feedback message.
 * @property {boolean} [icon] - If true, displays an icon corresponding to the variant.
 * @property {string} [title] - The title of the feedback message.
 * @property {string} [description] - The main text content of the feedback message.
 * @property {boolean} [showCloseButton=false] - If true, displays a close button.
 * @property {() => void} [onClose] - Callback function invoked when the close button is clicked.
 * @property {React.ComponentProps<typeof Button>} [actionButtonProps] - Props to render an action Button within the feedback component.
 * @property {string} [className] - Optional CSS class name for the feedback container.
 * @property {React.CSSProperties} [style] - Optional inline styles for the feedback container.
 * @property {ReactNode} [children] - Custom content to render inside the feedback component.
 */
interface FeedbackProps {
    variant?: 'info' | 'danger' | 'warning' | 'success';
    icon?: boolean;
    title?: string;
    description?: string;
    showCloseButton?: boolean;
    onClose?: () => void;
    actionButtonProps?: React.ComponentProps<typeof Button>;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
}

const variantIconMap: {
    [key in 'info' | 'danger' | 'warning' | 'success']: string } = {
    info: 'infoCircle',
    danger: 'errorCircle',
    warning: 'warningTriangle',
    success: 'checkCircle'
};

/**
 * @name Feedback
 * @description
 * A component for displaying contextual feedback messages (alerts) to the user.
 * It is accessible, with `role="alert"` and `aria-live="assertive"`, and can be
 * configured with different variants, an icon, a title, a description, and actions.
 * @param {FeedbackProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered Feedback component.
 */
const Feedback = forwardRef<HTMLDivElement, FeedbackProps>(({
    variant = 'info',
    icon,
    title,
    description,
    showCloseButton = false,
    onClose,
    actionButtonProps,
    className,
    style,
    children,
    ...props
}, ref) => {
    return (
        <Flex
            fillWidth
            radius="l"
            ref={ref}
            borderStyle="solid-1"
            border={`${variant}-medium`}
            background={`${variant}-medium`}
            role="alert"
            aria-live="assertive"
            className={className}
            style={style}
            {...props}>
            {icon &&
                <Flex
                    paddingY="16" paddingLeft="16"
                    alignItems="flex-start">
                    <Flex
                        padding="4"
                        radius="m" border={`${variant}-medium`} borderStyle="solid-1">
                        <Icon
                            onBackground={`${variant}-medium`}
                            name={variantIconMap[variant]}
                            aria-hidden="true"/>
                    </Flex>
                </Flex>
            }
            <Flex
                fillWidth
                padding="16"
                gap="24"
                justifyContent="center"
                direction="column">
                {(title || description) &&
                    <Flex
                        direction="column"
                        fillWidth
                        gap="4">
                        {title && (
                            <Flex
                                fillWidth
                                gap="16">
                                <Flex
                                    fillWidth
                                    paddingY="4">
                                    <Text
                                        variant="heading-strong-m"
                                        onBackground={`${variant}-medium`}
                                        role="heading"
                                        aria-level={2}>
                                        {title}
                                    </Text>
                                </Flex>
                                {showCloseButton && (
                                    <IconButton
                                        onClick={onClose}
                                        icon="close"
                                        size="m"
                                        tooltip="Hide"
                                        tooltipPosition="top"
                                        variant="ghost"
                                        aria-label="Close alert"/>
                                )}
                            </Flex>
                        )}
                        {description &&
                            <Flex
                                fillWidth>
                                <Text
                                    variant="body-default-s"
                                    onBackground={`${variant}-strong`}>
                                    {description}
                                </Text>
                            </Flex>
                        }
                    </Flex>
                }
                {children}
                {actionButtonProps && (
                    <Flex
                        paddingBottom="4"
                        gap="8">
                        <Button
                            {...actionButtonProps}/>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
});

Feedback.displayName = 'Feedback';
export { Feedback };