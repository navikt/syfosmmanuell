import './Expandable.less';

import Chevron from 'nav-frontend-chevron';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { useEffect, useRef, useState } from 'react';

// Get the top position of an element in the document
export function erSynligIViewport(element: HTMLElement) {
  if (!element) {
    return false;
  }
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const Vis = (props: { hvis: any; children: React.ReactNode }) => {
  return props.hvis === undefined || props.hvis === null || props.hvis === false || props.hvis === ''
    ? (null as any)
    : props.children;
};

interface ExpandableProps {
  erApen: boolean;
  tittel: React.ReactNode | string;
  systemtittel?: React.ReactNode | string;
  children: React.ReactNode;
  ikon?: string;
  ikonHover?: string;
  ikonAltTekst?: string;
  className?: string;
  visLukk?: boolean;
  type?: 'intern' | undefined;
  fixedHeight?: boolean;
}

const Expandable = (props: ExpandableProps) => {
  const [erApen, setErApen] = useState<boolean>(props.erApen);
  const [innholdHeight, setInnholdHeight] = useState<number>(0);
  const expandable = useRef<HTMLDivElement>(null);
  const jsToggle = useRef<HTMLButtonElement>(null);
  const btnImage = useRef<HTMLImageElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const innhold = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setErApen(props.erApen);
    setInnholdHeight(props.fixedHeight ? 3000 : innhold.current!.offsetHeight);
  }, [props.erApen, props.fixedHeight]);

  function onTransitionEnd() {
    if (props.type === 'intern') return;
    if (erApen) {
      expandable.current!.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      if (!erSynligIViewport(expandable.current!)) {
        expandable.current!.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      jsToggle.current!.focus();
    }
  }

  const onButtonClick = () => {
    expandable.current!.focus();
    setErApen(!erApen);
  };

  return (
    <div
      ref={expandable}
      tabIndex={-1}
      className={
        'expandable' +
        (props.className ? ' ' + props.className : '') +
        (props.type ? ' ' + props.type : '') +
        (erApen ? ' apen' : '')
      }
    >
      <button
        aria-expanded={erApen}
        ref={jsToggle}
        onMouseEnter={props.ikon !== undefined ? () => (btnImage.current!.src = props.ikonHover!) : undefined}
        onMouseLeave={props.ikon !== undefined ? () => (btnImage.current!.src = props.ikon!) : undefined}
        onClick={onButtonClick}
        type={'button'}
        className="expandable__toggle"
      >
        <Vis hvis={props.ikon !== undefined}>
          <img
            aria-hidden="true"
            className="expandable__ikon"
            ref={btnImage}
            alt={props.ikonAltTekst}
            src={props.ikon}
          />
        </Vis>
        <Vis hvis={props.type === undefined}>
          <div className="expandable__tittel">
            <Systemtittel tag="h3">{props.tittel}</Systemtittel>
            <Normaltekst className="expandable__tekst">{props.systemtittel}</Normaltekst>
          </div>
        </Vis>
        <Vis hvis={props.type === 'intern'}>
          <Normaltekst tag="h3" className="expandable__tittel">
            {props.tittel}
          </Normaltekst>
        </Vis>
        <span className="expandable__handling">
          <Chevron type={erApen ? 'opp' : 'ned'} />
        </span>
      </button>

      <div
        ref={container}
        className={'expandable__innholdContainer' + (erApen ? ' apen' : '')}
        onTransitionEnd={() => onTransitionEnd()}
        style={{ maxHeight: erApen ? innholdHeight * 2 + 'px' : '0' }}
      >
        <div ref={innhold} className="expandable__innhold">
          {props.children}
          <Vis hvis={props.type !== 'intern'}>
            <div className="lenkerad">
              <button
                type="button"
                className="lenke"
                aria-pressed={!erApen}
                tabIndex={(erApen ? null : -1) as any}
                onClick={() => setErApen(!erApen)}
              >
                <Normaltekst tag="span">{props.type === 'intern' ? 'Skjul' : 'Lukk'}</Normaltekst>
              </button>
            </div>
          </Vis>
        </div>
      </div>
    </div>
  );
};

export default Expandable;
