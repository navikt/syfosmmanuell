import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';

function NotFound(): JSX.Element {
    return (
        <div style={{ marginTop: '32px' }}>
            <Systemtittel>Vi klarte ikke å finne denne oppgaven.</Systemtittel>
        </div>
    );
}

export default NotFound;
