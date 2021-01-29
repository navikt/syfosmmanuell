import { Periode } from '../types/sykmeldingTypes';
import {
  hentDagerMellomDatoer,
  tilLesbarDatoUtenAarstall,
  tilLesbarDatoMedArstall,
  tilLesbarPeriodeUtenArstall,
  tilLesbarPeriodeMedArstall,
  getFirstFomInPeriod,
} from './datoUtils';

it('hentDagerMellomDatoer Beregner riktig antall dager mellom to datoer', () => {
  const fom = new Date('2018-10-18');
  const tom = new Date('2018-11-01');

  const expected = 15;

  const durationInDays = hentDagerMellomDatoer(fom, tom);
  expect(durationInDays).toEqual(expected);

  const fom2 = new Date('Thu Oct 18 2018 00:00:00 GMT+0200 (Central European Summer Time)');
  const tom2 = new Date('Mon Nov 12 2018 00:00:00 GMT+0100 (Central European Standard Time)');

  const expected2 = 26;

  const durationInDays2 = hentDagerMellomDatoer(fom2, tom2);
  expect(durationInDays2).toEqual(expected2);

  const fom3 = new Date('2020-02-29');
  const tom3 = new Date('2020-02-29');

  const expected3 = 1;

  const durationInDays3 = hentDagerMellomDatoer(fom3, tom3);
  expect(durationInDays3).toEqual(expected3);

  const fom4 = new Date('2018-12-31');
  const tom4 = new Date('2019-01-01');

  const expected4 = 2;

  const durationInDays4 = hentDagerMellomDatoer(fom4, tom4);
  expect(durationInDays4).toEqual(expected4);
});

it('hentDagerMellomDatoer Returns undefined if a date is undefined', () => {
  const fom = new Date('2018-10-14');

  const expected = undefined;

  const durationInDays = hentDagerMellomDatoer(fom, undefined);
  expect(durationInDays).toEqual(expected);
});

it('tilLesbarDatoUtenAarstall Returnerer dato uten årstall', () => {
  const dato = new Date('2020-02-29');
  const expected = '29. februar';

  const result = tilLesbarDatoUtenAarstall(dato);
  expect(result).toEqual(expected);
});

it('tilLesbarDatoMedArstall Returnerer dato med årstall', () => {
  const dato = new Date('2020-02-29');
  const expected = '29. februar 2020';

  const result = tilLesbarDatoMedArstall(dato);
  expect(result).toEqual(expected);
});

it('tilLesbarPeriodeUtenArstall Returnerer periode uten årstall', () => {
  const fom = '2019-12-29';
  const tom = '2020-01-29';
  const expected = '29. desember – 29. januar';

  const result = tilLesbarPeriodeUtenArstall(fom, tom);
  expect(result).toEqual(expected);
});

it('tilLesbarPeriodeMedArstall Returnerer periode med årstall', () => {
  const fom = new Date('2019-12-29');
  const tom = new Date('2020-01-29');
  const expected = '29. desember 2019 – 29. januar 2020';

  const result = tilLesbarPeriodeMedArstall(fom, tom);
  expect(result).toEqual(expected);

  const fom2 = new Date('2020-01-29');
  const tom2 = new Date('2020-02-29');
  const expected2 = '29. januar – 29. februar 2020';

  const result2 = tilLesbarPeriodeMedArstall(fom2, tom2);
  expect(result2).toEqual(expected2);
});

it('getFirstFomInPeriod Returns the correct first fom in the period', () => {
  const fom = new Date('2020-01-29');
  const tom = new Date('2020-02-29');

  const fom2 = new Date('2019-12-29');
  const tom2 = new Date('2020-01-29');

  const periods: Periode[] = [
    { fom, tom, reisetilskudd: false },
    { fom: fom2, tom: tom2, reisetilskudd: false },
  ];

  const expected = new Date('2019-12-29');

  const result = getFirstFomInPeriod(periods);
  expect(result).toEqual(expected);
});
