import { Periode } from '../types/sykmelding'

import { periodeUndertekst } from './tekstUtils'

describe('Periode undertekst', () => {
    let periode: Periode = {
        fom: '2018-10-18',
        tom: '2018-11-12',
        aktivitetIkkeMulig: null,
        avventendeInnspillTilArbeidsgiver: null,
        behandlingsdager: null,
        gradert: null,
        reisetilskudd: false,
    }

    beforeEach(() => {
        periode = {
            fom: '2018-10-18',
            tom: '2018-11-12',
            aktivitetIkkeMulig: null,
            avventendeInnspillTilArbeidsgiver: null,
            behandlingsdager: null,
            gradert: null,
            reisetilskudd: false,
        }
    })

    it('Skal vise "Reisetilskudd er angitt" ved reisetilskudd', () => {
        periode.reisetilskudd = true
        expect(periodeUndertekst(periode)).toEqual('Reisetilskudd er angitt')
    })

    it('Skal vise "Avventende sykmelding" ved avventende', () => {
        periode.avventendeInnspillTilArbeidsgiver = 'må vente'
        expect(periodeUndertekst(periode)).toEqual('Avventende sykmelding')
    })

    it('Skal vise "8 behandlingsdager" ved behandlingsdager', () => {
        periode.behandlingsdager = 8
        expect(periodeUndertekst(periode)).toEqual('8 behandlingsdager')
    })

    it('Skal vise "1 behandlingsdag" ved behandlingsdager', () => {
        periode.behandlingsdager = 1
        expect(periodeUndertekst(periode)).toEqual('1 behandlingsdag')
    })

    it('Skal vise "1 behandlingsdag" ved behandlingsdager', () => {
        periode.behandlingsdager = 1
        expect(periodeUndertekst(periode)).toEqual('1 behandlingsdag')
    })

    it('Skal vise "56% sykmeldt" ved gradert sykmelding', () => {
        periode.gradert = {
            reisetilskudd: false,
            grad: 56,
        }
        expect(periodeUndertekst(periode)).toEqual('56% sykmeldt')
    })

    it('Skal vise "56% sykmeldt med reisetilskudd" ved gradert sykmelding', () => {
        periode.gradert = {
            reisetilskudd: true,
            grad: 56,
        }
        expect(periodeUndertekst(periode)).toEqual('56% sykmeldt med reisetilskudd')
    })

    it('Skal vise "Gradert med reisetilskudd (grad mangler)" ved gradert sykmelding', () => {
        periode.gradert = {
            reisetilskudd: true,
            grad: null,
        }
        expect(periodeUndertekst(periode)).toEqual('Gradert med reisetilskudd (grad mangler)')
    })
})
