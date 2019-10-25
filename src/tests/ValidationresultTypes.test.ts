import { ValidationResult, ValidationResultWithStatus, RuleNames } from '../types/ValidationresultTypes';

describe('ValidationresultTypes', () => {
    let validationResult: ValidationResultWithStatus;
    beforeEach(() => {
        validationResult = new ValidationResultWithStatus(mockValidationResult);
    });

    it('Skal parse alle felt', () => {
        expect(JSON.stringify(validationResult)).toBe(JSON.stringify(mockValidationResultParset));
    });

    it('Skal sette behandlet-flagg for arsak til true', () => {
        validationResult.setBehandlet(RuleNames[validationResult.ruleHits[0].ruleName], true);
        expect(validationResult.behandlet.get(RuleNames[validationResult.ruleHits[0].ruleName])).toBeTruthy();
    });

    it('Skal sette behandlet-flagg for arsak til false', () => {
        validationResult.setBehandlet(RuleNames[validationResult.ruleHits[0].ruleName], false);
        expect(validationResult.behandlet.get(RuleNames[validationResult.ruleHits[0].ruleName])).toBeFalsy();
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
