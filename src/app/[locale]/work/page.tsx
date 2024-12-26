import { Flex, Heading, Text } from '@/once-ui/components';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Pricing({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  
  return (
    <Flex
      fillWidth
      direction="column"
      gap="xl"
      paddingY="xl">
      <Heading 
        variant="display-strong-xl"
        style={{ textAlign: 'center' }}>
        Тарифные планы
      </Heading>
    </Flex>
  );
}