import React, { useState } from 'react';
import { Radio } from 'nav-frontend-skjema';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';
import './Vurderingspanel.less';

interface VurderingspanelProps {
  handterAvgjorelse: (avgjorelse: boolean) => void;
  handterAvbryt: () => void;
}

const Vurderingspanel = ({ handterAvgjorelse, handterAvbryt }: VurderingspanelProps) => {
  const [erGodkjent, setErGodkjent] = useState<boolean | undefined>(undefined);

  return (
    <div className="radio-og-knapper">
      <span className="radio-og-knapper__radiogruppe">
        <Radio
          label={`Godkjenn`}
          name="radiogruppe"
          value="godkjent"
          onChange={() => setErGodkjent(true)}
          checked={erGodkjent === true}
        />
        <Radio
          label={`Avvis`}
          name="radiogruppe"
          value="avvist"
          onChange={() => setErGodkjent(false)}
          checked={erGodkjent === false}
        />
      </span>
      <span className="radio-og-knapper__knapper">
        <Knapp
          disabled={erGodkjent === undefined}
          onClick={() => {
            if (erGodkjent !== undefined) {
              handterAvgjorelse(erGodkjent);
            } else {
              throw new Error('En regel ble forsøkt vurdert til "undefined"');
            }
          }}
        >
          Ferdigstill
        </Knapp>
        <Flatknapp onClick={handterAvbryt}>Avbryt</Flatknapp>
      </span>
    </div>
  );
};

export default Vurderingspanel;
