import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { getPosts } from '@/app/utils/utils'
import { AvatarGroup, Button, Flex, Heading, SmartImage, Text } from '@/once-ui/components'
import { baseURL, renderContent } from '@/app/resources';
import { routing } from '@/i18n/routing';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/app/utils/formatDate';
import ScrollToHash from '@/components/ScrollToHash';

/**
 * @interface WorkParams
 * @description Defines the shape of the parameters object for a single project page.
 * @property {object} params - The parameters object.
 * @property {string} params.slug - The unique identifier (slug) for the project.
 * @property {string} params.locale - The current language locale.
 */
interface WorkParams {
    params: {
        slug: string;
		locale: string;
    };
}

/**
 * @name generateStaticParams
 * @description
 * Generates the static parameters for all project pages across all supported locales.
 * This function is used by Next.js to pre-render all the dynamic routes at build time.
 * @returns {Promise<{ slug: string; locale: string }[]>} A promise that resolves to an array of all possible slug-locale combinations.
 */
export async function generateStaticParams(): Promise<{ slug: string; locale: string }[]> {
	const locales = routing.locales;
    
    // Create an array to store all posts from all locales
    const allPosts: { slug: string; locale: string }[] = [];

    // Fetch posts for each locale
    for (const locale of locales) {
        const posts = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]);
        allPosts.push(...posts.map(post => ({
            slug: post.slug,
            locale: locale,
        })));
    }

    return allPosts;
}

/**
 * @name generateMetadata
 * @description
 * Dynamically generates metadata for a single project page based on its frontmatter.
 * This includes the title, description, and Open Graph/Twitter card information.
 * @param {WorkParams} { params: { slug, locale } } - The parameters for the project, including slug and locale.
 * @returns {object | undefined} The metadata object for the page, or undefined if the project is not found.
 */
export function generateMetadata({ params: { slug, locale } }: WorkParams) {
	let post = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]).find((post) => post.slug === slug)
	
	if (!post) {
		return
	}

	let {
		title,
		publishedAt: publishedTime,
		summary: description,
		images,
		image,
		team,
	} = post.metadata
	let ogImage = image
		? `https://${baseURL}${image}`
		: `https://${baseURL}/og?title=${title}`;

	return {
		title,
		description,
		images,
		team,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://${baseURL}/${locale}/work/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	}
}

/**
 * @name Project
 * @description
 * Renders a single project page. It fetches the project's content and metadata based on the slug and locale,
 * displays it using the `CustomMDX` component, and includes structured data (JSON-LD) for SEO.
 * If the project is not found, it renders a 404 page.
 * @param {WorkParams} { params } - The parameters for the project, including slug and locale.
 * @returns {React.ReactElement} The rendered project page.
 */
export default function Project({ params }: WorkParams) {
	unstable_setRequestLocale(params.locale);
	let post = getPosts(['src', 'app', '[locale]', 'work', 'projects', params.locale]).find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	const t = useTranslations();
	const { person } = renderContent(t);

	const avatars = post.metadata.team?.map((person) => ({
        src: person.avatar,
    })) || [];

	return (
		<Flex as="section"
			fillWidth maxWidth="m"
			direction="column" alignItems="center"
			gap="l">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `https://${baseURL}${post.metadata.image}`
							: `https://${baseURL}/og?title=${post.metadata.title}`,
							url: `https://${baseURL}/${params.locale}/work/${post.slug}`,
						author: {
							'@type': 'Person',
							name: person.name,
						},
					}),
				}}
			/>
			<Flex
				fillWidth maxWidth="xs" gap="16"
				direction="column">
				<Button
					href={`/${params.locale}/work`}
					variant="tertiary"
					size="s"
					prefixIcon="chevronLeft">
					Projects
				</Button>
				<Heading
					variant="display-strong-s">
					{post.metadata.title}
				</Heading>
			</Flex>
			{post.metadata.images.length > 0 && (
				<SmartImage
					aspectRatio="16 / 9"
					radius="m"
					alt="image"
					src={post.metadata.images[0]}/>
			)}
			<Flex style={{margin: 'auto'}}
				as="article"
				maxWidth="xs" fillWidth
				direction="column">
				<Flex
					gap="12" marginBottom="24"
					alignItems="center">
					{ post.metadata.team && (
						<AvatarGroup
							reverseOrder
							avatars={avatars}
							size="m"/>
					)}
					<Text
						variant="body-default-s"
						onBackground="neutral-weak">
						{formatDate(post.metadata.publishedAt)}
					</Text>
				</Flex>
				<CustomMDX source={post.content} />
			</Flex>
			<ScrollToHash />
		</Flex>
	)
}