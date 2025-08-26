# =============================================================================
# INPUT VARIABLES
# =============================================================================

# =============================================================================
# AWS REGION VARIABLE
# =============================================================================
variable "region" {
  description = "this is a var for aws region"
  type        = string
  default     = "ap-south-1"
}

# =============================================================================
# ENVIRONMENT VARIABLE
# =============================================================================
variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "production"
}

# =============================================================================
# VPC CIDR VARIABLE
# =============================================================================
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# =============================================================================
# KUBERNETES VERSION VARIABLE
# =============================================================================
variable "kubernetes_version" {
  description = "Kubernetes version for EKS cluster"
  type        = string
  default     = "1.33"
}

# =============================================================================
# SUBDOMAINS TO MAP VARIABLE
# =============================================================================
variable "subdomains" {
  description = "List of subdomains to create Route53 alias records for"
  type        = list(string)
  default     = ["argocd", "grafana", "alertmanager", "prometheus"]
}
