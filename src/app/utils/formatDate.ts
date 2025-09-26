/**
 * @name formatDate
 * @description
 * Formats a date string into a more readable format.
 * It can return either a full date string (e.g., "September 26, 2025") or a string that includes a relative time (e.g., "September 26, 2025 (3d ago)").
 * @param {string} date - The date string to format. Can be in 'YYYY-MM-DD' or ISO format.
 * @param {boolean} [includeRelative=false] - Whether to include the relative time in the formatted string.
 * @returns {string} - The formatted date string.
 */
export function formatDate(date: string, includeRelative = false) {
    const currentDate = new Date();

    if (!date.includes('T')) {
        date = `${date}T00:00:00`;
    }

    const targetDate = new Date(date);
    const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    const daysAgo = currentDate.getDate() - targetDate.getDate();

    let formattedDate = '';

    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo}y ago`;
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}mo ago`;
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo}d ago`;
    } else {
        formattedDate = 'Today';
    }

    const fullDate = targetDate.toLocaleString('en-us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    if (!includeRelative) {
        return fullDate;
    }

    return `${fullDate} (${formattedDate})`;
}