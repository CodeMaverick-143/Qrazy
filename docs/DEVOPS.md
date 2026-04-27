# DevOps Implementation Guide (AWS ECR + ECS)

This project has been updated to follow the **DevOps Eval 2 Rubrics**. The deployment has been migrated from bare-metal (SSH/PM2) to a modern containerized orchestration using **Amazon ECR** and **Amazon ECS (Fargate)**.

## Architecture Overview
- **Container Registry**: Amazon ECR stores the Docker images for `frontend` and `backend`.
- **Orchestration**: Amazon ECS (Fargate) runs the containers in a serverless environment.
- **CI/CD**: GitHub Actions automates the build, push, and deployment process.
- **Logs**: Integrated with Amazon CloudWatch via `awslogs`.
- **Secrets**: Backend secrets are pulled from **AWS Systems Manager (SSM) Parameter Store** for security.

## Setup Requirements

### 1. AWS Resources
You need to create the following resources in your AWS account:
- **ECR Repositories**:
  - `qrazy-backend`
  - `qrazy-frontend`
- **ECS Cluster**: `qrazy-cluster`
- **ECS Service**: `qrazy-service` (using Fargate launch type).
- **IAM Roles**:
  - `ecsTaskExecutionRole`: Must have `AmazonECSTaskExecutionRolePolicy` and `ssm:GetParameters` permissions.
  - `ecsTaskRole`: For application-level AWS permissions.

### 2. Secrets Management (SSM Parameter Store)
Create the following parameters in SSM Parameter Store (Type: SecureString):
- `/QRAZY_DATABASE_URL`
- `/QRAZY_SUPABASE_URL`
- `/QRAZY_SUPABASE_ANON_KEY`
- `/QRAZY_SUPABASE_SERVICE_ROLE_KEY`

### 3. GitHub Secrets
Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `SUPABASE_URL` (for frontend build)
- `SUPABASE_ANON_KEY` (for frontend build)

## Files Created/Updated
- `.github/workflows/deploy.yml`: The automated CI/CD pipeline.
- `deploy/aws/task-definition.json`: The ECS Fargate task definition with multi-container support.
- `server/Dockerfile` & `client/Dockerfile`: Used by the pipeline to build images.

## Deployment Flow
1. **Push to `main`**: Triggers the GitHub Action.
2. **Build & Tag**: Images are built with the commit SHA and `latest` tag.
3. **Push to ECR**: Images are pushed to your private ECR repositories.
4. **Update Task Def**: The pipeline injects the new image URIs into `task-definition.json`.
5. **ECS Deploy**: Triggers a rolling update on the ECS Service.

> [!NOTE]
> Make sure to update the `AWS_REGION` and `ACCOUNT_ID` placeholders in `deploy/aws/task-definition.json` and `.github/workflows/deploy.yml` to match your AWS environment.
