import { Flex, Heading, Text } from '@/once-ui/components';
import { PricingCard } from '@/components/PricingCard';
import { baseURL, renderContent } from '@/app/resources';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

const pricingPlans = [
  {
    title: "Базовый",
    price: "от 300 000 ₸",
    description: "Идеально для малого бизнеса и стартапов",
    features: [
      { text: "Настройка рекламных кампаний в Google Ads", included: true },
      { text: "Настройка рекламных кампаний в Meta Ads", included: true },
      { text: "Базовая аналитика", included: true },
      { text: "Ежемесячный отчет", included: true },
      { text: "A/B тестирование", included: false },
      { text: "Расширенная аналитика", included: false }
    ]
  },
  {
    title: "Оптимальный",
    price: "от 500 000 ₸",
    description: "Для растущего бизнеса с серьезными целями",
    features: [
      { text: "Все опции базового тарифа", included: true },
      { text: "Настройка TikTok Ads", included: true },
      { text: "A/B тестирование креативов", included: true },
      { text: "Расширенная аналитика", included: true },
      { text: "Еженедельные отчеты", included: true },
      { text: "Персональный менеджер", included: true }
    ],
    isPopular: true
  },
  {
    title: "Премиум",
    price: "от 1 000 000 ₸",
    description: "Максимальный результат для крупного бизнеса",
    features: [
      { text: "Все опции оптимального тарифа", included: true },
      { text: "Omni-channel стратегия", included: true },
      { text: "Программатик реклама", included: true },
      { text: "CRM интеграция", included: true },
      { text: "Персональные дашборды", included: true },
      { text: "Приоритетная поддержка 24/7", included: true }
    ]
  }
];

export default function Pricing({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  
  return (
    <Flex
      fillWidth
      maxWidth="l"
      direction="column"
      gap="xl"
      paddingY="xl">
      <Flex
        direction="column"
        alignItems="center"
        gap="m"
        className="text-center">
        <Heading variant="display-strong-xl">
          Тарифные планы
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          maxWidth="2xl"
          style={{ textAlign: 'center' }}>
          Выберите подходящий тариф для вашего бизнеса. 
          Все тарифы включают базовую настройку и поддержку.
        </Text>
      </Flex>

      <Flex
        wrap
        gap="l"
        justifyContent="center">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            {...plan}
          />
        ))}
      </Flex>
    </Flex>
  );
}