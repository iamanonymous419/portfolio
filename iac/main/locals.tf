# =============================================================================
# LOCAL VALUES 
# =============================================================================

# =============================================================================
# LOCAL VARIABLES CONFIGURATION
# =============================================================================
locals {
  # =============================================================================
  # NETWORKING CONFIGURATION
  # =============================================================================
  azs             = slice(data.aws_availability_zones.available.names, 0, 3)
  private_subnets = [for k, v in local.azs : cidrsubnet(var.vpc_cidr, 8, k + 10)]
  public_subnets  = [for k, v in local.azs : cidrsubnet(var.vpc_cidr, 8, k)]

  # =============================================================================
  # RESOURCE NAMING CONFIGURATION
  # =============================================================================
  vpc_name     = "portfolio-vpc"
  cluster_name = "portfolio-cluster"

  # =============================================================================
  # COMMON TAGS CONFIGURATION
  # =============================================================================
  # Common tags applied to all resources
  common_tags = {
    Environment = var.environment
    Project     = "portfolio"
    ManagedBy   = "terraform"
    CreatedBy   = "anonymous"
    Owner       = data.aws_caller_identity.current.user_id
    CreatedDate = formatdate("YYYY-MM-DD", timestamp())
  }

  # =============================================================================
  # PUBLIC SUBNET TAGS - EKS LOAD BALANCER CONFIGURATION
  # =============================================================================
  public_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                      = "1"
  }

  # =============================================================================
  # PRIVATE SUBNET TAGS - EKS INTERNAL LOAD BALANCER CONFIGURATION
  # =============================================================================
  private_subnet_tags = {
    "kubernetes.io/cluster/${local.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"             = "1"
  }
}