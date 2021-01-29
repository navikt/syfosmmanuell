import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Periode } from '../types/sykmeldingTypes';
dayjs.extend(utc);

const maaneder = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember',
];
const SKILLETEGN_PERIODE = '–';

export const tilLesbarPeriodeMedArstall = (fom: Date, tom: Date): string => {
  const erSammeAar = fom.getFullYear() === tom.getFullYear();
  const erSammeMaaned = fom.getMonth() === tom.getMonth();
  return erSammeAar && erSammeMaaned
    ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
    : erSammeAar
    ? `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
    : `${tilLesbarDatoMedArstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`;
};

export const tilLesbarDatoMedArstall = (datoArg?: Date) => {
  if (!datoArg) {
    return undefined;
  }
  return `${tilLesbarDatoUtenAarstall(new Date(datoArg))} ${new Date(datoArg).getFullYear()}`;
};

export const tilLesbarPeriodeUtenArstall = (fomArg: string, tomArg: string): string => {
  const fom = new Date(fomArg);
  const tom = new Date(tomArg);
  const erSammeMaaned = fom.getMonth() === tom.getMonth();
  return erSammeMaaned
    ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
    : `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`;
};

export const tilLesbarDatoUtenAarstall = (datoArg: Date) => {
  const dato = new Date(datoArg);
  const dag = dato.getDate();
  const manedIndex = dato.getMonth();
  const maned = maaneder[manedIndex];
  return `${dag}. ${maned}`;
};

export const countDaysBetweenTwoDatesIncludingFom = (fra?: Date, til?: Date) => {
  if (!fra || !til) {
    return undefined;
  }

  const diff = dayjs(til).diff(fra, 'day');

  // Include starting date
  return diff + 1;
};

export const getFirstFomInPeriod = (periods: Periode[] | undefined) => {
  if (!periods) {
    return undefined;
  }

  return periods?.reduce((acc, val) => {
    if (!acc) {
      return val.fom;
    }

    if (dayjs(val.fom).isBefore(dayjs(acc))) {
      return val.fom;
    }
    return acc;
  }, undefined as Date | undefined);
};
