#!/usr/bin/env sh

set -eu

compose_file='tests-e2e/docker-compose.yml'
project_name='juniors-bootcamp-e2e'

cleanup() {
  docker compose --project-name "$project_name" --file "$compose_file" down --volumes --remove-orphans
}

trap cleanup EXIT HUP INT TERM

cleanup
docker compose --project-name "$project_name" --file "$compose_file" up \
  --abort-on-container-exit \
  --exit-code-from e2e
