# syfosmmanuell

Saksbehandlerfrontend for manuell behandling av tilbakedaterte sykemeldinger. Tillater saksbehandler å `godkjenne` eller `godkjenne med merknad`. Merknader vises for bruker sluttbruker.

Applikasjonen har to hovedoppgaver:
- React (CRA) frontend for UI. Lever under `/client`
- Express-server som server statisk frontendbygg, brukerautentisering mot Azure AD og reverse proxy for bakomliggende tjenester. Lever under `/server`

`client browser --> syfosmmanuell (auth/reverse-proxy) --> downstream API's`

En demoside er offentlig tilgjengelig på: https://syfosmmanuell.labs.nais.io/


## Utvikling
### Client:
```bash
$ cd /client
$ npm i
$ npm start
```
Vil laste miljøvariabler fra `/client/.env.development`

### Server:
```bash
$ cd /server
$ npm i
$ npm run dev
```
Vil laste miljøvariabler fra `/server/.env.development`

## Test
Bruker React Testing Library for
```bash
$ npm test
```

## Testing av tjenesteflyt i testmiljø
Applikasjonen er tilgjengelig i testmiljø på https://syfosmmanuell.dev.adeo.no/?oppgaveid={oppgaveid} lokalt via `naisdevice` eller via utviklerimage. `oppgaveid` referer til oppgaven som opprettes i `syfosmmanuell-backend` og lagres i tilhørende database.
