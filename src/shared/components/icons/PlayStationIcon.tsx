import type { SVGProps } from 'react';

import playStationLogoSrc from './playstation-logo.png';

export const PlayStationIcon = (props: SVGProps<SVGSVGElement>) => (
  <img
    alt=''
    aria-hidden='true'
    className={props.className}
    height={props.height}
    src={playStationLogoSrc}
    style={props.style}
    width={props.width}
  />
);
