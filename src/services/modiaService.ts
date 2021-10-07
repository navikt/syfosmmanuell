import { z } from 'zod';

import { logger } from '../utils/logger';
import { ClientError } from '../utils/typeUtils';
import { isDevOrDemo } from '../utils/env';

import { getModiaContextOboAccessToken } from './tokenService';

export interface ModiaContext {
  navn: string;
  ident: string;
  aktivEnhet: string | null;
  enheter: { enhetId: string; navn: string }[];
}

export type ModiaContextError = ClientError<'MODIA_ERROR' | 'PARSE_ERROR'>;

export async function getModiaContext(userAccessToken: string): Promise<ModiaContext | ModiaContextError> {
  if (isDevOrDemo) {
    logger.warn('Using mocked modia context for local development (or demo)');
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
    getVeileder(userAccessToken, modiaContextAccessToken),
    getAktivEnhet(userAccessToken, modiaContextAccessToken),
  ]);

  if ('errorType' in aktivEnhet) {
    return aktivEnhet;
  } else if ('errorType' in veileder) {
    return veileder;
  }

  return {
    aktivEnhet: aktivEnhet.aktivEnhet,
    navn: veileder.navn,
    ident: veileder.ident,
    enheter: veileder.enheter,
  };
}

async function getVeileder(
  accessToken: string,
  modiaContextAccessToken: string,
): Promise<Veileder | ModiaContextError> {
  const url = `${process.env['MODIA_CONTEXT_URL']}/modiacontextholder/api/decorator/v2`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `isso-accesstoken=${modiaContextAccessToken}`,
      },
    });

    if (!response.ok) {
      const errorMessage = `Modia context responded with ${response.status} ${
        response.statusText
      }, body: ${await response.text()}`;
      logger.error(errorMessage);
      return {
        errorType: 'MODIA_ERROR',
        message: errorMessage,
      };
    }

    const maybeVeileder = Veileder.safeParse(await response.json());

    if (maybeVeileder.success) {
      return maybeVeileder.data;
    } else {
      const errorMessage = `Unable to parse modia context response: ${maybeVeileder.error.message}`;
      logger.error(errorMessage);
      return {
        errorType: 'PARSE_ERROR',
        message: errorMessage,
      };
    }
  } catch (e) {
    logger.error('Unknown modia error: Unable to get veileder from modia context');
    throw e;
  }
}

async function getAktivEnhet(
  userAccessToken: string,
  modiaContextAccessToken: string,
): Promise<AktivEnhet | ModiaContextError> {
  const url = `${process.env['MODIA_CONTEXT_URL']}/modiacontextholder/api/context/aktivenhet`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        Cookie: `isso-accesstoken=${modiaContextAccessToken}`,
      },
    });

    if (!response.ok) {
      return {
        errorType: 'MODIA_ERROR',
        message: `Modia aktiv enhet responded with ${response.status} ${response.statusText}`,
      };
    }

    const maybeAktivEnhet = AktivEnhet.safeParse(await response.json());

    if (maybeAktivEnhet.success) {
      return maybeAktivEnhet.data;
    } else {
      return {
        errorType: 'PARSE_ERROR',
        message: `Unable to parse modia aktiv enhet response: ${maybeAktivEnhet.error.message}`,
      };
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
