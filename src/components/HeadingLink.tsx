"use client";

import React, { useState, useCallback } from 'react';
import { Heading, Flex, IconButton, Toaster } from '@/once-ui/components';

import styles from '@/components/HeadingLink.module.scss';

/**
 * @name HeadingLinkProps
 * @description
 * Props for the HeadingLink component.
 * @property {string} id - The ID of the heading, used for the anchor link.
 * @property {1 | 2 | 3 | 4 | 5 | 6} level - The heading level (1-6).
 * @property {React.ReactNode} children - The content of the heading.
 * @property {React.CSSProperties} [style] - Optional inline styles for the component.
 */
interface HeadingLinkProps {
    id: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

/**
 * @name HeadingLink
 * @description
 * A component that renders a heading with a clickable link to copy the URL with the heading's ID as a hash.
 * It shows a toast notification on success or failure of copying the link.
 * @param {HeadingLinkProps} props - The props for the component.
 * @returns {React.ReactElement} - The rendered component.
 */
export const HeadingLink: React.FC<HeadingLinkProps> = ({
    id,
    level,
    children,
    style
}) => {
    const [toasts, setToasts] = useState<
        { id: string; variant: 'success' | 'danger'; message: string; action?: React.ReactNode }[]
    >([]);

    const addToast = useCallback(
        (variant: 'success' | 'danger', message: string, action?: React.ReactNode) => {
            const id = `${new Date().getTime()}`;
            setToasts((prevToasts) => [...prevToasts, { id, variant, message, action }]);
        },
        []
    );

    const removeToast = useCallback(
        (id: string) => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
        },
        []
    );

    const copyURL = (id: string): void => {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(url).then(() => {
            addToast('success', 'Link copied to clipboard.');
        }, () => {
            addToast('danger', 'Failed to copy link.');
        });
    };

    const variantMap = {
        1: 'heading-strong-xl',
        2: 'heading-strong-xl',
        3: 'heading-strong-l',
        4: 'heading-strong-m',
        5: 'heading-strong-s',
        6: 'heading-strong-xs',
    } as const;

    const variant = variantMap[level];
    const asTag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <Flex>
            <Toaster toasts={toasts} removeToast={removeToast}/>
            <Flex
                style={style}
                onClick={() => copyURL(id)}
                className={styles.control}
                alignItems="center"
                gap="4">
                <Heading
                    className={styles.text}
                    id={id}
                    variant={variant}
                    as={asTag}>
                    {children}
                </Heading>
                <IconButton
                    className={styles.visibility}
                    size="s"
                    icon="openLink"
                    variant="ghost"
                    tooltip="Copy"
                    tooltipPosition="right" />
            </Flex>
        </Flex>
    );
};