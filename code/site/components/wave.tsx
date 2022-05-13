import React from 'react';

export default function Wave(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <svg
      xmlns={'http://www.w3.org/2000/svg'}
      viewBox={'0 0 1440 120'}
      preserveAspectRatio={'xMaxYMin meet'}
      className={props.className}>
      <defs>
        <clipPath id={'wave'} clipPathUnits={'objectBoundingBox'}>
          <path
            d={
              'M0,0,0,0.995 C0.194,0.859,0.308,0.89,0.463,0.931 S0.819,1,1,0.924 V0 H0'
            }
          />
        </clipPath>
        <clipPath id={'smallwave'} clipPathUnits={'objectBoundingBox'}>
          <path
            d={
              'M0,0,0,0.968 C0.194,0.039,0.308,0.252,0.463,0.532 S0.819,1,1,0.484 V0 H0'
            }
          />
        </clipPath>
        <rect id={'rect'} x={0} y={0} width={'100%'} height={'100%'} />
      </defs>
      <use clipPath={'url(#smallwave)'} href={'#rect'} />
    </svg>
  );
}