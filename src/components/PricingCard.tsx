import React from 'react';
import { Button, Flex, Heading, Text, Icon } from '@/once-ui/components';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  ctaText = "Выбрать тариф",
  ctaLink = "https://wa.me/7075557293"
}) => {
  return (
    <Flex
      direction="column"
      className={`w-full max-w-sm p-8 ${isPopular ? 'border-2 border-brand' : 'border border-neutral-alpha-medium'}`}
      radius="l"
      gap="m">
      {isPopular && (
        <Text
          className="text-center text-brand mb-4"
          variant="body-strong-s">
          Популярный выбор
        </Text>
      )}
      
      <Heading
        variant="heading-strong-l"
        className="text-center">
        {title}
      </Heading>
      
      <Text
        variant="display-strong-l"
        className="text-center">
        {price}
      </Text>
      
      <Text
        variant="body-default-s"
        onBackground="neutral-weak"
        className="text-center mb-6">
        {description}
      </Text>
      
      <Flex direction="column" gap="s" className="mb-8">
        {features.map((feature, index) => (
          <Flex key={index} gap="s" alignItems="center">
            <Icon
              name={feature.included ? "check-circle" : "x-circle"}
              onBackground={feature.included ? "brand-weak" : "neutral-weak"}
            />
            <Text variant="body-default-s">
              {feature.text}
            </Text>
          </Flex>
        ))}
      </Flex>
      
      <Button
        href={ctaLink}
        variant={isPopular ? "primary" : "secondary"}
        size="l"
        fillWidth>
        {ctaText}
      </Button>
    </Flex>
  );
};