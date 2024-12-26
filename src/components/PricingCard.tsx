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
      border={isPopular ? "brand-strong" : "neutral-medium"}
      borderStyle={isPopular ? "solid-2" : "solid-1"}
      radius="l"
      padding="xl"
      gap="m"
      style={{ width: '380px' }}>
      {isPopular && (
        <Text
          variant="body-strong-s"
          onBackground="brand-weak"
          style={{ textAlign: 'center', marginBottom: 'var(--space-m)' }}>
          Популярный выбор
        </Text>
      )}
      
      <Heading
        variant="heading-strong-l"
        style={{ textAlign: 'center' }}>
        {title}
      </Heading>
      
      <Text
        variant="display-strong-l"
        style={{ textAlign: 'center' }}>
        {price}
      </Text>
      
      <Text
        variant="body-default-s"
        onBackground="neutral-weak"
        style={{ textAlign: 'center', marginBottom: 'var(--space-l)' }}>
        {description}
      </Text>
      
      <Flex 
        direction="column" 
        gap="s" 
        style={{ marginBottom: 'var(--space-l)' }}>
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