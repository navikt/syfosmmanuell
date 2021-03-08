import React from 'react';

import EnkelCheckbox from '../layout/EnkelCheckbox';

interface SvangerskapSeksjonProps {
  svangerskap: boolean;
}

const SvangerskapSeksjon = ({ svangerskap }: SvangerskapSeksjonProps) => {
  if (!svangerskap) {
    return null;
  }
  return <EnkelCheckbox tittel="Sykdommen er svangerskapsrelatert" checked margin vis bold />;
};

export default SvangerskapSeksjon;
