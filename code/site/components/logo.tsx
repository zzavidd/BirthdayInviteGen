import React from 'react';

import * as Global from 'styles/Components.styles';

export default function ZiventiLogo({
  color = 'white',
  className,
}: ZiventiLogoProps) {
  return (
    <Global.Logo
      xmlns={'http://www.w3.org/2000/svg'}
      xmlnsXlink={'http://www.w3.org/1999/xlink'}
      viewBox={'0 0 987 643'}
      className={className}>
      <Global.LogoPath d={pathZ} fill={color} strokeWidth={'19px'} />
      <Global.LogoPath d={pathIventi} fill={color} strokeWidth={'11px'} />
      <image
        x={'564'}
        y={'94'}
        width={'94'}
        height={'94'}
        xlinkHref={penImageData}
      />
    </Global.Logo>
  );
}

const pathZ =
  'M571.67 619.512a92.539 92.539 0 0 0 31.759-30.6 74.792 74.792 0 0 0 12.006-40.666 77.991 77.991 0 0 0-3.486-22.463 60.222 60.222 0 0 0-12.006-21.683A75.932 75.932 0 0 0 586 489.38a183.049 183.049 0 0 0-16.266-11.619q-.782-.781-5.81 2.711c-3.364 2.324-4.78 3.994-4.26 5.035q3.867 3.867 9.683 10.844a149.6 149.6 0 0 1 11.231 15.492q15.486 24.781 15.492 48.025 0 18.589-11.619 30.984t-37.18 12.393q-20.914 0-50.349-19.365t-61.58-51.51q-32.153-32.153-63.13-68.552-30.209-37.18-57.707-65.84t-55.771-44.54a122.274 122.274 0 0 0-60.8-15.879 153.549 153.549 0 0 0-39.117 5.422q-20.534 5.429-43.765 17.816 86.742-93.714 181.642-177.769Q391.566 98.991 489.176 28.5q1.543-1.543 3.1-6.2a24.73 24.73 0 0 0 1.55-6.971c0-1.549-.267-2.324-.775-2.324H312.569q-10.857 0-28.273-.775t-36.796-.775a373.276 373.276 0 0 0-48.413 3.1q-23.637 3.1-36.018 13.943a38.022 38.022 0 0 0-10.844 15.879 52.788 52.788 0 0 0-3.1 17.428 27.4 27.4 0 0 0 .387 4.648 24.784 24.784 0 0 1 .388 3.873q.762 5.428 6.2 16.266 5.409 10.856 12.393 22.076 6.972 11.237 11.619 19.752l7.746-6.2q-.782-2.323-4.648-12.781-3.885-10.457-4.647-16.654Q177 71.873 190.957 59.48t34.857-17.816a237.018 237.018 0 0 1 41.441-6.971q20.514-1.543 32.145-1.549 36.4 0 73.2.387 36.78.4 73.2 1.162-33.313 27.123-80.171 65.453-46.875 38.343-98.761 82.882-51.9 44.552-101.471 90.24-49.582 45.713-88.697 87.916-39.123 42.228-60.031 75.523a32.756 32.756 0 0 0-5.422 17.816 20.267 20.267 0 0 0 7.359 16.266q7.371 6.192 15.1 6.2 10.058 0 15.492-7.746a43.891 43.891 0 0 0 7.746-15.492q2.324-8.532 4.648-17.815a93.773 93.773 0 0 1 24.787-40.666 128.106 128.106 0 0 1 41.441-27.111 124.728 124.728 0 0 1 47.637-9.683q28.648 0 51.124 14.718 22.457 14.723 43.377 38.342 20.914 23.637 44.926 51.511 18.591 20.913 42.6 49.574t51.9 56.158q27.885 27.486 58.094 45.313Q497.7 631.9 528.68 631.905a89.367 89.367 0 0 0 42.99-12.393Z';
const pathIventi =
  'M413.892 165.588q0-14.106-14.533-14.106-13.685 0-13.678 14.106t14.533 14.105q13.674 0 13.678-14.105Zm-50.438 179.524q-6.411-3.416-6.412-13.678 0-9.828 5.985-23.936l39.324-91.045c.855-2.277 1.563-4.061 2.137-5.343a8.988 8.988 0 0 0 .855-3.633q0-5.98-11.968-5.984l-23.509.427q5.55 6.843 5.556 12.823a8.962 8.962 0 0 1-1.282 4.7q-8.556 18.815-18.38 41.889t-20.944 50.438q-5.13 13.254-5.13 20.945 0 12.4 12.4 12.4h21.372Zm138.062-53.43a363.385 363.385 0 0 0 16.029-36.973q8.334-22.01 17.738-51.079l2.138-7.694q0-6.833-7.694-6.839-7.273 0-15.816 7.694-9.406 8.124-14.1 23.936a57.106 57.106 0 0 0-2.137 15.388q0 15.819 5.556 27.356Q475.015 334 449.368 334q-14.967 0-14.96-18.807 0-24.365 27.783-80.787a124.5 124.5 0 0 1 12.823-21.372 70.059 70.059 0 0 1 14.533-14.534h-26.073q-11.973 0-16.671 8.976-6.841 14.537-13.891 30.348T419.02 270.31q-8.976 22.23-8.976 42.317 0 35.484 28.638 35.477 33.34 0 62.834-56.422Zm103.01 45.309q16.239-9.828 26.928-31.2l1.283-2.565-7.267-2.992-1.709 2.565q-23.514 35.054-50.438 35.05-20.517 0-20.517-27.784a79.959 79.959 0 0 1 5.984-30.775q8.113 0 26.073-5.985 16.24-5.55 26.074-12.823 31.2-23.5 31.2-47.018a19.052 19.052 0 0 0-7.266-15.388q-6.843-5.129-16.67-5.129-29.493 0-56.85 32.913-32.488 38.9-32.485 78.221a54.575 54.575 0 0 0 2.778 18.166 34.348 34.348 0 0 0 9.19 13.892 41.519 41.519 0 0 0 28.639 10.686 66.475 66.475 0 0 0 35.053-9.834Zm-17.1-105.15q24.365-29.493 36.333-29.494 6.831 0 6.839 9.4 0 21.8-23.51 41.462a64.311 64.311 0 0 1-11.754 7.694q-6.633 3.426-13.892 6.411-12.823 4.709-20.09 4.7 13.675-25.215 26.074-40.179Zm62.833 113.271q10.68-1.283 13.251-7.694a289.038 289.038 0 0 1 25.646-47.232 205.049 205.049 0 0 1 30.351-35.686 147.6 147.6 0 0 1 17.738-14.319q7.474-4.909 12.182-4.916t4.7 5.13q0 4.709-4.274 11.54-27.791 44.462-27.784 67.108 0 27.79 26.929 27.784 22.219 0 44.026-32.913l-5.984-4.274q-18.383 26.928-31.63 26.928-8.126 0-8.122-11.113c0-1.423.067-2.992.214-4.7s.354-3.56.641-5.556q2.985-18.374 27.784-66.254 5.128-9.826 10.9-20.944t12.61-23.082a15.212 15.212 0 0 0-4.275-.427q-11.971 0-37.187 14.1a201.487 201.487 0 0 0-20.517 12.61 154.641 154.641 0 0 0-17.1 13.891q-11.973 10.69-20.731 19.449a126.843 126.843 0 0 0-13.892 16.029q31.627-73.514 47.446-82.923a45.617 45.617 0 0 1-8.977 0 29.775 29.775 0 0 0-5.984-.855h-2.992q-9.406 0-15.388 5.984a47.316 47.316 0 0 0-6.411 8.549 125.859 125.859 0 0 0-7.267 14.1q-18.383 40.183-31.2 70.955T633.591 348.1q2.986-1.713 16.67-2.992Zm232.524-29.066-5.13-5.984q-17.1 25.647-29.066 25.647-12.822 0-11.113-20.945.852-8.546 5.343-23.082T855 257.06q6.411-17.522 15.388-37.188 3.416-7.263 6.2-14.105t5.77-13.678h31.2l5.13-9.4H886.2l14.106-32.913a45.789 45.789 0 0 1 12.823-17.525l-18.38-.427q-10.689 0-13.678 2.137-3.848 3-9.4 18.807l-10.258 29.921h-26.5l-5.129 9.4h27.784q-15.819 37.619-38.47 97.456a61.6 61.6 0 0 0-3.633 12.823 75.14 75.14 0 0 0-1.069 12.4q0 30.355 27.784 30.348 20.087 0 40.607-29.066Zm97.026-150.458q0-14.106-14.533-14.106-13.685 0-13.678 14.106t14.533 14.105q13.674 0 13.678-14.105Zm-50.436 179.524q-6.411-3.416-6.412-13.678 0-9.828 5.985-23.936l39.324-91.045c.855-2.277 1.563-4.061 2.137-5.343a8.988 8.988 0 0 0 .855-3.633q0-5.98-11.968-5.984l-23.509.427q5.55 6.843 5.556 12.823a8.962 8.962 0 0 1-1.282 4.7q-8.556 18.815-18.38 41.889t-20.944 50.438q-5.13 13.254-5.13 20.945 0 12.4 12.4 12.4h21.372Z';
const penImageData =
  'data:img/png;base64,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';

interface ZiventiLogoProps extends React.SVGProps<SVGSVGElement> {
  color?: 'black' | 'white';
}
