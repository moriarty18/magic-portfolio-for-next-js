import ScrollToHash from '@/components/ScrollToHash';
import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { getPosts } from '@/app/utils/utils'
import { Avatar, Button, Flex, Heading, Text } from '@/once-ui/components'

import { baseURL, renderContent } from '@/app/resources'
import { unstable_setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/app/utils/formatDate'

/**
 * @interface BlogParams
 * @description Defines the shape of the parameters object for a single blog post page.
 * @property {object} params - The parameters object.
 * @property {string} params.slug - The unique identifier (slug) for the blog post.
 * @property {string} params.locale - The current language locale.
 */
interface BlogParams {
    params: {
        slug: string;
		locale: string;
    };
}

/**
 * @name generateStaticParams
 * @description
 * Generates the static parameters for all blog post pages across all supported locales.
 * This function is used by Next.js to pre-render all the dynamic routes at build time.
 * @returns {Promise<{ slug: string; locale: string }[]>} A promise that resolves to an array of all possible slug-locale combinations.
 */
export async function generateStaticParams() {
	const locales = routing.locales;
    
    // Create an array to store all posts from all locales
    const allPosts: { slug: string; locale: string }[] = [];

    // Fetch posts for each locale
    for (const locale of locales) {
        const posts = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]);
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
 * Dynamically generates metadata for a single blog post page based on its frontmatter.
 * This includes the title, description, and Open Graph/Twitter card information.
 * @param {BlogParams} { params: { slug, locale } } - The parameters for the blog post, including slug and locale.
 * @returns {object | undefined} The metadata object for the page, or undefined if the post is not found.
 */
export function generateMetadata({ params: { slug, locale } }: BlogParams) {
	let post = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]).find((post) => post.slug === slug)

	if (!post) {
		return
	}

	let {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata;
	let ogImage = image
		? `https://${baseURL}${image}`
		: `https://${baseURL}/og?title=${title}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://${baseURL}/${locale}/blog/${post.slug}`,
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
 * @name Blog
 * @description
 * Renders a single blog post page. It fetches the post's content and metadata based on the slug and locale,
 * displays it using the `CustomMDX` component, and includes structured data (JSON-LD) for SEO.
 * If the post is not found, it renders a 404 page.
 * @param {BlogParams} { params } - The parameters for the blog post, including slug and locale.
 * @returns {React.ReactElement} The rendered blog post page.
 */
export default function Blog({ params }: BlogParams) {
	unstable_setRequestLocale(params.locale);
	let post = getPosts(['src', 'app', '[locale]', 'blog', 'posts', params.locale]).find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	const t = useTranslations();
	const { person } = renderContent(t);

	return (
		<Flex as="section"
			fillWidth maxWidth="xs"
			direction="column"
			gap="m">
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
							url: `https://${baseURL}/${params.locale}/blog/${post.slug}`,
						author: {
							'@type': 'Person',
							name: person.name,
						},
					}),
				}}
			/>
			<Button
				href={`/${params.locale}/blog`}
				variant="tertiary"
				size="s"
				prefixIcon="chevronLeft">
				Posts
			</Button>
			<Heading
				variant="display-strong-s">
				{post.metadata.title}
			</Heading>
			<Flex
				gap="12"
				alignItems="center">
				{ person.avatar && (
					<Avatar
						size="s"
						src={person.avatar}/>
				)}
				<Text
					variant="body-default-s"
					onBackground="neutral-weak">
					{formatDate(post.metadata.publishedAt)}
				</Text>
			</Flex>
			<Flex
				as="article"
				direction="column"
				fillWidth>
				<CustomMDX source={post.content} />
			</Flex>
			<ScrollToHash />
		</Flex>
	)
}