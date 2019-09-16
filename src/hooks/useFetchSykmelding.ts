import { useState, useEffect } from "react";
import { Sykmelding } from "../types/sykmeldingTypes";

const useFetchSykmelding = () => {
    const [begrunnelse, setBegrunnelse] = useState<string | null>(null);
    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [url, setUrl] = useState<string | null>(null);

    useEffect( () => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                if (json.begrunnelse) {
                    setBegrunnelse(json.begrunnelse);
                    setSykmelding(new Sykmelding(json.sykmelding));
                    setIsLoading(false);
                } else {
                    throw new Error('Sykmelding mangler begrunnelse');
                }
            }
            catch(error) {
                setError(error);
            };
        }
        fetchData();
    }, [url]);

    return( { begrunnelse, sykmelding, error, isLoading, callFetch: setUrl } );
}

export default useFetchSykmelding;