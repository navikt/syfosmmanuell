import { Knapp } from 'nav-frontend-knapper'
import { RadioPanelGruppe, Label } from 'nav-frontend-skjema'
import Spinner from 'nav-frontend-spinner'
import { useForm, Controller } from 'react-hook-form'

import { clientEnvs } from '../../utils/env'

import FeiloppsummeringContainer from './FeiloppsummeringContainer'
import InfoTilBehandlerOgPasient from './InfoTilBehandlerOgPasient'
import classes from './Form.module.css'

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
    const { errors } = formState
    const watchStatus = watch('status')
    const watchMerknad = watch('merknad')

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                render={({ field: { onChange, value } }) => (
                    <RadioPanelGruppe
                        className={classes.radioGroup}
                        name="status"
                        onChange={onChange}
                        checked={value}
                        feil={errors.status?.message}
                        radios={[
                            // TODO vise enhet her sammen med knappen?
                            { id: 'b-status', label: 'Godkjenn tilbakedatering', value: 'GODKJENT' },
                            {
                                id: 'b-status-godkjent-med-merknad',
                                label: 'Registrer med merknad',
                                value: 'GODKJENT_MED_MERKNAD',
                            },
                        ]}
                    />
                )}
            />

            {watchStatus === 'GODKJENT_MED_MERKNAD' && (
                <>
                    <Label htmlFor="b-merknad">Velg merknadtype</Label>
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
                        render={({ field: { onChange, value } }) => (
                            <RadioPanelGruppe
                                className={classes.radioGroup}
                                name="merknad"
                                onChange={onChange}
                                checked={value}
                                feil={errors.merknad?.message}
                                radios={[
                                    {
                                        id: 'b-merknad',
                                        label: 'Avslå tilbakedatering, hele eller deler av sykmeldingen er ugyldig.',
                                        value: 'UGYLDIG_TILBAKEDATERING',
                                    },
                                    {
                                        id: 'b-merknad-tilbakedatering-krever-flere-opplysninger',
                                        label: 'Behov for flere opplysninger.',
                                        value: 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER',
                                    },
                                ]}
                            />
                        )}
                    />
                </>
            )}

            <div className={classes.infoTilBehandlerOgPasient}>
                <InfoTilBehandlerOgPasient type={watchMerknad} />
            </div>

            <FeiloppsummeringContainer className={classes.feiloppsummering} formState={formState} />

            <Knapp id="submit-button" type="hoved" htmlType="submit" disabled={submitting}>
                Registrer
                {submitting && <Spinner className={classes.submitSpinner} />}
            </Knapp>
            <a href={clientEnvs.NEXT_PUBLIC_GOSYS_URL} className={`knapp knapp--flat ${classes.cancel}`}>
                Avbryt
            </a>
        </form>
    )
}

export default Form
