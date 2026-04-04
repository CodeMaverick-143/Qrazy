#!/bin/bash

# Actual Docker Hub username
DOCKER_HUB_USERNAME="codemaverick143"
VERSION="v1.0.1"

# Tag the images
echo "Tagging images ($VERSION)..."
docker tag qrazy-frontend:latest $DOCKER_HUB_USERNAME/qrazy-frontend:latest
docker tag qrazy-frontend:latest $DOCKER_HUB_USERNAME/qrazy-frontend:$VERSION
docker tag qrazy-backend:latest $DOCKER_HUB_USERNAME/qrazy-backend:latest
docker tag qrazy-backend:latest $DOCKER_HUB_USERNAME/qrazy-backend:$VERSION

# Push the images
echo "Pushing images to Docker Hub..."
docker push $DOCKER_HUB_USERNAME/qrazy-frontend:latest
docker push $DOCKER_HUB_USERNAME/qrazy-frontend:$VERSION
docker push $DOCKER_HUB_USERNAME/qrazy-backend:latest
docker push $DOCKER_HUB_USERNAME/qrazy-backend:$VERSION

echo "Done! You can now run your images directly:"
echo "docker run -d --name qrazy-backend $DOCKER_HUB_USERNAME/qrazy-backend:$VERSION"
echo "docker run -d --name qrazy-frontend -p 80:80 -e BACKEND_HOST=qrazy-backend $DOCKER_HUB_USERNAME/qrazy-frontend:$VERSION"
