import Chevron from 'nav-frontend-chevron';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { useEffect, useRef, useState } from 'react';

interface ExpandableProps {
    erApen: boolean;
    tittel: React.ReactNode | string;
    children: React.ReactNode;
    className?: string;
}

const Expandable = (props: ExpandableProps) => {
    const [erApen, setErApen] = useState<boolean>(props.erApen);
    const [innholdHeight, setInnholdHeight] = useState<number>(0);
    const expandable = useRef<HTMLDivElement>(null);
    const jsToggle = useRef<HTMLButtonElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const innhold = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setErApen(props.erApen);
        setInnholdHeight(innhold.current!.offsetHeight);
    }, [props.erApen]);

    const onButtonClick = () => {
        expandable.current!.focus();
        setErApen(!erApen);
    };

    return (
        <div
            ref={expandable}
            tabIndex={-1}
            className={'expandable intern' + (props.className ? ' ' + props.className : '') + (erApen ? ' apen' : '')}
        >
            <button
                aria-expanded={erApen}
                ref={jsToggle}
                onClick={onButtonClick}
                type={'button'}
                className="expandable__toggle"
            >
                <Normaltekst tag="h3" className="expandable__tittel">
                    {props.tittel}
                </Normaltekst>
                <span className="expandable__handling">
                    <Chevron type={erApen ? 'opp' : 'ned'} />
                </span>
            </button>

            <div
                ref={container}
                className={'expandable__innholdContainer' + (erApen ? ' apen' : '')}
                style={{ maxHeight: erApen ? innholdHeight * 2 + 'px' : '0' }}
            >
                <div ref={innhold} className="expandable__innhold">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Expandable;
