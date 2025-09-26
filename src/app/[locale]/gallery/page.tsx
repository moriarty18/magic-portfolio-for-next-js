import { Flex } from "@/once-ui/components";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import { baseURL, renderContent } from "@/app/resources";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

/**
 * @name generateMetadata
 * @description
 * Dynamically generates metadata for the gallery page. This includes the page title,
 * description, and Open Graph/Twitter card information, tailored for the current locale.
 * @param {{ params: { locale: string } }} props - The props containing the current locale.
 * @returns {Promise<object>} A promise that resolves to the metadata object for the page.
 */
export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {

	const t = await getTranslations();
	const { gallery } = renderContent(t);

	const title = gallery.title;
	const description = gallery.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/gallery`,
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
 * @name Gallery
 * @description
 * The main component for the gallery page. It displays a masonry grid of images
 * and includes structured data (JSON-LD) for an image gallery to improve SEO.
 * @param {{ params: { locale: string } }} props - The props containing the current locale.
 * @returns {React.ReactElement} The rendered gallery page component.
 */
export default function Gallery(
	{ params: {locale}}: { params: { locale: string }}
) {
	unstable_setRequestLocale(locale);
	const t = useTranslations();
	const { gallery, person } = renderContent(t);
    return (
        <Flex fillWidth>
            <script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'ImageGallery',
						name: gallery.title,
						description: gallery.description,
						url: `https://${baseURL}/gallery`,
						image: gallery.images.map((image) => ({
                            '@type': 'ImageObject',
                            url: `${baseURL}${image.src}`,
                            description: image.alt,
                        })),
						author: {
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
            <MasonryGrid/>
        </Flex>
    );
}