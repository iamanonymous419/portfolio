# =============================================================================
# DATA SOURCES
# =============================================================================

# =============================================================================
# AVAILABILITY ZONES DATA SOURCE
# =============================================================================
data "aws_availability_zones" "available" {
  state = "available"
}

# =============================================================================
# CALLER IDENTITY DATA SOURCE
# =============================================================================
data "aws_caller_identity" "current" {}

# =============================================================================
# EKS CLUSTER DATA SOURCE
# =============================================================================
data "aws_eks_cluster" "this" {
  name       = module.eks.cluster_name
  depends_on = [module.eks]
}

# =============================================================================
# EKS CLUSTER AUTHENTICATION DATA SOURCE
# =============================================================================
data "aws_eks_cluster_auth" "this" {
  name       = module.eks.cluster_name
  depends_on = [module.eks]
}

# =============================================================================
# ARGOCD ADMIN SECRET DATA SOURCE
# =============================================================================
data "kubernetes_secret" "argocd_admin" {
  metadata {
    name      = "argocd-initial-admin-secret"
    namespace = "argocd"
  }

  depends_on = [helm_release.argocd]
}

# =============================================================================
# GRAFANA ADMIN SECRET DATA SOURCE
# =============================================================================
data "kubernetes_secret" "grafana_admin" {
  metadata {
    name      = "monitoring-grafana"
    namespace = "monitoring"
  }

  depends_on = [helm_release.monitoring]
}

# =============================================================================
# WAIT FOR ALB CREATION
# =============================================================================
resource "time_sleep" "wait_for_alb" {
  depends_on = [
    aws_security_group_rule.health_checks_to_lb,
    aws_security_group_rule.internet_to_lb_http,
    aws_security_group_rule.internet_to_lb_https,
    module.eks,
  ]

  create_duration = "300s"
}

# =============================================================================
# ROUTE53 HOSTED ZONE DATA SOURCE
# =============================================================================
data "aws_route53_zone" "primary" {
  name         = "iamanonymous.in"
  private_zone = false
}

# =============================================================================
# APPLICATION LOAD BALANCER DATA SOURCE
# =============================================================================
data "aws_lb" "eks_alb" {
  depends_on = [time_sleep.wait_for_alb]

  tags = {
    "elbv2.k8s.aws/cluster" = module.eks.cluster_name
  }
}