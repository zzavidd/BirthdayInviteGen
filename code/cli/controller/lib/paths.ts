import path from 'path';

export const ROOT = path.resolve(__dirname, '../../..');
const CLI_ROOT = `${ROOT}/cli`;
const CACHE_DIR = `${ROOT}/.cache`;

const ASSETS_DIR = `${CLI_ROOT}/assets`;
const VIEWS_DIR = `${CLI_ROOT}/views`;

export const OUTPUT_DIR = `${CLI_ROOT}/out`;
export const TEMPLATES_DIR = `${VIEWS_DIR}/templates`;
export const STYLES_DIR = `${VIEWS_DIR}/styles`;

export const CACHED_DATA = `${CACHE_DIR}/data.json`;
export const KEY_JSON = `${CLI_ROOT}/key.json`;
export const RULES_JSON = `${VIEWS_DIR}/data/rules.json`;
export const STYLES_INPUT_FILE = `${STYLES_DIR}/sass/App.scss`;
export const STYLES_OUTPUT_FILE = `${STYLES_DIR}/css/main.css`;
export const TEMPLATE_FILE = `${TEMPLATES_DIR}/index.ejs`;

export const SIGNATURE_IMG = `${ASSETS_DIR}/signature.svg`;
export const WAVES_SVG = `${ASSETS_DIR}/waves.svg`;

export const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Courgette&family=Great+Vibes&family=Style+Script&family=Tangerine:wght@400;700&family=Poppins:wght@400;700&display=swap';
