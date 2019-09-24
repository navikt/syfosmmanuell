import { useState, useEffect } from 'react';
import useFetchSykmelding from './useFetchSykmelding';
import { RuleNames } from '../types/ValidationResultTypes';

interface ArsakVurdering {
    arsakVurdering: Map<RuleNames, boolean | null>;
    currentArsak: RuleNames | null;
    antallArsakerVurdert: number;
    totalVurdering: boolean | null;
    oppdaterArsakVurdering: Function;
}

type Hook = () => ArsakVurdering;

const useArsakVurdering: Hook = () => {
    const { arsaker } = useFetchSykmelding();

    const [arsakVurdering, setArsakVurdering] = useState<Map<RuleNames, boolean | null> | null>(null);
    const [totalVurdering, setTotalVurdering] = useState<boolean | null>(null);
    const [currentArsak, setCurrentArsak] = useState<RuleNames | null>(null);
    const [antallArsakerVurdert, setAntallArsakerVurdert] = useState<number>(0);

    const oppdaterTotalVurdering = (): void => {
        if (arsaker.ruleHits.length == 1) {
            setTotalVurdering(arsakVurdering.get(arsaker.ruleHits[0].ruleName));
        } else if (antallArsakerVurdert == arsaker.ruleHits.length) {
            for (const [, value] of arsakVurdering) {
                if (value == false) {
                    setTotalVurdering(false);
                    break;
                }
            }
            if (totalVurdering == null) {
                setTotalVurdering(true);
            }
        }
    };

    const oppdaterArsakVurdering = (ruleName: RuleNames, vurdering: boolean): void => {
        const nyArsakVurdering: Map<RuleNames, boolean> = new Map(arsakVurdering);
        nyArsakVurdering.set(ruleName, vurdering);
        setArsakVurdering(nyArsakVurdering);
        setAntallArsakerVurdert(antallArsakerVurdert + 1);
        setCurrentArsak(null);
    };

    useEffect(() => {
        const VurderingMap: Map<RuleNames, boolean> = new Map();
        arsaker.ruleHits.forEach(rule => {
            VurderingMap.set(rule.ruleName, null);
        });
        setArsakVurdering(VurderingMap);
    }, []);

    useEffect(() => {
        oppdaterTotalVurdering();
    }, [arsakVurdering]);

    return {
        arsakVurdering,
        currentArsak,
        antallArsakerVurdert,
        totalVurdering,
        oppdaterArsakVurdering: oppdaterArsakVurdering,
    };
};

export default useArsakVurdering;
