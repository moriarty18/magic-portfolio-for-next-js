import { InlineCode } from "@/once-ui/components";

const createI18nContent = (t) => {
    const person = {
        firstName: 'Азиз',
        lastName:  'Кожанов',
        get name() {
            return `${this.firstName} ${this.lastName}`;
        },
        role:      t("person.role"),
        avatar:    '/images/avatar.jpg',
        location:  'Asia/Almaty',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
        languages: ['Русский', 'English']  // optional: Leave the array empty if you don't want to display languages
    }

    const newsletter = {
        display: false,
        title: <>{t("newsletter.title", {firstName: person.firstName})}</>,
        description: <>{t("newsletter.description")}</>
    }

    const social = [
        // Links are automatically displayed.
        // Import new icons in /once-ui/icons.ts
        {
            name: 'Instagram',
            icon: 'instagram',
            link: 'https://www.instagram.com/hustle.almaty',
        },
        {
            name: 'LinkedIn',
            icon: 'linkedin',
            link: 'https://www.linkedin.com/in/aziz-kozhanov/',
        },
        {
            name: 'WhatsApp',
            icon: 'whatsapp',
            link: 'https://wa.me/7075557293',
        },
        {
            name: 'Email',
            icon: 'email',
            link: 'mailto:kozhanov93@gmail.com',
        },
    ]

    const home = {
        label: t("home.label"),
        title: t("home.title", {name: person.name}),
        description: t("home.description", {role: person.role}),
        headline: <>{t("home.headline")}</>,
        subline: <>{t.rich("home.subline", {
            code: (chunks) => <InlineCode>{chunks}</InlineCode>,
            br: () => <br />
        })}</>
    }

    const about = {
        label: t("about.label"),
        title: t("about.title"),
        description: t("about.description", {name: person.name, role: person.role, location: person.location}),
        tableOfContent: {
            display: true,
            subItems: false
        },
        avatar: {
            display: true
        },
        calendar: {
            display: true,
            link: 'https://cal.com'
        },
        intro: {
            display: true,
            title: t("about.intro.title"),
            description: <>{t("about.intro.description")}</>
        },
        work: {
            display: true, // set to false to hide this section
            title: t("about.work.title"),
            experiences: [
                {
                    company: 'Abris Distribution',
                    timeframe: t("about.work.experiences.Abris Distribution.timeframe"),
                    role: t("about.work.experiences.Abris Distribution.role"),
                    achievements: t("about.work.experiences.Abris Distribution.achievements").split(";"),
                    images: [ // optional: leave the array empty if you don't want to display images
                        {
                            src: '/images/projects/project-01/cover-01.png',
                            alt: 'Greenline project',
                            width: 16,
                            height: 9
                        }
                    ]
                },
                {
                    company: 'Cheil Kazakhstan',
                    timeframe: t("about.work.experiences.Cheil Kazakhstan.timeframe"),
                    role: t("about.work.experiences.Cheil Kazakhstan.role"),
                    achievements: t("about.work.experiences.Cheil Kazakhstan.achievements").split(";"),
                    images: [ // optional: leave the array empty if you don't want to display images
                        {
                            src: '/images/projects/project-01/cover-02.jpg',
                            alt: 'Greenline project',
                            width: 21,
                            height: 9
                        }
                    ]
                }
            ]
        },
        studies: {
            display: true, // set to false to hide this section
            title: t("about.studies.title"),
            institutions: [
                {
                    name: 'Алматинский технологический университет',
                    description: <>{t("about.studies.institutions.Almaty Technological University.description")}</>,
                },
                {
                    name: 'Курс по нейросетям',
                    description: <>{t("about.studies.institutions.AI Course.description")}</>,
                }
            ]
        },
        technical: {
            display: true, // set to false to hide this section
            title: t("about.technical.title"),
            skills: [
                {
                    title: 'Аналитика',
                    description: <>{t("about.technical.skills.Analytics.description")}</>,
                    images: []
                },
                {
                    title: 'Рекламные платформы',
                    description: <>{t("about.technical.skills.Ads Platforms.description")}</>,
                    images: []
                },
                {
                    title: 'Медиапланирование',
                    description: <>{t("about.technical.skills.Media Planning.description")}</>,
                    // optional: leave the array empty if you don't want to display images
                    images: [
                        {
                            src: '/images/projects/project-01/cover-03.png',
                            alt: 'Project image',
                            width: 21,
                            height: 9
                        },

                    ]
                },
                {
                    title: 'Интеграция CRM систем AMO/Birix24',
                    description: <>{t("about.technical.skills.CRM Integration.description")}</>,
                    // optional: leave the array empty if you don't want to display images
                    images: [
                        {
                            src: '/images/projects/project-01/cover-04.png',
                            alt: 'Project image',
                            width: 16,
                            height: 9
                        },
                    ]
                },
                {
                    title: 'Tilda',
                    description: <>{t("about.technical.skills.Tilda.description")}</>,
                    // optional: leave the array empty if you don't want to display images
                    images:[]
                },
                {
                    title: 'Canva',
                    description: <>{t("about.technical.skills.Canva.description")}</>,
                    // optional: leave the array empty if you don't want to display images
                    images: []
                }
            ]
        }
    }

    const blog = {
        label: t("blog.label"),
        title: t("blog.title"),
        description: t("blog.description", {name: person.name})
        // Create new blog posts by adding a new .mdx file to app/blog/posts
        // All posts will be listed on the /blog route
    }

    const work = {
        label: t("work.label"),
        title: t("work.title"),
        description: t("work.description", {name: person.name})
        // Create new project pages by adding a new .mdx file to app/blog/posts
        // All projects will be listed on the /home and /work routes
    }

    const gallery = {
        label: t("gallery.label"),
        title: t("gallery.title"),
        description: t("gallery.description", {name: person.name}),
        // Images from https://pexels.com
        images: [
            {
                src: '/images/gallery/img-01.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-02.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            { 
                src: '/images/gallery/img-03.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            { 
                src: '/images/gallery/img-04.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-05.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-06.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-07.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-08.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-09.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-10.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            { 
                src: '/images/gallery/img-11.jpg',
                alt: 'image',
                orientation: 'vertical'
            },
            {
                src: '/images/gallery/img-12.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            {
                src: '/images/gallery/img-13.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
            { 
                src: '/images/gallery/img-14.jpg',
                alt: 'image',
                orientation: 'horizontal'
            },
        ]
    }
    return {
        person,
        social,
        newsletter,
        home,
        about,
        blog,
        work,
        gallery
    }
};

export { createI18nContent };
