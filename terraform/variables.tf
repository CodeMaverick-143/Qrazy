variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "qrazy"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "backend_image_tag" {
  description = "Tag for the backend image"
  type        = string
  default     = "latest"
}

variable "frontend_image_tag" {
  description = "Tag for the frontend image"
  type        = string
  default     = "latest"
}
