import { Flex, Text, RevealFx, Heading } from '@/once-ui/components';

export const Clients = () => {
    // Ideally these would be logos, but for now we use text placeholders
    const clients = [
        "Samsung",
        "Hyundai",
        "BMW",
        "Toyota",
        "Lexus",
        "Land Rover",
        "Jaguar",
        "Volvo",
        "Abris Distribution",
        "Cheil"
    ];

    return (
        <Flex
            fillWidth
            direction="column"
            alignItems="center"
            paddingY="xl"
            gap="l">
            <RevealFx translateY="8">
                <Heading
                    variant="heading-strong-m"
                    align="center"
                    marginBottom="m">
                    Trusted by Market Leaders
                </Heading>
            </RevealFx>

            <Flex
                fillWidth
                justifyContent="center"
                wrap={true}
                gap="l"
                maxWidth="l">
                {clients.map((client, index) => (
                    <RevealFx key={index} delay={index * 0.05} translateY="4">
                        <Flex
                            paddingX="m"
                            paddingY="s"
                            border="neutral-medium"
                            radius="m"
                            background="surface">
                            <Text
                                variant="body-strong-m"
                                onBackground="neutral-strong">
                                {client}
                            </Text>
                        </Flex>
                    </RevealFx>
                ))}
            </Flex>
        </Flex>
    );
};
