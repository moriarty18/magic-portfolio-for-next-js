import { Flex, Heading, Text } from "@/once-ui/components";

/**
 * @name NotFound
 * @description
 * A component that renders the 404 "Page Not Found" error page.
 * It displays a simple message to the user indicating that the requested page could not be found.
 * @returns {React.ReactElement} The rendered 404 page component.
 */
export default function NotFound() {
    return (
        <Flex
            as="section"
            direction="column" alignItems="center">
            <Text
                marginBottom="s"
                variant="display-strong-xl">
                404
            </Text>
            <Heading
                marginBottom="l"
                variant="display-strong-xs">
                Page Not Found
            </Heading>
            <Text
                onBackground="neutral-weak">
                The page you are looking for does not exist.
            </Text>
        </Flex>
    )
}