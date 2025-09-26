import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * @name Team
 * @description Represents a team member associated with a post or project.
 * @property {string} name - The name of the team member.
 * @property {string} role - The role of the team member.
 * @property {string} avatar - The URL to the team member's avatar.
 * @property {string} linkedIn - The URL to the team member's LinkedIn profile.
 */
type Team = {
    name: string;
    role: string;
    avatar: string;
    linkedIn: string;
};

/**
 * @name Metadata
 * @description Represents the metadata extracted from the frontmatter of an MDX file.
 * @property {string} title - The title of the post.
 * @property {string} publishedAt - The publication date of the post.
 * @property {string} summary - A short summary of the post.
 * @property {string} [image] - The main image for the post.
 * @property {string[]} images - A list of images associated with the post.
 * @property {string} [tag] - The primary tag for the post.
 * @property {Team[]} team - A list of team members who worked on the project.
 */
type Metadata = {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images: string[];
    tag?: string;
    team: Team[];
};

/**
 * @name getMDXFiles
 * @description Retrieves a list of all MDX files from a specified directory.
 * @param {string} dir - The directory to search for MDX files.
 * @returns {string[]} An array of MDX file names.
 * @throws {Error} If the directory does not exist.
 */
function getMDXFiles(dir: string) {
    if (!fs.existsSync(dir)) {
        throw new Error(`Directory not found: ${dir}`);
    }

    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

/**
 * @name readMDXFile
 * @description Reads and parses a single MDX file, separating the frontmatter (metadata) from the content.
 * @param {string} filePath - The full path to the MDX file.
 * @returns {{ metadata: Metadata, content: string }} An object containing the parsed metadata and the MDX content.
 * @throws {Error} If the file does not exist.
 */
function readMDXFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(rawContent);

    const metadata: Metadata = {
        title: data.title || '',
        publishedAt: data.publishedAt,
        summary: data.summary || '',
        image: data.image || '',
        images: data.images || [],
        tag: data.tag || [],
        team: data.team || [],
    };

    return { metadata, content };
}

/**
 * @name getMDXData
 * @description
 * Retrieves and processes all MDX files from a given directory.
 * For each file, it extracts the metadata, content, and a URL-friendly slug.
 * @param {string} dir - The directory containing the MDX files.
 * @returns {{ metadata: Metadata, slug: string, content: string }[]} An array of objects, each representing an MDX file's data.
 */
function getMDXData(dir: string) {
    const mdxFiles = getMDXFiles(dir);
    return mdxFiles.map((file) => {
        const { metadata, content } = readMDXFile(path.join(dir, file));
        const slug = path.basename(file, path.extname(file));

        return {
            metadata,
            slug,
            content,
        };
    });
}

/**
 * @name getPosts
 * @description
 * A high-level function to get all posts from a specified subdirectory within the project.
 * It constructs the path and then uses `getMDXData` to fetch and parse the post files.
 * @param {string[]} [customPath=['', '', '', '']] - An array of path segments to be joined to the current working directory.
 * @returns {{ metadata: Metadata, slug: string, content: string }[]} An array of post data objects.
 */
export function getPosts(customPath = ['', '', '', '']) {
    const postsDir = path.join(process.cwd(), ...customPath);
    return getMDXData(postsDir);
}