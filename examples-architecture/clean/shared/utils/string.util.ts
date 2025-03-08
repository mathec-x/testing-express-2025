export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isEmpty(str: string): boolean {
    return !str || str.trim().length === 0;
}

export function trim(str: string): string {
    return str.trim();
}

export function contains(substring: string, string: string): boolean {
    return string.includes(substring);
}

export function repeat(string: string, count: number): string {
    return string.repeat(count);
}