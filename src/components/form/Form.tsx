import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering, FeiloppsummeringFeil, RadioPanelGruppe } from 'nav-frontend-skjema';
import React, { useEffect, useRef } from 'react';
import { useForm, Controller, DeepMap, FieldError } from 'react-hook-form';
import { arsaker, FormShape } from '../../types/formTypes';
import { Result } from '../../types/resultTypes';
import './Form.less';
import HvaViSierTilBehandlerOgPasient from './HvaViSierTilBehandlerOgPasient';

const getFeilOppsummeringsfeil = (errors: DeepMap<FormShape, FieldError>): FeiloppsummeringFeil[] =>
  Object.entries(errors).map(([key, value]) => ({ skjemaelementId: `b-${key}`, feilmelding: value?.message! }));

const hasErrors = (errors: DeepMap<FormShape, FieldError>): boolean => !!Object.keys(errors).length;

interface FormProps {
  ferdigstillOppgave: (result: Result) => void;
}

const Form = ({ ferdigstillOppgave }: FormProps) => {
  const { control, handleSubmit, errors, watch } = useForm<FormShape>();
  const watchGodkjent = watch('godkjent');
  const watchAvvisningstekst = watch('avvisningstekst');
  const feiloppsummeringRef = useRef<HTMLDivElement>();

  const onSubmit = (data: FormShape) => {
    const result: Result = {
      ...data,
      godkjent: data.godkjent === 'true',
    };
    ferdigstillOppgave(result);
  };

  useEffect(() => {
    if (hasErrors(errors)) {
      feiloppsummeringRef?.current?.focus();
    }
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="godkjent"
        rules={{ required: 'Oppgaven mangler vurdering' }}
        render={({ onChange, value }) => (
          <RadioPanelGruppe
            className="radio-group"
            name="godkjent"
            onChange={onChange}
            checked={value}
            feil={errors.godkjent?.message}
            radios={[
              { id: 'b-godkjent', label: 'Godkjenn tilbakedatering', value: 'true' },
              { label: 'Avvis tilbakedatering', value: 'false' },
            ]}
          />
        )}
      />
      {watchGodkjent === 'false' && (
        <Controller
          control={control}
          name="avvisningstekst"
          rules={{ required: 'Oppgaven mangler avvisningsningsårsak' }}
          render={({ onChange, value }) => (
            <RadioPanelGruppe
              className="radio-group"
              legend="Velg årsak"
              name="avvisningstekst"
              onChange={onChange}
              checked={value}
              feil={errors.avvisningstekst?.message}
              radios={[
                {
                  id: 'b-avvisningstekst',
                  label: arsaker.TILBAKEDATERT_MANGLER_BEGRUNNELSE.label,
                  value: arsaker.TILBAKEDATERT_MANGLER_BEGRUNNELSE.key,
                },
                { label: arsaker.TILBAKEDATERT_IKKE_GODTATT.label, value: arsaker.TILBAKEDATERT_IKKE_GODTATT.key },
              ]}
            />
          )}
        />
      )}
      <HvaViSierTilBehandlerOgPasient arsak={watchAvvisningstekst} />
      {hasErrors(errors) && (
        <Feiloppsummering
          className="feiloppsummering"
          innerRef={feiloppsummeringRef as any}
          tittel="For å gå videre må du rette opp følgende"
          feil={getFeilOppsummeringsfeil(errors)}
        />
      )}
      <Knapp type="hoved" htmlType="submit">
        Ferdigstill
      </Knapp>
    </form>
  );
};

export default Form;
