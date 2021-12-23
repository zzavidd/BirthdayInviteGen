const fs = require('fs');
const path = require('path');

const logger = require('./lib/logger');
const runner = require('./lib/runner');

const PROJECTS_DIR = path.join(process.cwd(), 'projects');
const UTILS_DIR = path.join(process.cwd(), 'utils');

logger.info('Inspecting project code...');

fs.readdirSync(PROJECTS_DIR).forEach((directory) => {
  const cwd = path.join(PROJECTS_DIR, directory);
  if (fs.lstatSync(cwd).isDirectory()) {
    runner(cwd).run('tsc', ['--noEmit'], () => {
      logger.info(`Finished inspecting '${directory}'.`);
    });
  }
});

runner(UTILS_DIR).run('tsc', ['--noEmit'], () => {
  logger.info(`Finished inspecting 'utils'.`);
});
