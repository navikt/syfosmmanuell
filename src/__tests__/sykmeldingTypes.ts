import {
  Sykmelding,
  AnnenFraverGrunn,
  HarArbeidsgiver,
  MedisinskArsakType,
  ArbeidsrelatertArsakType,
  SvarRestriksjon,
} from '../types/sykmeldingTypes';
import { oppgaveFlereRegler } from '../mock/data/sykmelding';
import dayjs from 'dayjs';

describe('sykmeldingTypes', () => {
  it('Parser JSON sykmelding til Sykmelding object', () => {
    const { receivedSykmelding } = oppgaveFlereRegler[0];
    const { sykmelding } = receivedSykmelding;
    const sykmeldingParsed = new Sykmelding(sykmelding);

    const {
      id: _id,
      msgId: _msgId,
      pasientAktoerId: _pasientAktoerId,
      medisinskVurdering: _medisinskVurdering,
      skjermesForPasient: _skjermesForPasient,
      arbeidsgiver: _arbeidsgiver,
      perioder: _perioder,
      prognose: _prognose,
      utdypendeOpplysninger: _utdypendeOpplysninger,
      tiltakArbeidsplassen: _tiltakArbeidsplassen,
      tiltakNAV: _tiltakNAV,
      andreTiltak: _andreTiltak,
      meldingTilNAV: _meldingTilNAV,
      meldingTilArbeidsgiver: _meldingTilArbeidsgiver,
      kontaktMedPasient: _kontaktMedPasient,
      behandletTidspunkt: _behandletTidspunkt,
      behandler: _behandler,
      avsenderSystem: _avsenderSystem,
      syketilfelleStartDato: _syketilfelleStartDato,
      signaturDato: _signaturDato,
      navnFastlege: _navnFastlege,
    } = sykmelding;

    const {
      id,
      msgId,
      pasientAktoerId,
      medisinskVurdering,
      skjermesForPasient,
      arbeidsgiver,
      perioder,
      prognose,
      utdypendeOpplysninger,
      tiltakArbeidsplassen,
      tiltakNAV,
      andreTiltak,
      meldingTilNAV,
      meldingTilArbeidsgiver,
      kontaktMedPasient,
      behandletTidspunkt,
      behandler,
      avsenderSystem,
      syketilfelleStartDato,
      signaturDato,
      navnFastlege,
    } = sykmeldingParsed;

    expect(id).toEqual(_id);
    expect(msgId).toEqual(_msgId);
    expect(pasientAktoerId).toEqual(_pasientAktoerId);
    expect(medisinskVurdering.hovedDiagnose?.kode).toEqual(_medisinskVurdering.hovedDiagnose.kode);
    expect(medisinskVurdering.hovedDiagnose?.system).toEqual(_medisinskVurdering.hovedDiagnose.system);
    expect(medisinskVurdering.hovedDiagnose?.tekst).toEqual(_medisinskVurdering.hovedDiagnose.tekst);
    medisinskVurdering.biDiagnoser.forEach((biDiagnose, index) => {
      expect(biDiagnose.kode).toEqual(_medisinskVurdering.biDiagnoser[index].kode);
      expect(biDiagnose.system).toEqual(_medisinskVurdering.biDiagnoser[index].system);
      expect(biDiagnose.tekst).toEqual(_medisinskVurdering.biDiagnoser[index].tekst);
    });
    expect(medisinskVurdering.svangerskap).toEqual(_medisinskVurdering.svangerskap);
    expect(medisinskVurdering.yrkesskade).toEqual(_medisinskVurdering.yrkesskade);
    expect(dayjs(medisinskVurdering.yrkesskadeDato).format('YYYY-MM-DD')).toEqual(_medisinskVurdering.yrkesskadeDato);
    expect(medisinskVurdering.annenFraversArsak?.beskrivelse).toEqual(
      _medisinskVurdering.annenFraversArsak.beskrivelse,
    );
    medisinskVurdering.annenFraversArsak?.grunn.forEach((grunn, index) => {
      expect(grunn).toEqual(
        AnnenFraverGrunn[_medisinskVurdering.annenFraversArsak.grunn[index] as keyof typeof AnnenFraverGrunn],
      );
    });
    expect(skjermesForPasient).toEqual(_skjermesForPasient);
    expect(arbeidsgiver.harArbeidsgiver).toEqual(
      HarArbeidsgiver[_arbeidsgiver.harArbeidsgiver as keyof typeof HarArbeidsgiver],
    );
    expect(arbeidsgiver.navn).toEqual(_arbeidsgiver.navn);
    expect(arbeidsgiver.stillingsprosent).toEqual(_arbeidsgiver.stillingsprosent);
    expect(arbeidsgiver.yrkesbetegnelse).toEqual(_arbeidsgiver.yrkesbetegnelse);
    perioder.forEach((periode, index) => {
      expect(dayjs(periode.fom).format('YYYY-MM-DD')).toEqual(_perioder[index].fom);
      expect(dayjs(periode.tom).format('YYYY-MM-DD')).toEqual(_perioder[index].tom);
      expect(periode.aktivitetIkkeMulig?.medisinskArsak?.beskrivelse).toEqual(
        _perioder[index].aktivitetIkkeMulig.medisinskArsak.beskrivelse,
      );
      periode.aktivitetIkkeMulig?.medisinskArsak?.arsak.forEach((arsak, arsakIndex) => {
        expect(arsak).toEqual(
          MedisinskArsakType[
            _perioder[index].aktivitetIkkeMulig.medisinskArsak.arsak[arsakIndex] as keyof typeof MedisinskArsakType
          ],
        );
      });
      expect(periode.aktivitetIkkeMulig?.arbeidsrelatertArsak?.beskrivelse).toEqual(
        _perioder[index].aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse,
      );
      periode.aktivitetIkkeMulig?.arbeidsrelatertArsak?.arsak.forEach((arsak, arsakIndex) => {
        expect(arsak).toEqual(
          ArbeidsrelatertArsakType[
            _perioder[index].aktivitetIkkeMulig.arbeidsrelatertArsak.arsak[
              arsakIndex
            ] as keyof typeof ArbeidsrelatertArsakType
          ],
        );
      });
      expect(periode.avventendeInnspillTilArbeidsgiver).toEqual(_perioder[index].avventendeInnspillTilArbeidsgiver);
      expect(periode.behandlingsdager).toEqual(_perioder[index].behandlingsdager);
      expect(periode.gradert).toEqual(_perioder[index].gradert);
      expect(periode.reisetilskudd).toEqual(_perioder[index].reisetilskudd);
    });
    expect(prognose?.arbeidsforEtterPeriode).toEqual(_prognose.arbeidsforEtterPeriode);
    expect(prognose?.hensynArbeidsplassen).toEqual(_prognose.hensynArbeidsplassen);
    expect(prognose?.erIArbeid?.annetArbeidPaSikt).toEqual(_prognose.erIArbeid.annetArbeidPaSikt);
    expect(prognose?.erIArbeid?.egetArbeidPaSikt).toEqual(_prognose.erIArbeid.egetArbeidPaSikt);
    expect(dayjs(prognose?.erIArbeid?.arbeidFOM).format('YYYY-MM-DD')).toEqual(_prognose.erIArbeid.arbeidFOM);
    expect(dayjs(prognose?.erIArbeid?.vurderingsdato).format('YYYY-MM-DD')).toEqual(_prognose.erIArbeid.vurderingsdato);
    expect(prognose?.erIkkeIArbeid).toEqual(undefined);

    Array.from(utdypendeOpplysninger.entries()).forEach(([key, value], index) => {
      expect(key).toEqual(Object.keys(_utdypendeOpplysninger)[index]);
      Array.from(value.entries()).forEach(([_key, _value], _index) => {
        const level2 = Object.values(_utdypendeOpplysninger)[index];
        const level2values = Object.values(level2);
        expect(_key).toEqual(Object.keys(level2)[_index]);
        expect(_value.sporsmal).toEqual(level2values[_index].sporsmal);
        expect(_value.svar).toEqual(level2values[_index].svar);
        _value.restriksjoner.forEach((restriksjon, restriksjonIndex) => {
          expect(restriksjon).toEqual(
            SvarRestriksjon[level2values[_index].restriksjoner[restriksjonIndex] as keyof typeof SvarRestriksjon],
          );
        });
      });
    });
    expect(tiltakArbeidsplassen).toEqual(_tiltakArbeidsplassen);
    expect(tiltakNAV).toEqual(_tiltakNAV);
    expect(andreTiltak).toEqual(_andreTiltak);
    expect(meldingTilNAV?.beskrivBistand).toEqual(_meldingTilNAV.beskrivBistand);
    expect(meldingTilNAV?.bistandUmiddelbart).toEqual(_meldingTilNAV.bistandUmiddelbart);
    expect(meldingTilArbeidsgiver).toEqual(_meldingTilArbeidsgiver);
    expect(meldingTilArbeidsgiver).toEqual(_meldingTilArbeidsgiver);
    expect(dayjs(kontaktMedPasient.kontaktDato).format('YYYY-MM-DD')).toEqual(_kontaktMedPasient.kontaktDato);
    expect(kontaktMedPasient.begrunnelseIkkeKontakt).toEqual(_kontaktMedPasient.begrunnelseIkkeKontakt);
    expect(dayjs(behandletTidspunkt).format('YYYY-MM-DDTHH:mm:ss')).toEqual(_behandletTidspunkt);
    expect(behandler.adresse).toEqual(_behandler.adresse);
    expect(behandler.aktoerId).toEqual(_behandler.aktoerId);
    expect(behandler.etternavn).toEqual(_behandler.etternavn);
    expect(behandler.fornavn).toEqual(_behandler.fornavn);
    expect(behandler.mellomnavn).toEqual(_behandler.mellomnavn);
    expect(behandler.fnr).toEqual(_behandler?.fnr);
    expect(behandler.her).toEqual(_behandler?.her);
    expect(behandler.hpr).toEqual(_behandler?.hpr);
    expect(behandler.tlf).toEqual(_behandler.tlf);
    expect(avsenderSystem.navn).toEqual(_avsenderSystem.navn);
    expect(avsenderSystem.versjon).toEqual(_avsenderSystem.versjon);
    expect(dayjs(syketilfelleStartDato).format('YYYY-MM-DD')).toEqual(_syketilfelleStartDato);
    expect(dayjs(signaturDato).format('YYYY-MM-DDTHH:mm:ss')).toEqual(_signaturDato);
    expect(navnFastlege).toEqual(_navnFastlege);
  });

  it('Kaster error ved forsøk på parsing av ugyldig JSON', () => {
    const tomtObjekt = {};
    expect(() => {
      new Sykmelding(tomtObjekt);
    }).toThrowError();
  });
});
