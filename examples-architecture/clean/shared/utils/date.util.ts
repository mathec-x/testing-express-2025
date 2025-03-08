export function formatDate(date: Date, format: string): string {
    const options: Intl.DateTimeFormatOptions = {};

    if (format.includes('YYYY')) {
        options.year = 'numeric';
    }
    if (format.includes('MM')) {
        options.month = '2-digit';
    }
    if (format.includes('DD')) {
        options.day = '2-digit';
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function parseDate(dateString: string, format: string): Date | null {
    const parts = dateString.split(/[-/]/);
    let year: number | undefined;
    let month: number | undefined;
    let day: number | undefined;

    if (format === 'YYYY-MM-DD') {
        year = parseInt(parts[0]);
        month = parseInt(parts[1]) - 1; // Months are 0-based in JavaScript
        day = parseInt(parts[2]);
    } else if (format === 'DD/MM/YYYY') {
        day = parseInt(parts[0]);
        month = parseInt(parts[1]) - 1;
        year = parseInt(parts[2]);
    }

    if (year !== undefined && month !== undefined && day !== undefined) {
        return new Date(year, month, day);
    }

    return null;
}