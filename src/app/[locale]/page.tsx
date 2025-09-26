import React from 'react';

import { Heading, Flex, Text, Button,  Avatar, RevealFx, Arrow } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';

import { baseURL, routes, renderContent } from '@/app/resources'; 
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

/**
 * @name generateMetadata
 * @description
 * Dynamically generates metadata for the home page. This includes the page title,
 * description, and Open Graph/Twitter card information, tailored for the current locale.
 * @param {{ params: { locale: string } }} props - The props containing the current locale.
 * @returns {Promise<object>} A promise that resolves to the metadata object for the page.
 */
export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {
	const t = await getTranslations();
    const { home } = renderContent(t);
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

/**
 * @name Home
 * @description
 * The main component for the home page. It serves as the landing page of the portfolio,
 * showcasing a headline, subline, featured projects, latest blog posts, and a newsletter signup form.
 * It also includes structured data (JSON-LD) for SEO.
 * @param {{ params: { locale: string } }} props - The props containing the current locale.
 * @returns {React.ReactElement} The rendered home page component.
 */
export default function Home(
	{ params: {locale}}: { params: { locale: string }}
) {
	unstable_setRequestLocale(locale);
	const t = useTranslations();
	const { home, about, person, newsletter } = renderContent(t);
	return (
		<Flex
			maxWidth="m" fillWidth gap="xl"
			direction="column" alignItems="center">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: home.title,
						description: home.description,
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
						publisher: {
							'@type': 'Person',
							name: person.name,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
			<Flex
				fillWidth
				direction="column"
				paddingY="l" gap="m">
					<Flex
						direction="column"
						fillWidth maxWidth="s">
						<RevealFx
							translateY="4" fillWidth justifyContent="flex-start" paddingBottom="m">
							<Heading
								wrap="balance"
								variant="display-strong-l">
								{home.headline}
							</Heading>
						</RevealFx>
						<RevealFx
							translateY="8" delay={0.2} fillWidth justifyContent="flex-start" paddingBottom="m">
							<Text
								wrap="balance"
								onBackground="neutral-weak"
								variant="heading-default-xl">
								{home.subline}
							</Text>
						</RevealFx>
						<RevealFx translateY="12" delay={0.4}>
							<Flex fillWidth>
								<Button
									id="about"
									data-border="rounded"
									href={`/${locale}/about`}
									variant="tertiary"
									size="m">
									<Flex
										gap="8"
										alignItems="center">
										{about.avatar.display && (
											<Avatar
												style={{marginLeft: '-0.75rem', marginRight: '0.25rem'}}
												src={person.avatar}
												size="m"/>
											)}
											{t("about.title")}
											<Arrow trigger="#about"/>
									</Flex>
								</Button>
							</Flex>
						</RevealFx>
					</Flex>
				
			</Flex>
			<RevealFx translateY="16" delay={0.6}>
				<Projects range={[1,1]} locale={locale}/>
			</RevealFx>
			{routes['/blog'] && (
				<Flex
					fillWidth gap="24"
					mobileDirection="column">
					<Flex flex={1} paddingLeft="l">
						<Heading
							as="h2"
							variant="display-strong-xs"
							wrap="balance">
							Latest from the blog
						</Heading>
					</Flex>
					<Flex
						flex={3} paddingX="20">
						<Posts range={[1,2]} columns="2" locale={locale}/>
					</Flex>
				</Flex>
			)}
			<Projects range={[2]} locale={locale}/>
			{ newsletter.display &&
				<Mailchimp newsletter={newsletter} />
			}
		</Flex>
	);
}
