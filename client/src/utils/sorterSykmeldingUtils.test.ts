import { Periode } from "../types/sykmeldingTypes";
import { sorterPerioderEldsteFoerst } from "./sorterSykmeldingUtils";

it('sorterPerioderEldsteFoerst Sorterer perioder i kronologisk rekkefølge', () => {
    const periode1: Periode = {
        fom: new Date("2020-02-29"),
        tom: new Date("2020-03-01"),
        reisetilskudd: false,
    }
    const periode2: Periode = {
        fom: new Date("2020-01-29"),
        tom: new Date("2020-03-02"),
        reisetilskudd: false,
    }
    const periode3: Periode = {
        fom: new Date("2020-03-03"),
        tom: new Date("2020-03-07"),
        reisetilskudd: false,
    }
    const periode4: Periode = {
        fom: new Date("2019-03-03"),
        tom: new Date("2021-03-07"),
        reisetilskudd: false,
    }

    const perioder = [periode1, periode2, periode3, periode4];
    const expected = [periode4, periode2, periode1, periode3];

    const result = sorterPerioderEldsteFoerst(perioder);
    expect(result).toEqual(expected);
});