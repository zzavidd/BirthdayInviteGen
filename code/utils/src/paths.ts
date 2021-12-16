import path from 'path';

export namespace Paths {
  export const ROOT = path.resolve(__dirname, '../../..');
  export const CACHE_DIR = `${ROOT}/.cache`;
  export const KEY_JSON = `${ROOT}/key.json`;
}