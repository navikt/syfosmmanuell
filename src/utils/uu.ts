export function cleanId(input: string): string {
    return input.replace(/\s+/g, '-').toLowerCase()
}
