import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import utc from 'dayjs/plugin/utc';
import { Periode } from '../types/sykmeldingTypes';

dayjs.locale('nb');
dayjs.extend(utc);

export const tilLesbarPeriodeMedArstall = (fom: Date, tom: Date): string => {
  const erSammeAar = fom.getFullYear() === tom.getFullYear();
  const erSammeMaaned = fom.getMonth() === tom.getMonth();

  if (erSammeAar && erSammeMaaned) {
    return `${fom.getDate()}. - ${tilLesbarDatoMedArstall(tom)}`;
  }

  if (erSammeAar) {
    return `${tilLesbarDatoUtenAarstall(fom)} - ${tilLesbarDatoMedArstall(tom)}`;
  }

  return `${tilLesbarDatoMedArstall(fom)} - ${tilLesbarDatoMedArstall(tom)}`;
};

export const tilLesbarDatoMedArstall = (datoArg?: Date) => {
  if (!datoArg) {
    return undefined;
  }
  return dayjs(datoArg).format('DD. MMMM YYYY');
};

export const tilLesbarDatoUtenAarstall = (datoArg: Date) => {
  return dayjs(datoArg).format('DD. MMMM');
};

export const countDaysBetweenTwoDatesIncludingFom = (fra?: Date, til?: Date) => {
  if (!fra || !til) {
    return undefined;
  }

  const diff = dayjs(til).diff(fra, 'day');

  // Include starting date
  return diff + 1;
};

export function daysBetweenDates(first: Date, second: Date): number {
  return Math.abs(dayjs(first).diff(dayjs(second), 'day'));
}

export function getSykmeldingStartDate(sykmeldingsperioder: Periode[]): Date {
  // Sykmelding without period should get rejected before this point
  if (sykmeldingsperioder.length === 0) {
    throw new Error('sykmeldingsperioder is empty');
  }
  return sykmeldingsperioder.reduce((acc, value) => {
    if (dayjs(value.fom).isBefore(dayjs(acc.fom))) {
      return value;
    }

    return acc;
  }).fom;
}
