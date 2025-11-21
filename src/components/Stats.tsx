import { Flex, Text, RevealFx } from '@/once-ui/components';

export const Stats = () => {
    const stats = [
        {
            label: "Years of Experience",
            value: "7+"
        },
        {
            label: "Revenue Generated",
            value: "$5.9M+"
        },
        {
            label: "Brands Managed",
            value: "12+"
        }
    ];

    return (
        <Flex
            fillWidth
            paddingY="xl"
            justifyContent="center"
            gap="xl"
            wrap={true}>
            {stats.map((stat, index) => (
                <RevealFx key={index} delay={index * 0.1} translateY="16">
                    <Flex
                        direction="column"
                        alignItems="center"
                        gap="8">
                        <Text
                            variant="display-strong-m"
                            onBackground="brand-medium">
                            {stat.value}
                        </Text>
                        <Text
                            variant="body-default-s"
                            onBackground="neutral-weak">
                            {stat.label}
                        </Text>
                    </Flex>
                </RevealFx>
            ))}
        </Flex>
    );
};
