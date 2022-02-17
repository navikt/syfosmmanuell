import React, { PropsWithChildren } from 'react';

interface MarginProps {
  liten?: boolean;
  stor?: boolean;
}

const Margin = ({ children, liten, stor }: PropsWithChildren<MarginProps>) => {
  if (!children) {
    return null;
  }

  const marginBottom = liten ? '1rem' : stor ? '4rem' : '2rem';

  return <div style={{ marginBottom }}>{children}</div>;
};

export default Margin;
