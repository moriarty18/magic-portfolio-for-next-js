import { Flex, Text, RevealFx, Avatar } from '@/once-ui/components';

export const Testimonials = () => {
    const testimonials = [
        {
            name: "Marketing Director",
            company: "Astana Motors",
            quote: "Aziz's strategic approach to PPC and analytics helped us reduce our cost per lead by 35% while scaling our campaigns across multiple brands.",
            avatar: "" // Placeholder
        },
        {
            name: "Project Lead",
            company: "Abris Distribution",
            quote: "Launching a new product in the UAE was a challenge, but Aziz built a funnel that started generating qualified leads from day one.",
            avatar: ""
        }
    ];

    return (
        <Flex
            fillWidth
            direction="column"
            alignItems="center"
            paddingY="xl"
            gap="l">

            <Flex
                fillWidth
                justifyContent="center"
                wrap={true}
                gap="l">
                {testimonials.map((t, index) => (
                    <RevealFx key={index} delay={index * 0.2} translateY="8">
                        <Flex
                            direction="column"
                            padding="l"
                            border="neutral-medium"
                            radius="l"
                            background="surface"
                            maxWidth="s"
                            gap="m">
                            <Text
                                variant="body-default-l"
                                onBackground="neutral-strong">
                                "{t.quote}"
                            </Text>
                            <Flex gap="s" alignItems="center">
                                {t.avatar && <Avatar src={t.avatar} size="m"/>}
                                <Flex direction="column">
                                    <Text variant="body-strong-m">{t.name}</Text>
                                    <Text variant="body-default-s" onBackground="neutral-weak">{t.company}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </RevealFx>
                ))}
            </Flex>
        </Flex>
    );
};
