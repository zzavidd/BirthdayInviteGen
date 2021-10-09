import fs from 'fs-extra';

import { Rank } from '../utils/classes';
import * as Utils from '../utils/functions';
import * as Paths from '../utils/paths';
import { getSpreadsheet } from '../utils/spreadsheet';

export default async function update(options: UpdateOptions) {
  const { refresh } = options;
  const refreshCache = refresh || !fs.existsSync(Paths.CACHED_DATA);

  const guests = await Utils.loadGuestList(refreshCache);
  const rows = guests
    .filter((g) => g.invited)
    // .filter((g) => g.rank <= Rank.D)
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map(({ name, confirmed }) => {
      const hasConfirmed = confirmed ? 'Yes' : '';
      return [name, hasConfirmed];
    });

  const spreadsheet = await getSpreadsheet(process.env.SS_PUBLIC_LISTS_ID!);
  const [sheet] = spreadsheet.sheetsByIndex;
  await sheet.clear();
  await sheet.setHeaderRow(['Name', 'Confirmed', 'Dietary Requirements']);
  await sheet.addRows(rows);

  await sheet.loadCells('D3:E7');
  const helpCell = await sheet.getCellByA1('D3');
  helpCell.value =
    'Only people who have received invites so far will appear here; this list will be updated gradually. Check back here occasionally to see people you know whom you can tag along with.';
  await sheet.saveUpdatedCells();
}

type UpdateOptions = {
  refresh?: boolean;
};
