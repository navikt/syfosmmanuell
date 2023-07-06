import { ReactElement, useEffect, useRef } from 'react'
import { FormState } from 'react-hook-form'
import { ErrorSummary } from '@navikt/ds-react'

import { FormShape } from './Form'

interface FeiloppsummeringContainerProps {
    className?: string
    formState: FormState<FormShape> // Must pass in whole state object to be able to react to changes
}

function FeiloppsummeringContainer({ className, formState }: FeiloppsummeringContainerProps): ReactElement | null {
    const { errors } = formState
    const feiloppsummeringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        feiloppsummeringRef.current?.focus()
    }, [formState])

    const feiloppsummeringsfeil = Object.entries(errors)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => ({ skjemaelementId: `b-${key}`, feilmelding: value.message ?? 'Ukjent feil' }))

    if (feiloppsummeringsfeil.length === 0) {
        return null
    }

    return (
        <ErrorSummary id="feiloppsummering" className={className} heading="For å gå videre må du rette opp følgende">
            {feiloppsummeringsfeil.map((feil) => (
                <ErrorSummary.Item key={feil.skjemaelementId} href={`#${feil.skjemaelementId}`}>
                    {feil.feilmelding}
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    )
}

export default FeiloppsummeringContainer
