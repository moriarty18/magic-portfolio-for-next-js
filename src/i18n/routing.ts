import {defineRouting} from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import { i18nOptions } from '@/app/resources/config';
 
/**
 * @name routing
 * @description
 * Defines the internationalization (i18n) routing configuration for the application.
 * It specifies the supported locales, the default locale, and how the locale is
 * displayed in the URL path.
 * - `locales`: The list of supported language locales.
 * - `defaultLocale`: The default locale to use when no locale is specified.
 * - `localePrefix`: Set to 'as-needed' to avoid showing the default locale in the URL.
 */
export const routing = defineRouting({
  locales: i18nOptions.locales,
  defaultLocale: i18nOptions.defaultLocale,

  // Won't display `defaultLocale` in routes
  localePrefix: 'as-needed'
});
 
/**
 * @name Locale
 * @description
 * A type definition for the supported locales in the application.
 * It is dynamically created from the `routing.locales` configuration.
 * @example
 * // Usage:
 * const currentLocale: Locale = 'en';
 */
export type Locale = (typeof routing.locales)[number];

/**
 * @name createSharedPathnamesNavigation
 * @description
 * Creates lightweight wrappers around Next.js' navigation APIs that are
 * aware of the internationalization routing configuration. This provides
 * localized versions of `Link`, `redirect`, `usePathname`, and `useRouter`.
 *
 * @property {React.ComponentType} Link - A localized version of the Next.js Link component.
 * @property {function} redirect - A localized version of the Next.js redirect function.
 * @property {function} usePathname - A localized version of the Next.js usePathname hook.
 * @property {function} useRouter - A localized version of the Next.js useRouter hook.
 */
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation(routing);