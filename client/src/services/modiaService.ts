import { z } from 'zod';
import { getModiaContextOboAccessToken } from './tokenService';
import { logger } from '../utils/logger';

export interface ModiaContext {
  navn: string;
  ident: string;
  aktivEnhet: string | null;
  enheter: { enhetId: string; navn: string }[];
}

export async function getModiaContext(userAccessToken: string): Promise<ModiaContext> {
  if (process.env.NODE_ENV === 'development') {
    return {
      navn: 'Johan J. Johansson',
      ident: '0129381203',
      enheter: [
        { enhetId: '0312', navn: 'NAV Sagene' },
        { enhetId: '0314', navn: 'NAV Fagene' },
      ],
      aktivEnhet: '0314',
    };
  }

  const modiaContextAccessToken = await getModiaContextOboAccessToken(userAccessToken);

  const [veileder, aktivEnhet] = await Promise.all([
    getVeileder(modiaContextAccessToken),
    getAktivEnhet(modiaContextAccessToken),
  ]);

  return {
    aktivEnhet: aktivEnhet.aktivEnhet,
    navn: veileder.navn,
    ident: veileder.ident,
    enheter: veileder.enheter,
  };
}

// TODO rødde
async function getVeileder(modiaContextAccessToken: string): Promise<Veileder> {
  const url = `${process.env['MODIA_CONTEXT_URL']}/modiacontextholder/api/decorator`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${modiaContextAccessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // TODO EDB
      throw new Error(`Modia context responded with ${response.status} ${response.statusText}`);
    }

    const maybeVeileder = Veileder.safeParse(await response.json());

    if (maybeVeileder.success) {
      return maybeVeileder.data;
    } else {
      // TODO EDB
      throw new Error(`Unable to parse modia context response: ${maybeVeileder.error.message}`);
    }
  } catch (e) {
    logger.error('Unable to get veileder from modia context');
    throw e;
  }
}

// TODO rødde
async function getAktivEnhet(modiaContextAccessToken: string): Promise<AktivEnhet> {
  const url = `${process.env['MODIA_CONTEXT_URL']}/modiacontextholder/api/aktivenhet`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${modiaContextAccessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // TODO EDB
      throw new Error(`Modia aktiv enhet responded with ${response.status} ${response.statusText}`);
    }

    const maybeAktivEnhet = AktivEnhet.safeParse(await response.json());

    if (maybeAktivEnhet.success) {
      return maybeAktivEnhet.data;
    } else {
      // TODO EDB
      throw new Error(`Unable to parse modia aktiv enhet response: ${maybeAktivEnhet.error.message}`);
    }
  } catch (e) {
    logger.error('Unable to get aktiv enhet from modia context');
    throw e;
  }
}

const Veileder = z.object({
  ident: z.string(),
  navn: z.string(),
  enheter: z.array(
    z.object({
      enhetId: z.string(),
      navn: z.string(),
    }),
  ),
});

const AktivEnhet = z.object({
  aktivEnhet: z.string().nullable(),
});

type Veileder = z.infer<typeof Veileder>;
type AktivEnhet = z.infer<typeof AktivEnhet>;
