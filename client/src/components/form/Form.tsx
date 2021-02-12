import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering, FeiloppsummeringFeil, RadioPanelGruppe, Label } from 'nav-frontend-skjema';
import React, { useContext, useEffect, useRef } from 'react';
import { useForm, Controller, DeepMap, FieldError } from 'react-hook-form';
import { StoreContext } from '../../data/store';
import { ApiError, vurderOppgave } from '../../utils/dataUtils';
import './Form.less';
import InfoTilBehandlerOgPasient from './InfoTilBehandlerOgPasient';

type Status = 'GODKJENT' | 'GODKJENT_MED_MERKNAD' | 'AVVIST';
export type Merknad = 'UGYLDIG_TILBAKEDATERING' | 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER';
export type AvvisningType = 'MANGLER_BEGRUNNELSE' | 'UGYLDIG_BEGRUNNELSE';

export interface FormShape {
  status: Status;
  merknad?: Merknad; // should be set if status === GODKJENT_MED_MERKNAD
  avvisningType?: AvvisningType; // should be set if status === AVVIST
}

const getFeilOppsummeringsfeil = (errors: DeepMap<FormShape, FieldError>): FeiloppsummeringFeil[] =>
  Object.entries(errors).map(([key, value]) => ({ skjemaelementId: `b-${key}`, feilmelding: value?.message! }));

const hasErrors = (errors: DeepMap<FormShape, FieldError>): boolean => !!Object.keys(errors).length;

const Form = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { manuellOppgave, enhet } = state;

  const { control, handleSubmit, errors, watch } = useForm<FormShape>();
  const watchStatus = watch('status');
  const watchMerknad = watch('merknad');
  const watchAvvisningType = watch('avvisningType');

  const feiloppsummeringRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (hasErrors(errors)) {
      feiloppsummeringRef?.current?.focus();
    }
  }, [errors]);

  const ferdigstillOppgave = async (result: FormShape) => {
    if (!enhet) {
      alert(
        'Enhet mangler. Sørg for at du har valgt enhet i menyen øverst på siden. Forsøk deretter å registrere vurdering på nytt.',
      );
    } else {
      dispatch({ type: 'SET_LOADING' });

      try {
        await vurderOppgave(`${manuellOppgave?.oppgaveid}`, enhet!!, result);

        dispatch({ type: 'TASK_COMPLETED' });
      } catch (error) {
        console.error(error);
        if (error instanceof ApiError) {
          dispatch({ type: 'ERROR', payload: error });
        } else {
          dispatch({ type: 'ERROR', payload: new Error('En ukjnet feil oppsto ved vurdering av oppgaven.') });
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
            if (['GODKJENT', 'GODKJENT_MED_MERKNAD', 'AVVIST'].includes(value)) {
              return true;
            }
            return 'Oppgaven mangler vurdering';
          },
        }}
        render={({ onChange, value }) => (
          <RadioPanelGruppe
            className="form__radio-group"
            name="status"
            onChange={onChange}
            checked={value}
            feil={errors.status?.message}
            radios={[
              { id: 'b-status', label: 'Godkjenn tilbakedatering', value: 'GODKJENT' },
              { label: 'Registrer med merknad', value: 'GODKJENT_MED_MERKNAD' },
              { label: 'Avvis sykmeldingen', value: 'AVVIST' },
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
                if (['UGYLDIG_TILBAKEDATERING', 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER'].includes(value)) {
                  return true;
                }
                return 'Mangler merknad';
              },
            }}
            render={({ onChange, value }) => (
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
                    label: 'Behov for flere opplysninger.',
                    value: 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER',
                  },
                ]}
              />
            )}
          />
        </>
      )}

      {watchStatus === 'AVVIST' && (
        <>
          <Label htmlFor="b-avvisningstype">Velg avvisningstype</Label>
          <Controller
            control={control}
            name="avvisningType"
            rules={{
              validate: (value) => {
                if (['MANGLER_BEGRUNNELSE', 'UGYLDIG_BEGRUNNELSE'].includes(value)) {
                  return true;
                }
                return 'Mangler avvisningstype';
              },
            }}
            render={({ onChange, value }) => (
              <RadioPanelGruppe
                className="form__radio-group"
                name="avvisningstype"
                onChange={onChange}
                checked={value}
                feil={errors.avvisningType?.message}
                radios={[
                  {
                    id: 'b-avvisningstype',
                    label:
                      'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig.',
                    value: 'MANGLER_BEGRUNNELSE',
                  },
                  {
                    label:
                      'NAV kan ikke godta tilbakedateringen. Det må skrives ny sykmelding der f.o.m-dato er datoen for den første kontakten med pasienten.',
                    value: 'UGYLDIG_BEGRUNNELSE',
                  },
                ]}
              />
            )}
          />
        </>
      )}

      <div className="form__info-til-behandler-og-pasient">
        <InfoTilBehandlerOgPasient type={watchMerknad || watchAvvisningType} />
      </div>

      {hasErrors(errors) && (
        <Feiloppsummering
          className="form__feiloppsummering"
          innerRef={feiloppsummeringRef as any}
          tittel="For å gå videre må du rette opp følgende"
          feil={getFeilOppsummeringsfeil(errors)}
        />
      )}

      <Knapp type="hoved" htmlType="submit">
        Registrer
      </Knapp>
      <a href={process.env.REACT_APP_GOSYS_URL} className="knapp knapp--flat form__cancel">
        Avbryt
      </a>
    </form>
  );
};

export default Form;
