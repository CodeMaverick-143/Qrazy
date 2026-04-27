output "alb_dns_name" {
  value = aws_lb.main.dns_name
}

output "ecr_repository_url_backend" {
  value = aws_ecr_repository.backend.repository_url
}

output "ecr_repository_url_frontend" {
  value = aws_ecr_repository.frontend.repository_url
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  value = aws_ecs_service.main.name
}
