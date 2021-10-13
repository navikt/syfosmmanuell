# syfosmmanuell

Saksbehandlerfrontend for manuell behandling av tilbakedaterte sykemeldinger. Tillater saksbehandler å `godkjenne` eller `godkjenne med merknad`. Merknader vises for bruker sluttbruker.

Applikasjonen er en NextJS app med API routes for data fetching og lagring.
- Frontenden rendres og prepopuleres med en sykmelding som skal behandles (SSR).
- Dataen er fetched fra modiacontextholder og syfosmmanuell-backend. For hver av disse veksles inn i en token spesifikt for tjenesten som skal prates med.
- Når behandlingen er gjennomført utføres det et POST kall til syfosmmanuell-backend, her veksles også token.

`client browser --> next API routes som veksler tokens --> downstream APIs`

En demoside er offentlig tilgjengelig på: https://syfosmmanuell.labs.nais.io/

## Utvikling

Pass på at du har yarn installert, om du ikke har det: `npm i -g yarn`

### Utvikling:
```bash
$ yarn
$ yarn start
```
Vil laste miljøvariabler fra `/.env.development`

## Test
Bruker React Testing Library for
```bash
$ yarn test
```

## Testing av tjenesteflyt i testmiljø
Applikasjonen er tilgjengelig i testmiljø på https://syfosmmanuell.dev.adeo.no/?oppgaveid={oppgaveid} lokalt via `naisdevice` eller via utviklerimage. `oppgaveid` referer til oppgaven som opprettes i `syfosmmanuell-backend` og lagres i tilhørende database.
