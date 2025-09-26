import { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { ColorScheme, ColorWeight, RadiusNest, RadiusSize, ShadowSize, SpacingToken, TextSize, TextVariant, TextWeight } from "./types";

/**
 * @interface GridProps
 * @description Defines props for creating CSS grid layouts, with responsive options for tablet and mobile.
 */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
    columns?: number | string;
    rows?: number | string;
    tabletColumns?: '1col' | '2col' | '3col';
    mobileColumns?: '1col' | '2col' | '3col';
    tabletRows?: number | string;
    mobileRows?: number | string;
}

/**
 * @interface FlexProps
 * @description Defines props for creating CSS flexbox layouts, with responsive options for direction.
 */
export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    direction?: 'row' | 'column';
    justifyContent?: CSSProperties['justifyContent'];
    alignItems?: CSSProperties['alignItems'];
    wrap?: boolean;
    flex?: number;
    tabletDirection?: 'row' | 'column';
    mobileDirection?: 'row' | 'column';
}

/**
 * @interface TextProps
 * @description Defines props for text elements, allowing for semantic element changes and styling variants.
 * @template T - The HTML element type to render, defaults to 'span'.
 */
export interface TextProps<T extends ElementType = 'span'> extends HTMLAttributes<T> {
    as?: T;
    variant?: TextVariant;
    wrap?: CSSProperties['textWrap'];
    size?: TextSize;
    weight?: TextWeight;
}

/**
 * @interface SizeProps
 * @description Defines props for controlling the dimensions of an element.
 */
export interface SizeProps extends HTMLAttributes<HTMLDivElement> {
    width?: number | SpacingToken;
    height?: number | SpacingToken;
    maxWidth?: number | SpacingToken;
    minWidth?: number | SpacingToken;
    minHeight?: number | SpacingToken;
    maxHeight?: number | SpacingToken;
    fillWidth?: boolean;
    fillHeight?: boolean;
}

/**
 * @interface SpacingProps
 * @description Defines props for controlling padding, margin, and gap of an element using spacing tokens.
 */
export interface SpacingProps extends HTMLAttributes<HTMLDivElement> {
    padding?: SpacingToken;
    paddingLeft?: SpacingToken;
    paddingRight?: SpacingToken;
    paddingTop?: SpacingToken;
    paddingBottom?: SpacingToken;
    paddingX?: SpacingToken;
    paddingY?: SpacingToken;
    margin?: SpacingToken;
    marginLeft?: SpacingToken;
    marginRight?: SpacingToken;
    marginTop?: SpacingToken;
    marginBottom?: SpacingToken;
    marginX?: SpacingToken;
    marginY?: SpacingToken;
    gap?: SpacingToken;
}

/**
 * @interface StyleProps
 * @description Defines props for applying various visual styles like background, border, radius, and shadow.
 */
export interface StyleProps extends HTMLAttributes<HTMLDivElement> {
    textVariant?: TextVariant;
    textSize?: TextSize;
    textWeight?: TextWeight;
    background?: `${ColorScheme}-${ColorWeight}` | 'surface' | 'page' | 'transparent';
    alpha?: `${ColorScheme}-${ColorWeight}`;
    solid?: `${ColorScheme}-${ColorWeight}`;
    border?: `${ColorScheme}-${ColorWeight}` | 'surface' | 'transparent';
    borderStyle?: 'solid-1' | 'solid-2';
    radius?: RadiusSize | `${RadiusSize}-${RadiusNest}`;
    shadow?: ShadowSize;
}

/**
 * @interface ConditionalProps
 * @description Defines props for conditionally showing or hiding an element based on screen size breakpoints.
 */
export interface ConditionalProps extends HTMLAttributes<HTMLDivElement> {
    hide?: 's' | 'm' | 'l';
    show?: 's' | 'm' | 'l';
}

/**
 * @interface DisplayProps
 * @description Defines props for controlling CSS display properties like position, overflow, and z-index.
 */
export interface DisplayProps extends HTMLAttributes<HTMLDivElement> {
    as?: ElementType;
    position?: CSSProperties['position'];
    overflow?: CSSProperties['overflow'];
    overflowX?: CSSProperties['overflowX'];
    overflowY?: CSSProperties['overflowY'];
    zIndex?: CSSProperties['zIndex'];
}

/**
 * @interface CommonProps
 * @description Defines a set of common props shared across multiple components, including text alignment and custom styles.
 */
export interface CommonProps extends HTMLAttributes<HTMLDivElement> {
    onBackground?: `${ColorScheme}-${ColorWeight}`;
    onSolid?: `${ColorScheme}-${ColorWeight}`;
    align?: CSSProperties['textAlign'];
    className?: string;
    children?: ReactNode;
    style?: React.CSSProperties;
}