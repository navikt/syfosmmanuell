import { Knapp } from 'nav-frontend-knapper';
import { RadioPanelGruppe, Label } from 'nav-frontend-skjema';
import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StoreContext } from '../../data/store';
import { ApiError, vurderOppgave } from '../../utils/dataUtils';
import { logger } from '../../utils/logger';
import FeiloppsummeringContainer from './FeiloppsummeringContainer';
import InfoTilBehandlerOgPasient from './InfoTilBehandlerOgPasient';
import { ManuellOppgave } from '../../types/manuellOppgave';

type Status = 'GODKJENT' | 'GODKJENT_MED_MERKNAD' | 'AVVIST';
export type Merknad = 'UGYLDIG_TILBAKEDATERING' | 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER';

interface Props {
  manuellOppgave: ManuellOppgave;
  aktivEnhet: string;
  // TODO edb
  // onSubmit: (values: FormShape) => void;
}

export interface FormShape {
  status: Status;
  merknad?: Merknad; // should be set if status === GODKJENT_MED_MERKNAD
}

const Form = ({ manuellOppgave, aktivEnhet }: Props) => {
  const { control, handleSubmit, formState, watch } = useForm<FormShape>();
  const { errors } = formState;
  const watchStatus = watch('status');
  const watchMerknad = watch('merknad');

  const ferdigstillOppgave = async (result: FormShape) => {
    if (!aktivEnhet) {
      logger.warn('Missing enhet while trying to submit');
      alert(
        'Enhet mangler. Sørg for at du har valgt enhet i menyen øverst på siden. Forsøk deretter å registrere vurdering på nytt.',
      );
    } else {
      // dispatch({ type: 'FETCHING' });

      try {
        await vurderOppgave(`${manuellOppgave?.oppgaveid}`, aktivEnhet, result);
        // dispatch({ type: 'TASK_COMPLETED' });
        logger.info('Submit success');
      } catch (error) {
        // TODO don't any
        logger.error(error as any);
        if (error instanceof ApiError) {
          // dispatch({ type: 'ERROR', payload: error });
        } else {
          // dispatch({ type: 'ERROR', payload: new Error('En ukjent feil oppsto ved vurdering av oppgaven.') });
        }
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(ferdigstillOppgave)}>
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
