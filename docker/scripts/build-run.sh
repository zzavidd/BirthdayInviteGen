#!/usr/bin/env bash

CWD="$(dirname -- "$0")"

# shellcheck source=/dev/null
source "$CWD"/utils.sh

if [ "$1" == "dev" ]; then
  warn "Building for development."
  IMAGE_NAME='ziventi-dev'
  CONTAINER_NAME='ziventi-dev-server'
  PORT='3333'
  WORKDIR='dev.ziventi'
  COMMAND='prod:staging'
else
  warn 'Building for production.'
  IMAGE_NAME='ziventi'
  CONTAINER_NAME='ziventi-server'
  PORT='3000'
  WORKDIR='ziventi'
  COMMAND='prod'
fi

info "Building '$IMAGE_NAME' image..."
if
  docker build -f "$CWD/../Dockerfile.node" \
    -t $IMAGE_NAME \
    --build-arg COMMAND="$COMMAND" \
    --build-arg PORT="$PORT" \
    --build-arg WORKDIR="$WORKDIR" \
    .
then
  success "Successfully built '$IMAGE_NAME' image."
else
  error "Failed to build '$IMAGE_NAME' image"
  error 'Aborting.'
  exit 1
fi

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  warn "Destroying $CONTAINER_NAME container..."
  docker stop $CONTAINER_NAME >/dev/null
  docker rm $CONTAINER_NAME >/dev/null
fi

info 'Running container...'
docker run --detach \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  --publish $PORT:$PORT \
  --env PORT=$PORT \
  $IMAGE_NAME
