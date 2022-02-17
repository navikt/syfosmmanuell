import React, { PropsWithChildren } from 'react';

const Innrykk = ({ children }: PropsWithChildren<unknown>) => {
  if (!children) {
    return null;
  }

  return <div style={{ marginLeft: '2.5rem' }}>{children}</div>;
};

export default Innrykk;
