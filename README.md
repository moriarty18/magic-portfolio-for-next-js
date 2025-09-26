# **Magic Portfolio: Build Your Professional Portfolio with Ease**

View the [live demo](https://demo.magic-portfolio.com) to see what you can build.

![Magic Portfolio Cover](public/images/cover.png)

---

## **Introduction**

Magic Portfolio is a fully customizable, open-source portfolio template built with [Next.js](https://nextjs.org) and styled with [Once UI](https://once-ui.com). It's designed for developers, designers, and creatives who want to showcase their work with a clean, professional, and timeless design. The portfolio is optimized for performance, SEO, and endless customization.

This repository is now fully documented with JSDoc comments to help you understand the codebase and customize it to your needs.

---

## **Features**

-   **🎨 Endless Customization**: Tailor the theme, colors, and layout using simple data attributes.
-   **🚀 Built with Once UI**: Leverage all the components and features of the Once UI library.
-   **🔍 SEO Optimized**: Automatic generation of Open Graph images, metadata, and schema markup for better search engine visibility.
-   **✍️ Content-Driven**: Easily manage your content for the about, work, blog, and gallery pages.
-   **🔒 Route Protection**: Set up password protection for specific URLs.
-   **🌐 Localization Ready**: Full support for internationalization (i18n) with `next-intl`.
-   **📱 Fully Responsive**: A clean layout that looks great on all screen sizes.

---

## **Getting Started**

To get your portfolio up and running, you'll need Node.js v18.17 or later.

**1. Clone the Repository**
```bash
git clone https://github.com/once-ui-system/magic-portfolio.git
cd magic-portfolio
```

**2. Install Dependencies**
```bash
npm install
```

**3. Run the Development Server**
```bash
npm run dev
```
Your portfolio will be running at `http://localhost:3000`.

---

## **Customization Guide**

### **Configuration**

All primary configuration is located in `src/app/resources/config.ts`. Here you can set up:
-   **Theme**: Define your color palette, fonts, and other styling options.
-   **Routes**: Enable or disable pages like the blog, gallery, or work sections.
-   **Localization**: Configure supported languages for internationalization.

### **Content**

Your personal content is managed in `src/app/resources/content/`. For internationalized content, use `src/app/resources/content-i18n/`.

-   **`person.ts`**: Your personal details (name, role, location, etc.).
-   **`about.ts`**: Content for your "About" page, including work experience and education.
-   **`social.ts`**: Links to your social media profiles.
-   **And more**: Customize content for the blog, gallery, and other sections.

### **Creating Blog Posts and Projects**

To add a new blog post or project, create a new `.mdx` file in the appropriate directory:
-   **Blog Posts**: `src/app/[locale]/blog/posts/`
-   **Projects**: `src/app/[locale]/work/projects/`

The frontmatter of your MDX files will be used to generate metadata and content for each post or project.

---

## **Project Structure**

Here's a brief overview of the key directories in the project:

-   `public/`: Static assets like images and fonts.
-   `src/app/[locale]/`: The main application routes, organized by locale.
    -   `about/`, `blog/`, `gallery/`, `work/`: Page components for each section.
-   `src/components/`: Reusable components used throughout the application.
-   `src/once-ui/`: The Once UI component library.
-   `src/app/resources/`: Configuration and content files.
-   `src/app/utils/`: Utility functions for handling MDX files and formatting dates.

---

## **Deployment**

The easiest way to deploy your portfolio is with Vercel. Click the button below to get started:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&project-name=portfolio&repository-name=portfolio&redirect-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&demo-title=Magic%20Portfolio&demo-description=Showcase%20your%20designers%20or%20developer%20portfolio&demo-url=https%3A%2F%2Fdemo.magic-portfolio.com&demo-image=%2F%2Fraw.githubusercontent.com%2Fonce-ui-system%2Fmagic-portfolio%2Fmain%2Fpublic%2Fimages%2Fcover.png)

---

## **Authors & Community**

-   **Lorant Toth**: [Threads](https://www.threads.net/@lorant.one) | [LinkedIn](https://www.linkedin.com/in/tothlorant/)
-   **Zsofia Komaromi**: [Threads](https://www.threads.net/@zsofia_kom) | [LinkedIn](https://www.linkedin.com/in/zsofiakomaromi/)
-   Localization by **François Hernandez**: [GitHub](https://github.com/francoishernandez)

### **Get Involved**

-   **Join our Community**: Share your portfolio and connect with other designers and engineers on the [Design Engineers Club on Discord](https://discord.com/invite/5EyAQ4eNdS).
-   **Report a Bug**: If you find an issue, please [report it here](https://github.com/once-ui-system/magic-portfolio/issues/new?labels=bug&template=bug_report.md).

---

## **License**

This project is distributed under the **CC BY-NC 4.0 License**.
-   Commercial use is not permitted.
-   Attribution is required.

Please see the `LICENSE` file for more details.