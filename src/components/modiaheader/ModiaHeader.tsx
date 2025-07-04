'use client'

import React, { ReactElement, useContext } from 'react'
import { InternalHeader } from '@navikt/ds-react'
import { Heading, Label, Select } from '@navikt/ds-react'
import Link from 'next/link'

import { ModiaContext, ModiaContextError } from '../../services/modiaService'
import { StoreContext } from '../../data/store'

interface Props {
    modiaContext?: ModiaContext | ModiaContextError
}

function ModiaHeader({ modiaContext }: Props): ReactElement {
    const { aktivEnhet, setAktivEnhet } = useContext(StoreContext)

    return (
        <InternalHeader className="justify-between">
            <InternalHeader.Title as={Link} href="/oppgaver">
                syfosmmanuell
            </InternalHeader.Title>
            <div className="flex flex-wrap">
                {modiaContext && !('errorType' in modiaContext) && (
                    <div className="-mt-2 ml-auto mr-2 flex items-center">
                        {aktivEnhet && modiaContext.enheter.length ? (
                            <Select
                                id="modia-header"
                                value={aktivEnhet}
                                label="Velg enhet"
                                hideLabel
                                className="mt-2"
                                size="small"
                                onChange={(event) => {
                                    setAktivEnhet(event.target.value)
                                }}
                            >
                                {modiaContext.enheter.map((it) => (
                                    <option key={it.enhetId} value={it.enhetId}>
                                        {it.enhetId} {it.navn}
                                    </option>
                                ))}
                            </Select>
                        ) : (
                            <div className="mr-4 mt-2 flex items-center justify-center">
                                <Label>Fant ingen enheter</Label>
                            </div>
                        )}
                    </div>
                )}
                {modiaContext && 'errorType' in modiaContext && (
                    <div className="mr-4 flex items-center justify-center">
                        <Heading size="small" level="3">
                            ⚠ Feil ved lasting av enheter
                        </Heading>
                    </div>
                )}
                {modiaContext && !('errorType' in modiaContext) && (
                    <InternalHeader.User name={modiaContext.fornavn + ' ' + modiaContext.etternavn} />
                )}
            </div>
        </InternalHeader>
    )
}

export default ModiaHeader
