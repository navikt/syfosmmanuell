import { useState, useEffect } from 'react';
import { Sykmelding } from '../types/SykmeldingTypes';
import { ValidationResult } from '../types/ValidationResultTypes';

interface UseFetchSykmeldingInterface {
    arsaker: ValidationResult;
    sykmelding: Sykmelding;
    error: Error;
    isLoading: boolean;
    callFetch: Function;
}

const useFetchSykmelding = (): UseFetchSykmeldingInterface => {
    const [arsaker, setArsaker] = useState<ValidationResult | null>(null);
    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async (): Promise<void> => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                if (json.validationResult) {
                    setArsaker(new ValidationResult(json.validationResult));
                    setSykmelding(new Sykmelding(json.sykmelding));
                    setIsLoading(false);
                } else {
                    throw new Error('Sykmelding mangler begrunnelse');
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [url]);

    return { arsaker, sykmelding, error, isLoading, callFetch: setUrl };
};

export default useFetchSykmelding;
