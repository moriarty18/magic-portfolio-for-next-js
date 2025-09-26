'use client';

import React, { forwardRef, ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './InlineCode.module.scss';

/**
 * @interface InlineCodeProps
 * @description Defines the props for the InlineCode component.
 * @extends React.HTMLAttributes<HTMLSpanElement>
 * @property {React.ReactNode} children - The text or content to be styled as inline code.
 * @property {string} [className] - Optional CSS class name for the component's container.
 * @property {React.CSSProperties} [style] - Optional inline styles for the component's container.
 */
interface InlineCodeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * @name InlineCode
 * @description
 * A component for rendering text with the visual style of inline code. It is
 * typically used for short code snippets within a paragraph or other text block.
 * @param {InlineCodeProps} props - The props for the component.
 * @param {React.Ref<HTMLSpanElement>} ref - A ref for the component's root span element.
 * @returns {React.ReactElement} The rendered InlineCode component.
 * @example
 * <p>Use the <InlineCode>--font-code</InlineCode> variable to style your code.</p>
 */
const InlineCode = forwardRef<HTMLSpanElement, InlineCodeProps>(({ children, className, style, ...props }, ref) => {
    return (
        <span
            ref={ref}
            className={classNames(styles.inlineCode, className)}
            style={style}
            {...props}>
            {children}
        </span>
    );
});

InlineCode.displayName = 'InlineCode';

export { InlineCode };