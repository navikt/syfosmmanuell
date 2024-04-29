import { it, expect } from 'vitest'

import { Periode } from '../types/sykmelding'

import { sorterPerioderEldsteFoerst } from './sorterSykmeldingUtils'

const periodeDefaultValues = {
    reisetilskudd: false,
    aktivitetIkkeMulig: null,
    avventendeInnspillTilArbeidsgiver: null,
    gradert: null,
    behandlingsdager: null,
}

it('sorterPerioderEldsteFoerst Sorterer perioder i kronologisk rekkefølge', () => {
    const periode1: Periode = {
        fom: '2020-02-29',
        tom: '2020-03-01',
        ...periodeDefaultValues,
    }
    const periode2: Periode = {
        fom: '2020-01-29',
        tom: '2020-03-02',
        ...periodeDefaultValues,
    }
    const periode3: Periode = {
        fom: '2020-03-03',
        tom: '2020-03-07',
        ...periodeDefaultValues,
    }
    const periode4: Periode = {
        fom: '2019-03-03',
        tom: '2021-03-07',
        ...periodeDefaultValues,
    }

    const perioder = [periode1, periode2, periode3, periode4]
    const expected = [periode4, periode2, periode1, periode3]

    const result = sorterPerioderEldsteFoerst(perioder)
    expect(result).toEqual(expected)
})
