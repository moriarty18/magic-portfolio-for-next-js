"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * @name ScrollToHash
 * @description
 * A client-side component that automatically scrolls to an element on the page
 * whose ID matches the hash in the URL. This is useful for making anchor links
 * work as expected in a Next.js application.
 *
 * This component does not render any visible UI.
 * @returns {null} - This component returns null.
 */
export default function ScrollToHash() {
    const router = useRouter();

    useEffect(() => {
        // Get the hash from the URL
        const hash = window.location.hash;
        if (hash) {
            // Remove the '#' symbol
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [router]);

    return null;
} 