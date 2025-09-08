export async function register(): Promise<void> {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        await require('pino')
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        await require('next-logger')
    }
}
