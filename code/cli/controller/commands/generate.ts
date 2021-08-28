import * as dotenv from 'dotenv';
import ejs from 'ejs';
import { ExifTool } from 'exiftool-vendored';
import fs from 'fs-extra';
import puppeteer, { Browser } from 'puppeteer';

import { Guest } from '../lib/classes';
import * as Paths from '../lib/paths';
import * as Utils from '../lib/utils';

dotenv.config();

let browser: Browser;
let exiftool: ExifTool;

const TEST_NUMBER = 18;

export default async function generate(options: GenerateOptions) {
  const { refresh, withPdf } = options;
  const refreshCache = refresh || !fs.existsSync(Paths.CACHED_DATA);

  Utils.setup();
  await generateHTMLFiles(refreshCache);
  if (withPdf) {
    await generatePDFFiles();
  }
  Utils.tearDown();
}

/**
 * Generates the HTML files for each member on the guest list from the template.
 * @param refreshCache Indicates whether the data cache should be refreshed.
 * @returns A promise fulfilled when all HTML files have been generated.
 */
async function generateHTMLFiles(refreshCache: boolean): Promise<void[]> {
  console.info('Generating HTML files...');
  const guests = await Utils.loadGuestList(refreshCache);
  const promises = guests
    .slice(TEST_NUMBER, TEST_NUMBER + 1)
    .map(createGuestHTML);
  return Promise.all(promises);
}

/**
 * Generates the PDF files from each of the guest HTML files.
 * @param refreshCache Indicates whether the data cache should be refreshed.
 * @returns A promise fulfilled when all PDF files have been generated.
 */
async function generatePDFFiles(): Promise<void> {
  fs.ensureDirSync(`${Paths.OUTPUT_DIR}/pdf/guests`);
  console.info('Generating PDF files...');

  browser = await puppeteer.launch();
  exiftool = new ExifTool();

  const filenames = fs.readdirSync(`${Paths.OUTPUT_DIR}/html/guests`);
  const promises = filenames.map((filename) => {
    const [name] = filename.split('.');
    const html = Utils.readFileContent(
      `${Paths.OUTPUT_DIR}/html/guests/${name}.html`
    );
    return createGuestPDFPage(html, name);
  });

  await Promise.all(promises);
  await browser.close();
  await exiftool.end();
}

/**
 * Creates a single HTML file for a guest from the template.
 * @param guest The guest whose information is on the page.
 * @returns A promise fulfilled when the HTML file is created.
 */
async function createGuestHTML(guest: Guest): Promise<void> {
  const outputFile = `${Paths.OUTPUT_DIR}/html/guests/${guest.name}.html`;
  await createHTMLPage(Paths.TEMPLATE_FILE, outputFile, guest);
}

/**
 * Creates a single PDF file for a guest from the HTML file.
 * @param html The HTML string to be used for generating the PDF.
 * @param name The name of the guest.
 * @returns A promise fulfilled when the PDF file is created.
 */
async function createGuestPDFPage(html: string, name: string): Promise<void> {
  const path = `${Paths.OUTPUT_DIR}/pdf/guests/${name}.pdf`;
  try {
    await createPDFPage(html, path);
    await exiftool.write(path, { Title: `Invite to ${name}` }, [
      '-overwrite_original'
    ]);
  } catch (err) {
    Utils.error(err);
  }
}

/**
 * Helper function for generating HTML pages.
 * @param templateFile The input template EJS file.
 * @param outputFile The HTML file output path.
 * @param guest The guest whose details will go on the invite.
 * @returns A promise fulfilled when the HTML page is created.
 */
async function createHTMLPage(
  templateFile: string,
  outputFile: string,
  guest: Guest
): Promise<void> {
  try {
    const data = await fs.readFile(templateFile, 'utf8');
    const template = ejs.compile(data, { root: Paths.TEMPLATES_DIR });
    const { default: rules } = await import(Paths.RULES_JSON);
    const html = template({
      cssFile: Paths.STYLES_FILE,
      images: {
        signature: Paths.SIGNATURE_IMG,
        waves: Paths.WAVES_SVG
      },
      guest,
      rules,
      lists: {
        guest: Utils.getSpreadsheetUrl(process.env.SS_PUBLIC_GUESTLIST_ID!),
        wish: Utils.getSpreadsheetUrl(process.env.SS_PUBLIC_WISHLIST_ID!)
      }
    });
    await fs.outputFile(outputFile, html);
  } catch (err) {
    Utils.error(err);
  }
}

/**
 * Helper function for creating PDF pages.
 * @param html The HTML content to be used for the page.
 * @param outputPath The path to which the PDF will be saved.
 * @returns A promise fulfilled when the PDF page is created.
 */
async function createPDFPage(html: string, outputPath: string) {
  try {
    const page = await browser.newPage();
    await page.setContent(html);
    await page.addStyleTag({ url: Paths.FONTS_URL });
    await page.addStyleTag({ path: Paths.STYLES_FILE });
    await page.emulateMediaType('screen');
    await page.evaluateHandle('document.fonts.ready');
    await page.pdf({
      format: 'a4',
      path: outputPath,
      printBackground: true
    });
  } catch (err) {
    Utils.error(err);
  }
}

type GenerateOptions = {
  refresh?: boolean;
  withPdf?: boolean;
};