import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering, FeiloppsummeringFeil, RadioPanelGruppe, Label } from 'nav-frontend-skjema';
import React, { useContext, useEffect, useRef } from 'react';
import { useForm, Controller, DeepMap, FieldError } from 'react-hook-form';
import { StoreContext } from '../../data/store';
import { ApiError, vurderOppgave } from '../../utils/dataUtils';
import { logger } from '../../utils/logger';
import './Form.less';
import InfoTilBehandlerOgPasient from './InfoTilBehandlerOgPasient';

type Status = 'GODKJENT' | 'GODKJENT_MED_MERKNAD' | 'AVVIST';
export type Merknad = 'UGYLDIG_TILBAKEDATERING' | 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER';

export interface FormShape {
  status: Status;
  merknad?: Merknad; // should be set if status === GODKJENT_MED_MERKNAD
}

const getFeilOppsummeringsfeil = (errors: DeepMap<FormShape, FieldError>): FeiloppsummeringFeil[] =>
  Object.entries(errors).map(([key, value]) => ({ skjemaelementId: `b-${key}`, feilmelding: value?.message! }));

const hasErrors = (errors: DeepMap<FormShape, FieldError>): boolean => !!Object.keys(errors).length;

const Form = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { manuellOppgave, enhet } = state;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormShape>();
  const watchStatus = watch('status');
  const watchMerknad = watch('merknad');

  const feiloppsummeringRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (hasErrors(errors)) {
      feiloppsummeringRef?.current?.focus();
    }
  }, [errors]);

  const ferdigstillOppgave = async (result: FormShape) => {
    if (!enhet) {
      logger.warn('Missing enhet while trying to submit');
      alert(
        'Enhet mangler. Sørg for at du har valgt enhet i menyen øverst på siden. Forsøk deretter å registrere vurdering på nytt.',
      );
    } else {
      dispatch({ type: 'FETCHING' });

      try {
        await vurderOppgave(`${manuellOppgave?.oppgaveid}`, enhet!!, result);
        dispatch({ type: 'TASK_COMPLETED' });
        logger.info('Submit success');
      } catch (error) {
        logger.error({ ...error, message: error.message ?? 'Unknown error message while submitting' });
        if (error instanceof ApiError) {
          dispatch({ type: 'ERROR', payload: error });
        } else {
          dispatch({ type: 'ERROR', payload: new Error('En ukjent feil oppsto ved vurdering av oppgaven.') });
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

      {hasErrors(errors) && (
        <Feiloppsummering
          id="feiloppsummering"
          className="form__feiloppsummering"
          innerRef={feiloppsummeringRef as any}
          tittel="For å gå videre må du rette opp følgende"
          feil={getFeilOppsummeringsfeil(errors)}
        />
      )}

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
