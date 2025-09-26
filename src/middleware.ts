import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
/**
 * @name Middleware
 * @description
 * This middleware is responsible for handling internationalization (i18n) routing.
 * It uses the `next-intl` library to create a middleware function that will
 * automatically handle locale detection and routing based on the configuration
 * provided in `i18n/routing.ts`.
 */
export default createMiddleware(routing);
 
/**
 * @name config
 * @description
 * The configuration object for the Next.js middleware.
 * The `matcher` property is used to specify which paths the middleware should run on.
 * This is configured to run on all paths except for API routes, Next.js internal
 * routes, Vercel routes, and static files.
 */
export const config = {
  // Match only internationalized pathnames
  matcher: [
      '/',
      '/((?!api|_next|_vercel|.*\\..*).*)',
      '/(en|id)/:path*'
    ]
};