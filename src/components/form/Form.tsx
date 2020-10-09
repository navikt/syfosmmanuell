import { Knapp } from 'nav-frontend-knapper';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { arsaker, FormShape } from '../../types/formTypes';
import { Result } from '../../types/resultTypes';
import './Form.less';
import HvaViSierTilBehandlerOgPasient from './HvaViSierTilBehandlerOgPasient';

interface FormProps {
  ferdigstillOppgave: (result: Result) => void;
}

const Form = ({ ferdigstillOppgave }: FormProps) => {
  const { control, handleSubmit, errors, watch } = useForm<FormShape>();
  const watchGodkjent = watch('godkjent');
  const watchAvvisningstekst = watch('avvisningstekst');

  const onSubmit = (data: FormShape) => {
    const result: Result = {
      ...data,
      godkjent: data.godkjent === 'true' ? true : false,
    };
    ferdigstillOppgave(result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="godkjent"
        rules={{ required: 'Oppgaven mangler vurdering' }}
        render={({ onChange, value }) => (
          <RadioPanelGruppe
            className="radio-group"
            legend="Vurdering"
            name="godkjent"
            onChange={onChange}
            checked={value}
            feil={errors.godkjent?.message}
            radios={[
              { label: 'Godkjenn', value: 'true' },
              { label: 'Avvis', value: 'false' },
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
                { label: arsaker.TILBAKEDATERT_FORLENGELSE.label, value: arsaker.TILBAKEDATERT_FORLENGELSE.key },
                { label: arsaker.TILBAKEDATERT_FORSTE.label, value: arsaker.TILBAKEDATERT_FORSTE.key },
              ]}
            />
          )}
        />
      )}
      <HvaViSierTilBehandlerOgPasient arsak={watchAvvisningstekst} />
      <Knapp type="hoved" htmlType="submit">
        Ferdigstill
      </Knapp>
    </form>
  );
};

export default Form;
