'use client';

import React, { ReactNode, useEffect, useCallback, useRef, forwardRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Flex, Heading, IconButton, Button, ButtonProps, Text } from '.';
import styles from './Dialog.module.scss';

/**
 * @interface DialogButtonProps
 * @description Defines the props for a button within the Dialog component's footer.
 * @extends Partial<ButtonProps>
 * @property {string} label - The text label for the button.
 * @property {React.MouseEventHandler<HTMLButtonElement>} [onClick] - The callback function to execute when the button is clicked.
 */
interface DialogButtonProps extends Partial<ButtonProps> {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * @interface DialogProps
 * @description Defines the props for the Dialog component.
 * @property {boolean} isOpen - Controls whether the dialog is open or closed.
 * @property {() => void} onClose - The callback function to call when the dialog should be closed (e.g., via the close button or Escape key).
 * @property {ReactNode} title - The title to be displayed in the dialog's header.
 * @property {ReactNode} [description] - An optional description to display below the title.
 * @property {ReactNode} children - The main content to be rendered inside the dialog.
 * @property {DialogButtonProps} [primaryButtonProps] - Props for the primary action button.
 * @property {DialogButtonProps} [secondaryButtonProps] - Props for the secondary action button.
 * @property {DialogButtonProps} [dangerButtonProps] - Props for the danger action button.
 * @property {React.CSSProperties} [style] - Optional inline styles for the dialog overlay.
 * @property {string} [className] - Optional CSS class name for the dialog overlay.
 */
interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: ReactNode;
    description?: ReactNode;
    children: ReactNode;
    primaryButtonProps?: DialogButtonProps;
    secondaryButtonProps?: DialogButtonProps;
    dangerButtonProps?: DialogButtonProps;
    style?: React.CSSProperties;
    className?: string;
}

/**
 * @name Dialog
 * @description
 * An accessible modal dialog component that renders into a portal. It traps focus
 * within the dialog and can be closed by pressing the Escape key or clicking the
 * close button.
 * @param {DialogProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the dialog's overlay element.
 * @returns {React.ReactPortal | null} The rendered Dialog component as a portal, or null if not open.
 */
const Dialog: React.FC<DialogProps> = forwardRef<HTMLDivElement, DialogProps>(({
    isOpen,
    onClose,
    title,
    description,
    children,
    primaryButtonProps,
    secondaryButtonProps,
    dangerButtonProps,
    style,
    className
}, ref) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(isOpen);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            const timeout = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
        if (event.key === 'Tab' && dialogRef.current) {
            const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    useEffect(() => {
        if (isOpen && dialogRef.current) {
            const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            firstElement.focus();
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return ReactDOM.createPortal(
        <Flex
            ref={ref}
            className={classNames(styles.overlay, className, { [styles.open]: isAnimating })}
            style={style}
            justifyContent="center"
            alignItems="center"
            padding="l"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title">
            <Flex
                style={{ maxHeight: '100%' }}
                className={classNames(styles.dialog, { [styles.open]: isAnimating })}
                ref={dialogRef}
                fillWidth
                radius="xl"
                border="neutral-medium"
                borderStyle="solid-1"
                background="neutral-weak"
                direction="column">
                <Flex
                    as="header"
                    direction="column"
                    paddingX="24"
                    paddingTop="24"
                    paddingBottom="s"
                    gap="4">
                    <Flex
                        fillWidth
                        justifyContent="space-between"
                        gap="8">
                        <Heading
                            id="dialog-title"
                            variant="heading-strong-l">
                            {title}
                        </Heading>
                        <IconButton
                            icon="close"
                            size="m"
                            variant="tertiary"
                            tooltip="Close"
                            onClick={onClose} />
                    </Flex>
                    {description && (
                        <Text
                            variant="body-default-s"
                            onBackground="neutral-weak">
                            {description}
                        </Text>
                    )}
                </Flex>
                <Flex
                    as="section"
                    paddingX="24" paddingBottom="24"
                    overflowY="auto"
                    direction="column">
                    {children}
                </Flex>
                {(primaryButtonProps || secondaryButtonProps || dangerButtonProps) && (
                    <Flex
                        style={{
                            borderTop: '1px solid var(--neutral-border-medium)'
                        }}
                        as="footer"
                        justifyContent="space-between"
                        padding="12">
                            {dangerButtonProps ? (
                                <Button
                                    {...dangerButtonProps}/>
                            ) : <div/>
                        }
                        <Flex gap="8">
                            {secondaryButtonProps && (
                                <Button
                                    {...secondaryButtonProps}/>
                            )}
                            {primaryButtonProps && (
                                <Button
                                    {...primaryButtonProps}/>
                            )}
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>,
        document.body
    );
});

Dialog.displayName = 'Dialog';

export { Dialog };