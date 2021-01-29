import { Periode } from '../types/sykmeldingTypes';
import {
  countDaysBetweenTwoDatesIncludingFom,
  tilLesbarDatoUtenAarstall,
  tilLesbarDatoMedArstall,
  tilLesbarPeriodeUtenArstall,
  tilLesbarPeriodeMedArstall,
  getFirstFomInPeriod,
} from './datoUtils';

describe('countDaysBetweenTwoDatesIncludingFom', () => {
  it('Calculates correct number of days between two dates in different months', () => {
    const fom = new Date('2018-10-18');
    const tom = new Date('2018-11-01');

    const expected = 15;

    const durationInDays = countDaysBetweenTwoDatesIncludingFom(fom, tom);
    expect(durationInDays).toEqual(expected);
  });
  it('Calculates correct number of days between two of the same dates', () => {
    const fom = new Date('2020-02-29');
    const tom = new Date('2020-02-29');

    const expected = 1;

    const durationInDays = countDaysBetweenTwoDatesIncludingFom(fom, tom);
    expect(durationInDays).toEqual(expected);
  });
  it('Calculates correct number of days between two dates in different years', () => {
    const fom = new Date('2018-12-31');
    const tom = new Date('2019-01-01');

    const expected = 2;

    const durationInDays = countDaysBetweenTwoDatesIncludingFom(fom, tom);
    expect(durationInDays).toEqual(expected);
  });
  it('Returns undefined if a date is undefined', () => {
    const fom = new Date('2018-10-14');

    const expected = undefined;

    const durationInDays = countDaysBetweenTwoDatesIncludingFom(fom, undefined);
    expect(durationInDays).toEqual(expected);
  });
});

describe('tilLesbarDatoUtenAarstall', () => {
  it('Returnerer dato uten årstall', () => {
    const dato = new Date('2020-02-29');
    const expected = '29. februar';

    const result = tilLesbarDatoUtenAarstall(dato);
    expect(result).toEqual(expected);
  });

  it('Returnerer dato med årstall', () => {
    const dato = new Date('2020-02-29');
    const expected = '29. februar 2020';

    const result = tilLesbarDatoMedArstall(dato);
    expect(result).toEqual(expected);
  });

  it('Returnerer periode uten årstall', () => {
    const fom = '2019-12-29';
    const tom = '2020-01-29';
    const expected = '29. desember – 29. januar';

    const result = tilLesbarPeriodeUtenArstall(fom, tom);
    expect(result).toEqual(expected);
  });

  it('Returnerer periode med årstall', () => {
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
