import { ValidationResult, ValidationResultWithStatus } from '../types/ValidationresultTypes';

describe('ValidationresultTypes', () => {
    let validationResult;
    beforeEach(() => {
        validationResult = new ValidationResultWithStatus(mockValidationResult);
    });

    it('Skal parse alle felt', () => {
        expect(JSON.stringify(validationResult)).toBe(JSON.stringify(mockValidationResultParset));
    });
});

const mockValidationResult = {
    status: 'MANUAL_PROCESSING',
    ruleHits: [
        {
            ruleName: 'BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L',
            messageForSender:
                'Manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapittel L (muskel- og skjelettsykdommer)',
            messageForUser:
                'Manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapittel L (muskel- og skjelettsykdommer)',
            ruleStatus: 'MANUAL_PROCESSING',
        },
    ],
};

const mockValidationResultParset = {
    status: 'MANUAL_PROCESSING',
    ruleHits: [
        {
            ruleName:
                'Manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapittel L (muskel- og skjelettsykdommer)',
            messageForSender:
                'Manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapittel L (muskel- og skjelettsykdommer)',
            messageForUser:
                'Manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapittel L (muskel- og skjelettsykdommer)',
            ruleStatus: 'MANUAL_PROCESSING',
        },
    ],
    behandlet: {},
    antallBehandlet: 0,
    totalVurdering: null,
};
