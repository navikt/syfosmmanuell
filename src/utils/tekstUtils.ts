import { Periode } from '../types/sykmelding'

export const periodeUndertekst = (periode: Periode): string => {
    if (periode.reisetilskudd) {
        return 'Reisetilskudd er angitt'
    } else if (periode.avventendeInnspillTilArbeidsgiver) {
        return 'Avventende sykmelding'
    } else if (periode.behandlingsdager) {
        return `${periode.behandlingsdager} behandlingsdag${periode.behandlingsdager > 1 ? 'er' : ''}`
    } else if (periode.gradert) {
        if (periode.gradert.grad) {
            return `${periode.gradert.grad}% sykmeldt${periode.gradert.reisetilskudd ? ' med reisetilskudd' : ''}`
        } else {
            return `Gradert med reisetilskudd (grad mangler)`
        }
    } else {
        return '100% sykmeldt'
    }
}
