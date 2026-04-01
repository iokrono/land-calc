#!/usr/bin/env bash

# Source project properties as environment variables
. ./.env

# Function to build the docker image
build() {
    DOCKER_BUILDKIT=1 docker build --file "Dockerfile" --progress plain \
    --build-arg APP_VERSION=$VERSION \
    --tag "$REGISTRY_URL/$REGISTRY_ORG/$APP_NAME:$VERSION" .
}

# Function to push the docker image to the registry
push() {
    docker image push "$REGISTRY_URL/$REGISTRY_ORG/$APP_NAME:$VERSION"
}

# Display usage information
usage() {
    echo "Usage: $0 {build|push}"
    exit 1
}

# Check input arguments
if [ $# -eq 0 ]; then
    usage
fi

# Handle different actions based on input arguments
case "$1" in
    build)
        build "sqlite"
        push "sqlite"
        ;;
    push)
        push "$1"
        ;;
    *)
        usage
        ;;
esac
