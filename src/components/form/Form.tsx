import { useForm, Controller } from 'react-hook-form'
import { Button, Radio, RadioGroup } from '@navikt/ds-react'

import { browserEnv } from '../../utils/env'

import FeiloppsummeringContainer from './FeiloppsummeringContainer'
import InfoTilBehandlerOgPasient from './InfoTilBehandlerOgPasient'

export type Status =
    | 'GODKJENT'
    | 'UGYLDIG_TILBAKEDATERING'
    | 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER'
    | 'DELVIS_GODKJENT'

interface Props {
    onSubmit: (values: FormShape) => void
    submitting: boolean
}

export interface FormShape {
    status: Status
}

const Form = ({ onSubmit, submitting }: Props) => {
    const { control, handleSubmit, formState, watch } = useForm<FormShape>()
    const watchStatus = watch('status')

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8 ml-4">
                <Controller
                    control={control}
                    name="status"
                    rules={{
                        validate: (value) => {
                            if (
                                [
                                    'GODKJENT',
                                    'UGYLDIG_TILBAKEDATERING',
                                    'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER',
                                    'DELVIS_GODKJENT',
                                ].includes(value)
                            ) {
                                return true
                            }
                            return 'Oppgaven mangler vurdering'
                        },
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <RadioGroup
                            className="mt-4"
                            name="status"
                            legend="Velg vurdering av sykmelding"
                            hideLegend
                            onChange={(value) => onChange(value)}
                            value={value ?? ''}
                            error={error?.message}
                        >
                            <Radio value="GODKJENT">Godkjenn hele sykmeldingen</Radio>
                            <Radio value="DELVIS_GODKJENT">Godkjenn deler av sykmeldingen</Radio>
                            <Radio value="TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER">
                                Behov for flere opplysninger
                            </Radio>
                            <Radio value="UGYLDIG_TILBAKEDATERING">Avslå hele sykmeldingen som ugyldig</Radio>
                        </RadioGroup>
                    )}
                />
            </div>

            <InfoTilBehandlerOgPasient type={watchStatus} />
            <FeiloppsummeringContainer formState={formState} />

            <div className="mb-8 mt-16 flex gap-4">
                <Button id="submit-button" variant="primary" type="submit" loading={submitting}>
                    Registrer
                </Button>
                <Button as="a" variant="secondary" href={browserEnv.NEXT_PUBLIC_GOSYS_URL}>
                    Avbryt
                </Button>
            </div>
        </form>
    )
}

export default Form
