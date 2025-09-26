import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import React, { ReactNode } from 'react';

import { SmartImage, SmartLink, Text } from '@/once-ui/components';
import { CodeBlock } from '@/once-ui/modules';
import { HeadingLink } from '@/components';

import { TextProps } from '@/once-ui/interfaces';
import { SmartImageProps } from '@/once-ui/components/SmartImage';

/**
 * @name TableProps
 * @description
 * Props for the Table component.
 * @property {{ headers: string[]; rows: string[][] }} data - The data for the table, including headers and rows.
 */
type TableProps = {
    data: {
        headers: string[];
        rows: string[][];
    };
};

/**
 * @name Table
 * @description
 * A component that renders a simple HTML table from a data object.
 * @param {TableProps} props - The props for the component.
 * @returns {React.ReactElement} - The rendered table component.
 */
function Table({ data }: TableProps) {
    const headers = data.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ));
    const rows = data.rows.map((row, index) => (
        <tr key={index}>
        {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
        ))}
        </tr>
    ));

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

/**
 * @name CustomLinkProps
 * @description
 * Props for the CustomLink component.
 * @property {string} href - The URL for the link.
 * @property {ReactNode} children - The content of the link.
 */
type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: ReactNode;
};

/**
 * @name CustomLink
 * @description
 * A custom link component that handles internal, hash, and external links appropriately.
 * Internal links use Next.js's `SmartLink`, while external links open in a new tab.
 * @param {CustomLinkProps} props - The props for the component.
 * @returns {React.ReactElement} - The rendered link component.
 */
function CustomLink({ href, children, ...props }: CustomLinkProps) {
    if (href.startsWith('/')) {
        return (
            <SmartLink href={href} {...props}>
                {children}
            </SmartLink>
        );
    }

    if (href.startsWith('#')) {
        return <a href={href} {...props}>{children}</a>;
    }

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
        </a>
    );
}

/**
 * @name createImage
 * @description
 * A factory function to create a `SmartImage` component with default styling for use in MDX.
 * @param {SmartImageProps & { src: string }} props - The props for the SmartImage component, with `src` being mandatory.
 * @returns {React.ReactElement | null} - The rendered SmartImage component or null if src is missing.
 */
function createImage({ alt, src, ...props }: SmartImageProps & { src: string }) {
    if (!src) {
        console.error("SmartImage requires a valid 'src' property.");
        return null;
    }

    return (
        <SmartImage
            className="my-20"
            enlarge
            radius="m"
            aspectRatio="16 / 9"
            alt={alt}
            src={src}
            {...props}/>
        )
}

/**
 * @name slugify
 * @description
 * Converts a string into a URL-friendly slug.
 * It lowercases the string, replaces spaces with hyphens, removes special characters, and trims extra hyphens.
 * @param {string} str - The string to slugify.
 * @returns {string} - The slugified string.
 */
function slugify(str: string): string {
    return str
        .toString()
        .toLowerCase()
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

/**
 * @name createHeading
 * @description
 * A higher-order function that creates a heading component of a specific level (1-6).
 * The generated heading component uses `HeadingLink` to automatically create an anchor link with a slugified ID.
 * @param {1 | 2 | 3 | 4 | 5 | 6} level - The heading level to create.
 * @returns {React.FC<TextProps>} - A heading component.
 */
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    const CustomHeading = ({ children, ...props }: TextProps) => {
    const slug = slugify(children as string);
        return (
            <HeadingLink
                style={{marginTop: 'var(--static-space-24)', marginBottom: 'var(--static-space-12)'}}
                level={level}
                id={slug}
                {...props}>
                {children}
            </HeadingLink>
        );
    };
  
    CustomHeading.displayName = `Heading${level}`;
  
    return CustomHeading;
}

/**
 * @name createParagraph
 * @description
 * A component that renders a paragraph with specific styling for use in MDX.
 * @param {TextProps} props - The props for the Text component.
 * @returns {React.ReactElement} - The rendered paragraph component.
 */
function createParagraph({ children }: TextProps) {
    return (
        <Text style={{lineHeight: '150%'}}
            variant="body-default-m"
            onBackground="neutral-medium"
            marginTop="8"
            marginBottom="12">
            {children}
        </Text>
    );
};

const components = {
    p: createParagraph as any,
    h1: createHeading(1) as any,
    h2: createHeading(2) as any,
    h3: createHeading(3) as any,
    h4: createHeading(4) as any,
    h5: createHeading(5) as any,
    h6: createHeading(6) as any,
    img: createImage as any,
    a: CustomLink as any,
    Table,
    CodeBlock
};

/**
 * @name CustomMDXProps
 * @description
 * Props for the CustomMDX component, extending MDXRemoteProps.
 * @property {typeof components} [components] - Optional custom components to merge with the default MDX components.
 */
type CustomMDXProps = MDXRemoteProps & {
    components?: typeof components;
};

/**
 * @name CustomMDX
 * @description
 * A wrapper around `next-mdx-remote/rsc` that provides a set of custom components
 * for rendering MDX content. This includes custom handling for headings, links, images, and more.
 * @param {CustomMDXProps} props - The props for the component.
 * @returns {React.ReactElement} - The rendered MDX content.
 */
export function CustomMDX(props: CustomMDXProps) {
    
    return (
        // @ts-ignore: Suppressing type error for MDXRemote usage
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components || {}) }}
        />
    );
}