"use client";

import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/routing';
import { routes, protectedRoutes } from '@/app/resources';
import { Flex, Spinner, Input, Button, Heading } from '@/once-ui/components';

/**
 * @name RouteGuardProps
 * @description
 * Props for the RouteGuard component.
 * @property {React.ReactNode} children - The content to render if the route is accessible.
 */
interface RouteGuardProps {
    children: React.ReactNode;
}

/**
 * @name RouteGuard
 * @description
 * A component that protects routes based on configuration and password authentication.
 * It checks if a route is enabled and if it requires a password. If a password is required and the user is not authenticated,
 * it renders a password prompt. While checking, it displays a loading spinner.
 * @param {RouteGuardProps} props - The props for the component.
 * @returns {React.ReactElement | null} - The children if the route is accessible, or a loading/password prompt.
 */
const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
    const pathname = usePathname();
    const [isRouteEnabled, setIsRouteEnabled] = useState(false);
    const [isPasswordRequired, setIsPasswordRequired] = useState(false);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const performChecks = async () => {
            setLoading(true);
            setIsRouteEnabled(false);
            setIsPasswordRequired(false);
            setIsAuthenticated(false);

            const checkRouteEnabled = () => {
                if (!pathname) return false;

                if (pathname in routes) {
                    return routes[pathname as keyof typeof routes];
                }

                const dynamicRoutes = ['/blog', '/work'] as const;
                for (const route of dynamicRoutes) {
                    if (pathname?.startsWith(route) && routes[route]) {
                        return true;
                    }
                }

                return false;
            };

            const routeEnabled = checkRouteEnabled();
            setIsRouteEnabled(routeEnabled);

            if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
                setIsPasswordRequired(true);

                const response = await fetch('/api/check-auth');
                if (response.ok) {
                    setIsAuthenticated(true);
                }
            }

            setLoading(false);
        };

        performChecks();
    }, [pathname]);

    const handlePasswordSubmit = async () => {
        const response = await fetch('/api/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            setIsAuthenticated(true);
            setError(undefined);
        } else {
            setError('Incorrect password');
        }
    };

    if (loading) {
        return (
        <Flex fillWidth paddingY="128" justifyContent="center">
            <Spinner />
        </Flex>
        );
    }

    if (!isRouteEnabled) {
        return (
        <Flex fillWidth paddingY="128" justifyContent="center">
            <Spinner />
        </Flex>
        );
    }

    if (isPasswordRequired && !isAuthenticated) {
        return (
        <Flex
            fillWidth paddingY="128" maxWidth={24} gap="24"
            justifyContent="center" direction="column" alignItems="center">
            <Heading align="center" wrap="balance">
                This page is password protected
            </Heading>
            <Input
                id="password"
                type="password"
                label="Enter password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError(undefined);
                }}
                error={error}/>
            <Button onClick={handlePasswordSubmit} size="l">
                Submit
            </Button>
        </Flex>
        );
    }

    return <>{children}</>;
};

export { RouteGuard };