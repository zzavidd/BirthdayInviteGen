#!/usr/bin/env bash

set -e

SCRIPTS_DIR="$(dirname -- "$0")"

BRANCH=production
WORKDIR=ziventi
NGINX_CONF=nginx.conf
"$SCRIPTS_DIR"/deploy.sh "${BRANCH}" "${WORKDIR}" "${NGINX_CONF}"

## Run the docker script from project
cd "/var/www/${WORKDIR}"
./docker/scripts/build-run.sh