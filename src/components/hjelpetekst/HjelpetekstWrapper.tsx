import React from 'react'
import Hjelpetekst from 'nav-frontend-hjelpetekst'

interface HjelpetekstWrapperProps {
    tekst: string
}

const HjelpetekstWrapper = ({ tekst }: HjelpetekstWrapperProps) => {
    return (
        <div className="hjelpetekst-container">
            <Hjelpetekst>
                <div className="hjelpetekst-container__tekst">{tekst}</div>
            </Hjelpetekst>
        </div>
    )
}

export default HjelpetekstWrapper
