# =============================================================================
# PROVIDER CONFIGURATIONS
# =============================================================================

# =============================================================================
# AWS PROVIDER CONFIGURATION
# =============================================================================
provider "aws" {
  region = var.region
}

# =============================================================================
# KUBERNETES PROVIDER CONFIGURATION
# =============================================================================
provider "kubernetes" {
  host                   = try(data.aws_eks_cluster.this.endpoint, "")
  cluster_ca_certificate = try(base64decode(data.aws_eks_cluster.this.certificate_authority[0].data), "")

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    args        = ["eks", "get-token", "--cluster-name", try(data.aws_eks_cluster.this.name, ""), "--region", var.region]
    command     = "aws"
  }
}

# =============================================================================
# HELM PROVIDER CONFIGURATION
# =============================================================================
provider "helm" {
  kubernetes = {
    host                   = try(data.aws_eks_cluster.this.endpoint, "")
    cluster_ca_certificate = try(base64decode(data.aws_eks_cluster.this.certificate_authority[0].data), "")
    token                  = try(data.aws_eks_cluster_auth.this.token, "")
  }
}
