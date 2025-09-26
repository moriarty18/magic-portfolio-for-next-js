'use client';

import { useState, useEffect } from 'react';
import { Flex, ToggleButton, Scroller } from '.';

/**
 * @interface ButtonOption
 * @description Defines the structure for a single button option within the SegmentedControl.
 * @property {React.ReactNode} [label] - The text or content to display for the button.
 * @property {string} value - A unique value identifying the button.
 * @property {string} [prefixIcon] - An optional icon to display before the label.
 * @property {string} [suffixIcon] - An optional icon to display after the label.
 * @property {string} [className] - Optional CSS class name for the button.
 */
interface ButtonOption {
    label?: React.ReactNode;
    value: string;
    prefixIcon?: string;
    suffixIcon?: string;
    className?: string;
}

/**
 * @interface SegmentedControlProps
 * @description Defines the props for the SegmentedControl component.
 * @property {ButtonOption[]} buttons - An array of button option objects to render.
 * @property {(selected: string) => void} onToggle - A callback function invoked with the `value` of the selected button.
 * @property {string} [defaultSelected] - The `value` of the button that should be selected by default (uncontrolled).
 * @property {string} [selected] - The `value` of the currently selected button (controlled).
 * @property {string} [className] - Optional CSS class name for the component's container.
 * @property {React.CSSProperties} [style] - Optional inline styles for the component's container.
 */
interface SegmentedControlProps {
    buttons: ButtonOption[];
    onToggle: (selected: string) => void;
    defaultSelected?: string;
    selected?: string;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * @name SegmentedControl
 * @description
 * A component that displays a set of buttons in a row, allowing a user to
 * select one option from the set. It can be used as a controlled or uncontrolled
 * component and is wrapped in a `Scroller` to handle overflow.
 * @param {SegmentedControlProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered SegmentedControl component.
 * @example
 * const options = [
 *   { label: 'Option 1', value: 'one' },
 *   { label: 'Option 2', value: 'two' },
 * ];
 *
 * <SegmentedControl buttons={options} onToggle={(value) => console.log(value)} />
 */
const SegmentedControl: React.FC<SegmentedControlProps> = ({
    buttons,
    onToggle,
    defaultSelected,
    selected,
    className,
    style,
}) => {
    const [internalSelected, setInternalSelected] = useState<string>(() => {
        if (selected !== undefined) return selected;
        if (defaultSelected !== undefined) return defaultSelected;
        return buttons[0]?.value || '';
    });

    useEffect(() => {
        if (selected !== undefined) {
            setInternalSelected(selected);
        }
    }, [selected]);

    const handleButtonClick = (clickedButton: ButtonOption) => {
        const newSelected = clickedButton.value;
        setInternalSelected(newSelected);
        onToggle(newSelected);
    };

    const selectedIndex = buttons.findIndex(
        button => button.value === internalSelected
    );

    return (
        <Flex
            fillWidth
            minWidth={0}
            position="relative"
            className={className}
            style={style}
        >
            <Flex
                fillWidth
                position="relative"
                overflowX="hidden"
                overflowY="hidden"
            >
                <Scroller contained={true} direction="row">
                    <Flex fillWidth gap="2">
                        {buttons.map((button, index) => {
                            let label: string | undefined;
                            let children: React.ReactNode = undefined;

                            if (typeof button.label === 'string') {
                                label = button.label;
                            } else {
                                children = button.label;
                            }

                            return (
                                <ToggleButton
                                    key={button.value}
                                    label={label}
                                    value={button.value}
                                    selected={index === selectedIndex}
                                    onClick={() => handleButtonClick(button)}
                                    prefixIcon={button.prefixIcon}
                                    suffixIcon={button.suffixIcon}
                                    width="fill"
                                    aria-pressed={index === selectedIndex}
                                >
                                    {children}
                                </ToggleButton>
                            );
                        })}
                    </Flex>
                </Scroller>
            </Flex>
        </Flex>
    );
};

SegmentedControl.displayName = 'SegmentedControl';

export { SegmentedControl };
export type { SegmentedControlProps, ButtonOption };