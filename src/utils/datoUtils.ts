import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import utc from 'dayjs/plugin/utc';

import { Periode } from '../types/sykmelding';

dayjs.locale('nb');
dayjs.extend(utc);

export const tilLesbarPeriodeMedArstall = (fomString: string, tomString: string): string => {
    const fom = new Date(fomString);
    const tom = new Date(tomString);

    const erSammeAar = fom.getFullYear() === tom.getFullYear();
    const erSammeMaaned = fom.getMonth() === tom.getMonth();

    if (erSammeAar && erSammeMaaned) {
        return `${fom.getDate()}. - ${tilLesbarDatoMedArstall(tomString)}`;
    }

    if (erSammeAar) {
        return `${tilLesbarDatoUtenAarstall(fomString)} - ${tilLesbarDatoMedArstall(tomString)}`;
    }

    return `${tilLesbarDatoMedArstall(fomString)} - ${tilLesbarDatoMedArstall(tomString)}`;
};

export const tilLesbarDatoMedArstall = (datoArg?: string | null) => {
    if (!datoArg) {
        return undefined;
    }
    return dayjs(datoArg).format('DD. MMMM YYYY');
};

export const tilLesbarDatoUtenAarstall = (datoArg: string) => {
    return dayjs(datoArg).format('DD. MMMM');
};

export const countDaysBetweenTwoDatesIncludingFom = (fra?: string, til?: string) => {
    if (!fra || !til) {
        return undefined;
    }

    const diff = dayjs(til).diff(fra, 'day');

    // Include starting date
    return diff + 1;
};

export function daysBetweenDates(first: string, second: string): number {
    return Math.abs(dayjs(first).diff(dayjs(second), 'day'));
}

export function getSykmeldingStartDate(sykmeldingsperioder: Periode[]): string {
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
