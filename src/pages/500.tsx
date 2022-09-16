import React from 'react';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';

function NotFound(): JSX.Element {
    return (
        <section>
            <main>
                <Systemtittel>En ukjent feil har oppstått. Vi jobber nok med å løse problemet.</Systemtittel>
                <Undertittel>Dersom problemet fortsetter, kan du kontakte oss.</Undertittel>
            </main>
        </section>
    );
}

export default NotFound;
