import { z } from 'zod';

export interface ModiaContext {
  navn: string;
  ident: string;
  aktivEnhet: string | null;
  enheter: { enhetId: string; navn: string }[];
}

export async function getModiaContext(userAccessToken: string, oidcClient: any): Promise<ModiaContext> {
  // exchange user token with modia token

  const modiaContextAccessToken = await getModiaContextAccessToken(userAccessToken, oidcClient);

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

async function getVeileder(modiaContextAccessToken: string): Promise<Veileder> {
  if (process.env.NODE_ENV === 'development') {
    return Veileder.parse({
      navn: 'Johan J. Johansson',
      ident: '0129381203',
      enheter: [
        { enhetId: '0312', navn: 'NAV Sagene' },
        { enhetId: '0314', navn: 'NAV Fagene' },
      ],
    });
  }

  throw new Error('TODO: Not yet implemented');

  const url = `${process.env['MODIA_CONTEXT_URL']}/modiacontextholder/api/decorator`;
  // TODO: do the fetch
}

async function getAktivEnhet(modiaContextAccessToken: string): Promise<AktivEnhet> {
  if (process.env.NODE_ENV === 'development') {
    return AktivEnhet.parse({
      aktivEnhet: '0314',
    });
  }

  throw new Error('TODO: Not yet implemented');
  const url = `${process.env['MODIA_CONTEXT_URL']}/modiacontextholder/api/aktivenhet`;
  // TODO: do the fetch
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

async function getModiaContextAccessToken(userAccessToken: string, oidcClient: any): Promise<string> {
  throw new Error('not implementy');
}
