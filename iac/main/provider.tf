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
  host                   = data.aws_eks_cluster.this.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.this.certificate_authority[0].data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    args        = ["eks", "get-token", "--cluster-name", data.aws_eks_cluster.this.name]
    command     = "aws"
  }
}

# =============================================================================
# HELM PROVIDER CONFIGURATION
# =============================================================================
provider "helm" {
  kubernetes = {
    host                   = data.aws_eks_cluster.this.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.this.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.this.token
  }
}
