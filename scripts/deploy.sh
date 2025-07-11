#!/bin/bash

# deploy.sh - Production deployment script for EC2

set -euo pipefail

# Configuration
APP_NAME="personal-lms"
DOCKER_IMAGE="$APP_NAME:latest"
CONTAINER_NAME="$APP_NAME-container"
PORT=3000
ENV_FILE=".env"

echo "🚀 Starting deployment of $APP_NAME..."

# Check if .env file exists
if [[ ! -f $ENV_FILE ]]; then
  echo "⚠️  Warning: Environment file '$ENV_FILE' not found. Deployment will proceed without it."
fi

# Stop and remove existing container if it exists
if docker ps -q -f name="$CONTAINER_NAME" > /dev/null; then
  echo "⏹️  Stopping existing container..."
  docker stop "$CONTAINER_NAME"
fi

if docker ps -aq -f name="$CONTAINER_NAME" > /dev/null; then
  echo "🗑️  Removing existing container..."
  docker rm "$CONTAINER_NAME"
fi

# Remove dangling images before build to save space
echo "🧹 Cleaning up dangling images..."
docker image prune -f

# Build new image
echo "🔨 Building Docker image..."
docker build -t "$DOCKER_IMAGE" .

# Remove unused images (optional)
echo "🧹 Removing unused images..."
docker image prune -a -f

# Run new container with resource limits
echo "🏃 Starting new container..."
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -p "$PORT":3000 \
  ${ENV_FILE:+--env-file "$ENV_FILE"} \
  --memory="400m" \
  --cpus="0.5" \
  "$DOCKER_IMAGE"

# Wait for container to initialize
echo "⏳ Waiting for container to be ready (up to 30 seconds)..."
for i in {1..30}; do
  if curl -fs "http://localhost:$PORT/api/health" > /dev/null 2>&1; then
    echo "✅ Deployment successful! App is running on port $PORT"
    echo "📊 Container stats:"
    docker stats "$CONTAINER_NAME" --no-stream
    break
  else
    sleep 1
  fi

  if [[ $i -eq 30 ]]; then
    echo "❌ Health check failed after 30 seconds. Checking logs..."
    docker logs "$CONTAINER_NAME" --tail 50
    exit 1
  fi
done

echo "🎉 Deployment completed successfully!"
echo "🌐 Your app is available at: http://localhost:$PORT"
