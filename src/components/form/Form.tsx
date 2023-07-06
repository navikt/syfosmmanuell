import { useForm, Controller } from 'react-hook-form'
import { Button, Radio, RadioGroup } from '@navikt/ds-react'

import { browserEnv } from '../../utils/env'

import FeiloppsummeringContainer from './FeiloppsummeringContainer'
import InfoTilBehandlerOgPasient from './InfoTilBehandlerOgPasient'

type Status = 'GODKJENT' | 'GODKJENT_MED_MERKNAD' | 'AVVIST'
export type Merknad = 'UGYLDIG_TILBAKEDATERING' | 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER'

interface Props {
    onSubmit: (values: FormShape) => void
    submitting: boolean
}

export interface FormShape {
    status: Status
    merknad?: Merknad // should be set if status === GODKJENT_MED_MERKNAD
}

const Form = ({ onSubmit, submitting }: Props) => {
    const { control, handleSubmit, formState, watch } = useForm<FormShape>()
    const watchStatus = watch('status')
    const watchMerknad = watch('merknad')

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8 ml-4">
                <Controller
                    control={control}
                    name="status"
                    rules={{
                        validate: (value) => {
                            if (['GODKJENT', 'GODKJENT_MED_MERKNAD'].includes(value)) {
                                return true
                            }
                            return 'Oppgaven mangler vurdering'
                        },
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <RadioGroup
                            className="mt-4"
                            name="status"
                            legend=""
                            onChange={(value: 'GODKJENT_MED_MERKNAD' | 'GODKJENT') => onChange(value)}
                            value={value}
                            error={error?.message}
                        >
                            {/* // TODO vise enhet her sammen med knappen? */}
                            <Radio id="b-status" value="GODKJENT">
                                Godkjenn tilbakedatering
                            </Radio>
                            <Radio id="b-status-godkjent-med-merknad" value="GODKJENT_MED_MERKNAD">
                                Registrer med merknad
                            </Radio>
                        </RadioGroup>
                    )}
                />

                {watchStatus === 'GODKJENT_MED_MERKNAD' && (
                    <Controller
                        control={control}
                        name="merknad"
                        rules={{
                            validate: (value) => {
                                if (
                                    value &&
                                    ['UGYLDIG_TILBAKEDATERING', 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER'].includes(
                                        value,
                                    )
                                ) {
                                    return true
                                }
                                return 'Mangler merknad'
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <RadioGroup
                                className="mt-4"
                                name="merknad"
                                onChange={(
                                    value: 'UGYLDIG_TILBAKEDATERING' | 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER',
                                ) => onChange(value)}
                                value={value}
                                error={error?.message}
                                legend="Velg merknadtype"
                            >
                                <Radio id="b-merknad" value="UGYLDIG_TILBAKEDATERING">
                                    Avslå tilbakedatering, hele eller deler av sykmeldingen er ugyldig.
                                </Radio>
                                <Radio
                                    id="b-merknad-tilbakedatering-krever-flere-opplysninger"
                                    value="TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER"
                                >
                                    Behov for flere opplysninger.
                                </Radio>
                            </RadioGroup>
                        )}
                    />
                )}
            </div>

            <InfoTilBehandlerOgPasient type={watchMerknad} />
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
