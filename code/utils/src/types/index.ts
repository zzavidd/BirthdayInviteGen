import type ZLoader from '../classes/loader';

export type CLIOptions = {
  generate?: Generate;
  publish?: Publish;
};
export type Generate = (options: GenerateOptions) => void;
export type Publish = (options: PublishOptions) => void;

export interface GenerateOptions extends GenerateHTMLOptions {
  format?: FileFormat;
  open?: boolean;
  refreshCache?: boolean;
  zip?: boolean;
}

export type FileFormat = 'pdf' | 'png';

export interface GenerateHTMLOptions {
  all?: boolean;
  limit?: number | string;
  name?: string;
}

export interface PublishOptions {
  refreshCache?: boolean;
}

export interface LoadingOptions<
  G extends TGuest = TGuest,
  R extends TGuestRow = TGuestRow,
> {
  loader: ZLoader<G, R>;
  processor?: (guests: G[]) => G[];
}

export interface PublishLoadingOptions<G extends TGuest, R extends TGuestRow>
  extends LoadingOptions<G, R> {
  sheet: PublishSheet<G>;
}

export type PublishSheet<G> =
  | string
  | {
      property: keyof G;
      sheetMap: Record<string, string>;
    };

export interface TGuest {
  name: string;
  status: ConfirmStatus;
  hashes?: GuestHashes;
}

export interface TGuestRow {
  Name: string;
  Status: string;
}

export type GuestHashes = Record<ConfirmStatus, string>;

export interface HashParams {
  guestName: string;
  status: ConfirmStatus;
  publicSpreadsheetId: string;
  sheetTitle: string;
}

export type ConfirmStatus =
  | 'Awaiting'
  | 'Tentative'
  | 'Confirmed'
  | 'Unavailable';

export const PublicConfirmStatuses: ConfirmStatus[] = [
  'Confirmed',
  'Tentative',
  'Unavailable',
];
