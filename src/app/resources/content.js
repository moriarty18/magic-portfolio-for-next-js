import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Азиз',
    lastName:  'Кожанов',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Диджитал маркетолог',
    avatar:    '/images/avatar.jpg',
    location:  'Asia/Almaty',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: []  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: true,
    title: <>Subscribe to {person.firstName}'s Newsletter</>,
    description: <>I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.</>
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
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Диджитал маркетолог</>,
    subline: <>Привет! Я Азиз 👋 Digital-маркетолог, превращаю рекламные бюджеты в  <InlineCode>прибыль</InlineCode>, последние 7 лет помогаю бизнесу масштабироваться через системный digital-маркетинг, <br/> специализируюсь на создании воронок продаж и автоматизации маркетинга.</>
}

const about = {
    label: 'About',
    title: 'Обо мне',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
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
        title: 'Описание',
        description: <>Сертифицированный специалист Google Ads, Meta Blueprint и Яндекс.Директ. Постоянно изучаю новые инструменты и подходы в digital-маркетинге для достижения максимальной эффективности рекламных кампаний.</>
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Опыт работы',
        experiences: [
            {
                company: 'Abris Distribution',
                timeframe: '2024 - н.в.',
                role: 'Digital marketing manager',
                achievements: [
                    <>Успешный запуск digital-проекта по продвижению зарядных станций для электромобилей в ОАЭ с нуля: разработка landing page, настройка сквозной аналитики и автоматизации маркетинга, запуск рекламных кампании.</>,
                    <>Достижения: стабильная генерация лидов со стоимостью $10 за обращение через рекламные кампании в Meta и Google Ads при выходе на новый рынок.</>
                ],
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
                timeframe: '2022 - 2024',
                role: 'CRM manager/PPC specialist ',
                achievements: [
                    <>Разработка и внедрение customer journey для пользователей Samsung с системой триггерных email-рассылок, push-уведомлений и таргетированных кампаний на основе owned каналов.</>,
                    <>Достижения: годовой доход через owned каналы и прямой маркетинг составил $5.9M, успешная интеграция и работа с данными в экосистеме Adobe Experience Cloud (Analytics, Audience Manager, Campaign Classic).</>

                    <>Управление рекламными кампаниями для ведущего автомобильного холдинга Astana Motors, включая премиальные и массовые бренды (Hyundai, BMW, Toyota, Lexus, Land Rover, Jaguar, Volvo и другие) в Google Ads, Meta Ads и Яндекс Директ.</>,
                    <>Достижения: оптимизация рекламных кампаний с общим бюджетом более 40 млн тенге в месяц, настройка сквозной аналитики для 12+ брендов, что привело к снижению стоимости заявки на тест-драйв на 35% при сохранении качества лидов.</>
                ],
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
        title: 'Образование',
        institutions: [
            {
                name: 'Алматинский технологический университет',
                description: <>Вычислительная техника и программное обеспечение</>,
            },
            {
                name: 'Курс по нейросетям',
                description: <>AI маркетинг</>,
            }
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Технические навыки',
        skills: [
            {
                title: 'Медиапланирование',
                description: <>Комплексный анализ и оптимизация рекламных каналов с целью максимизации эффективности маркетинговых кампаний и достижения бизнес-целей.</>,
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
                description: <>Профессиональная интеграция и настройка CRM-систем (AmoCRM, Bitrix24) для создания единого информационного пространства: автоматизация бизнес-процессов, управление sales-воронкой, сквозная аналитика и многоканальная коммуникация с клиентами в одном интерфейсе.</>,
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
                description: <>Создание привлекательных, высококонверсионных landing page</>,
                // optional: leave the array empty if you don't want to display images
                images: 
            },
            {
                title: 'Canva',
                description: <>Инструмент для создания профессиональных визуальных креативов - от статичных изображений и инфографики до анимированных видео и презентаций, обеспечивающий максимальную вовлеченность аудитории через яркий и эффективный визуальный контент.</>,
                // optional: leave the array empty if you don't want to display images
                images: 
            }
            
        
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'Writing about design and tech...',
    description: `Read what ${person.name} has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Work',
    title: 'My projects',
    description: `Design and dev projects by ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by ${person.name}`,
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

export { person, social, newsletter, home, about, blog, work, gallery };
