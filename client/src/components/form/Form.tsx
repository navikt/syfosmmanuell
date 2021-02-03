import { Knapp } from 'nav-frontend-knapper';
import { Feiloppsummering, FeiloppsummeringFeil, RadioPanelGruppe, Label } from 'nav-frontend-skjema';
import React, { useEffect, useRef } from 'react';
import { useForm, Controller, DeepMap, FieldError } from 'react-hook-form';
import './Form.less';
import InfoTilBehandlerOgPasient from './InfoTilBehandlerOgPasient';

type Status = 'GODKJENT' | 'GODKJENT_MED_MERKNAD' | 'AVVIST';
export type Merknad = 'UGYLDIG_TILBAKEDATERING' | 'KREVER_FLERE_OPPLYSNINGER';
export type Avvisningstype = 'MANGLER_BEGRUNNELSE' | 'UGYLDIG_BEGRUNNELSE';

export interface FormShape {
  status: Status;
  merknad?: Merknad; // if status === true and needs merknad
  avvisningstype?: Avvisningstype; // if stasus === false
}

const getFeilOppsummeringsfeil = (errors: DeepMap<FormShape, FieldError>): FeiloppsummeringFeil[] =>
  Object.entries(errors).map(([key, value]) => ({ skjemaelementId: `b-${key}`, feilmelding: value?.message! }));

const hasErrors = (errors: DeepMap<FormShape, FieldError>): boolean => !!Object.keys(errors).length;

interface FormProps {
  ferdigstillOppgave: (result: FormShape) => void;
}

const Form = ({ ferdigstillOppgave }: FormProps) => {
  const { control, handleSubmit, errors, watch } = useForm<FormShape>();
  const watchStatus = watch('status');
  const watchMerknad = watch('merknad');
  const watchAvvisningstype = watch('avvisningstype');

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
              { label: 'Godkjenn med merknad', value: 'GODKJENT_MED_MERKNAD' },
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
                if (['UGYLDIG_TILBAKEDATERING', 'KREVER_FLERE_OPPLYSNINGER'].includes(value)) {
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
                  { id: 'b-merknad', label: 'Tilbakedateringen er ugyldig', value: 'UGYLDIG_TILBAKEDATERING' },
                  { label: 'Behov for flere opplysninger', value: 'KREVER_FLERE_OPPLYSNINGER' },
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
            name="avvisningstype"
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
                feil={errors.avvisningstype?.message}
                radios={[
                  {
                    id: 'b-avvisningstype',
                    label: 'Begrunnelse for tilbakedatering mangler',
                    value: 'MANGLER_BEGRUNNELSE',
                  },
                  { label: 'Begrunnelsen for tilbakedateringen er ugyldig', value: 'UGYLDIG_BEGRUNNELSE' },
                ]}
              />
            )}
          />
        </>
      )}

      <div className="form__info-til-behandler-og-pasient">
        <InfoTilBehandlerOgPasient type={watchMerknad || watchAvvisningstype} />
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
      <a href={process.env.GOSYS_URL} className="knapp knapp--flat form__cancel">
        Avbryt
      </a>
    </form>
  );
};

export default Form;
