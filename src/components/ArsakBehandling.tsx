/*
import * as React from 'react';
import { ValidationResult, RuleNames } from '../types/ValidationResultTypes';
import { Sykmelding } from '../types/SykmeldingTypes';
import { useState, useEffect } from 'react';

import SykmeldingVisning from './SykmeldingVisning';
import Knapper, { KnappeTekst } from './Knapper';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';

import './ArsakBehandling.less';
import useArsakVurdering from '../hooks/useArsakVurdering';

interface ArsakBehandlingProps {
    arsaker: ValidationResult;
    sykmelding: Sykmelding;
    handterFerdigstill(arsaker: ValidationResult, erGodkjent: boolean): void;
    handterAvbryt(): void;
}

const ArsakBehandling: React.FC<ArsakBehandlingProps> = ({
    arsaker,
    sykmelding,
    handterFerdigstill,
    handterAvbryt,
}: ArsakBehandlingProps) => {
    const {
        arsakVurdering,
        currentArsak,
        antallArsakerVurdert,
        totalVurdering,
        oppdaterArsakVurdering: oppdaterArsakVurdering,
    } = useArsakVurdering();

    const enkelArsakVisning = (
        <div className="sykmelding-visning">
            <SykmeldingVisning arsaker={arsaker} sykmelding={sykmelding} />
            <Knapper
                regel={arsaker.ruleHits[0].ruleName}
                knappeTekst={KnappeTekst.FERDIGSTILL}
                handterAvgjorelse={oppdaterArsakVurdering}
                handterAvbryt={arsakVurderingAvbrutt}
            />
        </div>
    );

    const flerarsakVisning = (
        <>
            {!currentArsak && arsakVurdering && (
                <>
                    <div className="arsak-visning">
                        <Element>Årsaker til manuell behandling</Element>
                        <ol className="liste arsak-liste">
                            {arsaker.ruleHits.map((arsak, index) => {
                                return (
                                    <li key={index} className="liste__element arsak-liste__element">
                                        <div className="arsak-liste__element--number">
                                            {<Element>{index + 1}.</Element>}
                                        </div>
                                        <div className="arsak-liste__element--venstre">
                                            {<Normaltekst>{arsak.ruleName}.</Normaltekst>}
                                        </div>
                                        <div className="arsak-liste__element--hoyre">
                                            {arsakVurdering.get(arsak.ruleName) == true && (
                                                <img
                                                    src="src/img/check-circle-2.svg"
                                                    alt="Declined icon"
                                                    className="ikon"
                                                />
                                            )}
                                            {arsakVurdering.get(arsak.ruleName) == false && (
                                                <img
                                                    src="src/img/cross-circle.svg"
                                                    alt="Declined icon"
                                                    className="ikon"
                                                />
                                            )}
                                            {arsakVurdering.get(arsak.ruleName) == null && (
                                                <Knapp
                                                    form="kompakt"
                                                    htmlType="button"
                                                    onClick={(): void => setCurrentArsak(arsak.ruleName)}
                                                >
                                                    Vurder
                                                </Knapp>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                    <div className="innsending">
                        {totalVurdering == null && (
                            <Knapp disabled htmlType="button" className="innsending__ferdigstill">
                                {KnappeTekst.FERDIGSTILL}
                            </Knapp>
                        )}
                        {totalVurdering != null && (
                            <Knapp htmlType="button" onClick={(): void => handterFerdigstill(arsaker, totalVurdering)}>
                                {KnappeTekst.FERDIGSTILL}
                            </Knapp>
                        )}
                        <Flatknapp onClick={handterAvbryt} className="innsending__avbryt">
                            Avbryt
                        </Flatknapp>
                    </div>
                </>
            )}
            {currentArsak && arsakVurdering && (
                <div className="sykmelding-visning">
                    <SykmeldingVisning arsaker={arsaker} sykmelding={sykmelding} />
                    <Knapper
                        regel={currentArsak}
                        knappeTekst={KnappeTekst.LAGRE}
                        handterAvgjorelse={oppdaterArsakVurdering}
                        handterAvbryt={arsakVurderingAvbrutt}
                    />
                </div>
            )}
        </>
    );

    return <>{arsaker.ruleHits.length == 1 ? enkelArsakVisning : flerarsakVisning}</>;
};

export default ArsakBehandling;
*/
