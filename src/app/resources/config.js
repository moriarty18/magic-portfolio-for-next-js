/**
 * @name baseURL
 * @description The base URL of the deployed portfolio.
 * @type {string}
 */
const baseURL = 'demo.magic-portfolio.com'

/**
 * @name i18n
 * @description A boolean flag to enable or disable localization.
 * @type {boolean}
 */
const i18n = false;

/**
 * @name i18nOptions
 * @description Configuration for internationalization (i18n).
 * @property {string[]} locales - A list of all supported locales (e.g., ['en', 'id']).
 * @property {string} defaultLocale - The default locale used as a fallback.
 */
const i18nOptions = {
    locales: ['en','id'],
    defaultLocale: 'en'
}

/**
 * @name routes
 * @description An object to enable or disable pages. Set a route to `true` to show it.
 * @type {Object.<string, boolean>}
 */
const routes = {
    '/':        true,
    '/about':   true,
    '/work':    true,
    '/pricing': true,
    '/blog':    false,
    '/gallery': false,
}

/**
 * @name protectedRoutes
 * @description An object to enable password protection on selected routes.
 * The password must be set in `pages/api/authenticate.ts`.
 * @type {Object.<string, boolean>}
 */
const protectedRoutes = {
    '/work/automate-design-handovers-with-a-figma-to-code-pipeline': true
}

/**
 * @name effects
 * @description Configuration for visual effects on the site.
 * @property {'none'|'cursor'|'topLeft'|'topRight'|'bottomLeft'|'bottomRight'} mask - The type of mask effect.
 * @property {{display: boolean, opacity: number}} gradient - Gradient effect settings.
 * @property {{display: boolean, opacity: number, size: string}} dots - Dotted grid effect settings.
 * @property {{display: boolean}} lines - Line effect settings.
 */
const effects = {
    mask: 'cursor',
    gradient: {
        display: true,
        opacity: 0.4
    },
    dots: {
        display: true,
        opacity: 0.4,
        size: '24'
    },
    lines: {
        display: false,
    },
}

/**
 * @name style
 * @description Configuration for the site's theme and styling.
 * @property {'dark'|'light'} theme - The overall color theme.
 * @property {'sand'|'gray'|'slate'} neutral - The neutral color palette.
 * @property {string} brand - The primary brand color.
 * @property {string} accent - The accent color.
 * @property {'color'|'contrast'} solid - The solid color style.
 * @property {'flat'|'plastic'} solidStyle - The style for solid elements.
 * @property {'rounded'|'playful'|'conservative'} border - The border style.
 * @property {'filled'|'translucent'} surface - The surface style for elements.
 * @property {'all'|'micro'|'macro'} transition - The transition style.
 */
const style = {
    theme:       'light',
    neutral:     'gray',
    brand:       'emerald',
    accent:      'indigo',
    solid:       'contrast',
    solidStyle:  'flat',
    border:      'playful',
    surface:     'translucent',
    transition:  'all'
}

/**
 * @name display
 * @description Toggles for displaying specific elements in the UI.
 * @property {boolean} location - Whether to show the location in the header.
 * @property {boolean} time - Whether to show the current time in the header.
 */
const display = {
    location: true,
    time:     true
}

/**
 * @name mailchimp
 * @description Configuration for the Mailchimp newsletter form.
 * @property {string} action - The full action URL for the form submission.
 * @property {object} effects - Visual effects specific to the Mailchimp component.
 */
const mailchimp = {
    action: 'https://url/subscribe/post?parameters',
    effects: {
        mask: 'topRight',
        gradient: {
            display: true,
            opacity: 0.6
        },
        dots: {
            display: false,
        },
        lines: {
            display: false,
        },
    }
}

export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL, i18n, i18nOptions };
