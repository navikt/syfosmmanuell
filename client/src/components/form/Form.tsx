import { Knapp } from 'nav-frontend-knapper';
import { RadioPanelGruppe, Label } from 'nav-frontend-skjema';
import { useForm, Controller } from 'react-hook-form';
import FeiloppsummeringContainer from './FeiloppsummeringContainer';
import InfoTilBehandlerOgPasient from './InfoTilBehandlerOgPasient';

type Status = 'GODKJENT' | 'GODKJENT_MED_MERKNAD' | 'AVVIST';
export type Merknad = 'UGYLDIG_TILBAKEDATERING' | 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER';

interface Props {
  onSubmit: (values: FormShape) => void;
}

export interface FormShape {
  status: Status;
  merknad?: Merknad; // should be set if status === GODKJENT_MED_MERKNAD
}

const Form = ({ onSubmit }: Props) => {
  const { control, handleSubmit, formState, watch } = useForm<FormShape>();
  const { errors } = formState;
  const watchStatus = watch('status');
  const watchMerknad = watch('merknad');

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="status"
        rules={{
          validate: (value) => {
            if (['GODKJENT', 'GODKJENT_MED_MERKNAD'].includes(value)) {
              return true;
            }
            return 'Oppgaven mangler vurdering';
          },
        }}
        render={({ field: { onChange, value } }) => (
          <RadioPanelGruppe
            className="form__radio-group"
            name="status"
            onChange={onChange}
            checked={value}
            feil={errors.status?.message}
            radios={[
              { id: 'b-status', label: 'Godkjenn tilbakedatering', value: 'GODKJENT' },
              { id: 'b-status-godkjent-med-merknad', label: 'Registrer med merknad', value: 'GODKJENT_MED_MERKNAD' },
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
                if (value && ['UGYLDIG_TILBAKEDATERING', 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER'].includes(value)) {
                  return true;
                }
                return 'Mangler merknad';
              },
            }}
            render={({ field: { onChange, value } }) => (
              <RadioPanelGruppe
                className="form__radio-group"
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

      <div className="form__info-til-behandler-og-pasient">
        <InfoTilBehandlerOgPasient type={watchMerknad} />
      </div>

      <FeiloppsummeringContainer formState={formState} />

      <Knapp id="submit-button" type="hoved" htmlType="submit">
        Registrer
      </Knapp>
      <a href={process.env.REACT_APP_GOSYS_URL} className="knapp knapp--flat form__cancel">
        Avbryt
      </a>
    </form>
  );
};

export default Form;
