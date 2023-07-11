import React from 'react'
import { Heading, Panel } from '@navikt/ds-react'
import Image from 'next/image'

import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon'
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder'
import Tilbakedateringsinfo from '../../infopanel/utdypendeelementer/Tilbakedateringsinfo'
import { Sykmelding } from '../../../types/sykmelding'
import plaster from '../../../svg/plaster.svg'

interface TilbakedatertForlengelseProps {
    sykmelding: Sykmelding
}

const TilbakedatertForlengelse = ({ sykmelding }: TilbakedatertForlengelseProps) => {
    return (
        <Panel border className="relative">
            <div className="absolute left-0 top-0 flex h-12 w-full items-center gap-3 border-b border-border-default bg-surface-warning-moderate p-4">
                <Image src={plaster} alt="" />
                <Heading size="medium" level="3">
                    Utdrag fra sykmeldingen
                </Heading>
            </div>
            <div className="mt-12 flex flex-col gap-8 p-4">
                <SykmeldingPerioder perioder={sykmelding.perioder} />
                <div>
                    {sykmelding.medisinskVurdering.hovedDiagnose && (
                        <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
                    )}
                    {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose) => (
                        <DiagnoseSeksjon key={diagnose.kode} diagnose={diagnose} bidiagnose />
                    ))}
                </div>
                <Tilbakedateringsinfo
                    perioder={sykmelding.perioder}
                    kontaktDato={sykmelding.kontaktMedPasient.kontaktDato}
                    behandletTidspunkt={sykmelding.behandletTidspunkt}
                    begrunnelseIkkeKontakt={sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}
                    genereringsDato={sykmelding.signaturDato}
                />
            </div>
        </Panel>
    )
}

export default TilbakedatertForlengelse
