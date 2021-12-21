import type { GoogleSpreadsheet } from 'google-spreadsheet';
import invariant from 'tiny-invariant';

import { LoadingOptions, PublishOptions } from '../../..';
import type { TGuest, TGuestRow } from '../../../types';
import { Spreadsheet } from '../../spreadsheet';

export class ZPublisher<G extends TGuest, R extends TGuestRow> {
  private loadingOptions: LoadingOptions<G, R>;
  private spreadsheet!: GoogleSpreadsheet;

  constructor(options: PublisherConstructor<G, R>) {
    const { loadingOptions } = options;
    this.loadingOptions = loadingOptions;
  }

  /**
   * Updates the public spreadsheet with the currently invited and confirmed
   * guests.
   * @param options The update options.
   */
  public async execute(options: PublishOptions): Promise<void> {
    const { refreshCache } = options;
    const { loader, filter, reducer } = this.loadingOptions;

    let guests = await loader.load(refreshCache);
    if (filter) {
      guests = guests.filter(filter);
    }

    let guestCollection: Record<string, G[]> = {};
    if (reducer) {
      const { property, sheetMap } = reducer;

      guestCollection = guests.reduce((builder, guest) => {
        const sheetKey = String(guest[property]);
        const sheetName = sheetMap[sheetKey];
        const currentPropertyState = builder[sheetName] || [];
        return {
          ...builder,
          [sheetName]: [...currentPropertyState, guest]
        };
      }, {} as Record<string, G[]>);
    } else {
      guestCollection['Sheet1'] = guests;
    }

    this.spreadsheet = await Spreadsheet.getSpreadsheet(
      process.env.SS_PUBLIC_LISTS_ID!
    );

    const promises = Object.entries(guestCollection).map(
      ([sheetName, guests]) => {
        const rows = guests.map(({ name, status }) => {
          let attendance = '';

          switch (status) {
            case 'Confirmed':
              attendance = '\u2714  Confirmed';
              break;
            case 'Tentative':
              attendance = '\uD83D\uDD38 Tentative';
              break;
            case 'Unavailable':
              attendance = '\u274C Unavailable';
              break;
            case 'Awaiting':
            default:
              attendance = '\uD83D\uDD57 Awaiting response';
              break;
          }

          return [name, attendance];
        });

        const sheet = this.spreadsheet.sheetsByTitle[sheetName];
        if (!sheet) return;

        return (async () => {
          await sheet.clear();
          await sheet.setHeaderRow(['Name', 'Attendance']);
          await sheet.addRows(rows);
        })();
      }
    );

    await Promise.all(promises);
  }

  /**
   * Directly updates cells on a specified worksheet.
   * @param sheetName The name of the worksheet.
   * @param range The range of cells to load.
   * @param valuesByCell The list of cell id-value pairs.
   */
  public async updateCells(
    sheetName: string,
    range: string,
    valuesByCell: [string, string][]
  ): Promise<void> {
    const sheet = this.spreadsheet.sheetsByTitle[sheetName];
    invariant(sheet, `No sheet exists with name '${sheetName}'.`);
    await sheet.loadCells(range);

    valuesByCell.forEach(([cellId, text]) => {
      const cell = sheet.getCellByA1(cellId);
      cell.value = text;
    });

    await sheet.saveUpdatedCells();
  }
}

interface PublisherConstructor<G extends TGuest, R extends TGuestRow> {
  loadingOptions: LoadingOptions<G, R>;
}
