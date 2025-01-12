import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    border1: string;
    border2: string;
    borderWidth: string;
    textColor: string;
    linkColor: string;
    eventTitleTextColor: string;
    addressFontWeight: string;
  }
}
