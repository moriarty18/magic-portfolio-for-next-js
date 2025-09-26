'use client';

import React, { forwardRef } from 'react';
import { Text, Flex, IconButton, IconButtonProps } from '.';

/**
 * @interface InteractiveDetailsProps
 * @description Defines the props for the InteractiveDetails component.
 * @property {string} [label] - The main label text to display.
 * @property {string} [description] - A description or helper text to display below the label.
 * @property {IconButtonProps} [iconButtonProps] - If provided, an info icon with a tooltip will be displayed next to the label using these props.
 * @property {() => void} onClick - A callback function to be invoked when the component is clicked.
 * @property {string} [className] - Optional CSS class name for the component's container.
 * @property {string} [id] - A unique identifier for the component, useful for `aria-labelledby`.
 */
/**
 * @interface InteractiveDetailsProps
 * @description Defines the props for the InteractiveDetails component.
 * @property {string} [label] - The main label text to display.
 * @property {string} [description] - A description or helper text to display below the label.
 * @property {IconButtonProps} [iconButtonProps] - If provided, an info icon with a tooltip will be displayed next to the label using these props.
 * @property {() => void} onClick - A callback function to be invoked when the component is clicked.
 * @property {string} [className] - Optional CSS class name for the component's container.
 * @property {string} [id] - A unique identifier for the component, useful for `aria-labelledby`.
 */
interface InteractiveDetailsProps {
    label?: string;
    description?: string;
    iconButtonProps?: IconButtonProps;
    onClick: () => void;
    className?: string;
    id?: string;
}

/**
 * @name InteractiveDetails
 * @description
 * A component designed to display a clickable label and description, often used
 * alongside form elements like checkboxes, radios, or switches. It can also include
 * a small help icon with a tooltip.
 * @param {InteractiveDetailsProps} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref for the component's root element.
 * @returns {React.ReactElement} The rendered InteractiveDetails component.
 */
const InteractiveDetails: React.FC<InteractiveDetailsProps> = forwardRef<HTMLDivElement, InteractiveDetailsProps>(({
    label,
    description,
    iconButtonProps,
    onClick,
    className,
    id,
}, ref) => {
    return (
        <Flex
            ref={ref}
            direction="column"
            className={className}
            onClick={onClick}
            id={id}>
            <Flex
                gap="4"
                alignItems="center">
                <Text
                    as="span"
                    variant="label-strong-m"
                    onBackground="neutral-strong">
                    {label}
                </Text>
                {iconButtonProps?.tooltip && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <IconButton
                            size='s'
                            variant='ghost'
                            icon='helpCircle'
                            {...iconButtonProps}/>
                    </div>
                )}
            </Flex>
            {description && (
                <Text
                    as="span"
                    variant="body-default-s"
                    onBackground="neutral-medium">
                    {description}
                </Text>
            )}
        </Flex>
    );
});

InteractiveDetails.displayName = 'InteractiveDetails';

export { InteractiveDetails };
export type { InteractiveDetailsProps };