import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

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

export function hentDagerMellomDatoer(fra: Date, til: Date) {
    const format = "YYYY-MM-DD";
    const f = dayjs.utc(fra, format);
    const t = dayjs.utc(til, format);

    const diff = t.diff(f, 'day');

    if (diff === 0) {
        return 1;
    }

    if (diff === 1) {
        return 2;
    }

    // +2 for å inkludere til og fra-datoen
    return diff + 1;
}
