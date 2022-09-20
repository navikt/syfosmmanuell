const unverifiedClientEnvs = {
    NEXT_PUBLIC_GOSYS_URL: process.env.NEXT_PUBLIC_GOSYS_URL,
};

const missingEnvs = Object.entries(unverifiedClientEnvs).filter(([_, value]) => value == null);
if (missingEnvs.length) {
    throw new Error(
        `Missing the following NEXT_PUBLIC_ environment variables: ${missingEnvs.map(([key]) => key).join(', ')}`,
    );
}

/* Only to be used in SRR */
export const isLocalOrDemo = process.env.NODE_ENV !== 'production' || process.env.IS_NAIS_LABS_DEMO === 'true';
export const clientEnvs = unverifiedClientEnvs as Record<keyof typeof unverifiedClientEnvs, string>;

export function env(name: string, required: false): string | undefined;
export function env(name: string, required: true): string;
export function env(name: string, required?: true): string;
export function env(name: string, required = true) {
    if (!process.env[name] && required) {
        throw new Error(`Missing required environment variable '${name}'`);
    }
    return process.env[name];
}
