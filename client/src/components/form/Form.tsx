import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering, FeiloppsummeringFeil, RadioPanelGruppe } from 'nav-frontend-skjema';
import React, { useEffect, useRef } from 'react';
import { useForm, Controller, DeepMap, FieldError } from 'react-hook-form';
import './Form.less';
import InfoTilPasientAvslag from './infoTil/InfoTilPasientAvslag';
import HvaGjorJegNa from './hvaGjorJegNa/HvaGjorJegNa';
import InfoTilPasientAvvisning from './infoTil/InfoTilPasientAvvisning';
import InfoTilBehandlerAvvisning from './infoTil/InfoTilBehandlerAvvisning';

export interface FormShape {
  status: 'GODKJENT' | 'UGYLDIG_TILBAKEDATERING' | 'UGYLDIG_BEGRUNNELSE';
}

const getFeilOppsummeringsfeil = (errors: DeepMap<FormShape, FieldError>): FeiloppsummeringFeil[] =>
  Object.entries(errors).map(([key, value]) => ({ skjemaelementId: `b-${key}`, feilmelding: value?.message! }));

const hasErrors = (errors: DeepMap<FormShape, FieldError>): boolean => !!Object.keys(errors).length;

interface FormProps {
  ferdigstillOppgave: (result: FormShape) => void;
}

const Form = ({ ferdigstillOppgave }: FormProps) => {
  const { control, handleSubmit, errors, watch } = useForm<FormShape>();
  const watchGodkjent = watch('status');
  const feiloppsummeringRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (hasErrors(errors)) {
      feiloppsummeringRef?.current?.focus();
    }
  }, [errors]);

  return (
    <form className="form" onSubmit={handleSubmit(ferdigstillOppgave)}>
      <Controller
        control={control}
        name="status"
        rules={{
          validate: (value) => {
            if (['GODKJENT', 'UGYLDIG_TILBAKEDATERING', 'UGYLDIG_BEGRUNNELSE'].includes(value)) {
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
              { label: 'Avslå tilbakedatering', value: 'UGYLDIG_TILBAKEDATERING' },
              { label: 'Be om ny begrunnelse', value: 'UGYLDIG_BEGRUNNELSE' },
            ]}
          />
        )}
      />

      {watchGodkjent === 'UGYLDIG_TILBAKEDATERING' && (
        <>
          <InfoTilPasientAvslag />
          <HvaGjorJegNa />
        </>
      )}

      {watchGodkjent === 'UGYLDIG_BEGRUNNELSE' && (
        <>
          <InfoTilPasientAvvisning />
          <InfoTilBehandlerAvvisning />
        </>
      )}

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
      <a href={process.env.GOSYS_URL} className="knapp knapp--flat form__cancel">
        Avbryt
      </a>
    </form>
  );
};

export default Form;
