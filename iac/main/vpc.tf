# =============================================================================
# VPC CONFIGURATION
# =============================================================================

# =============================================================================
# VPC MODULE
# =============================================================================
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = local.vpc_name
  cidr = var.vpc_cidr

  # =============================================================================
  # SUBNET CONFIGURATION
  # =============================================================================
  azs             = local.azs
  public_subnets  = local.public_subnets
  private_subnets = local.private_subnets

  # =============================================================================
  # GATEWAY CONFIGURATION
  # =============================================================================
  enable_nat_gateway = true # enable them when in prod or use private subnets
  single_nat_gateway = true # enable them when in prod or use private subnets
  enable_vpn_gateway = false

  # =============================================================================
  # DNS CONFIGURATION
  # =============================================================================
  enable_dns_hostnames = true
  enable_dns_support   = true

  # =============================================================================
  # PUBLIC IP CONFIGURATION
  # =============================================================================
  map_public_ip_on_launch = true

  # =============================================================================
  # VPC RESOURCE TAGGING
  # =============================================================================
  tags = merge(
    {
      Name = local.vpc_name
    },
    local.common_tags
  )

  # =============================================================================
  # SUBNET TAGGING - REQUIRED FOR EKS
  # =============================================================================
  public_subnet_tags  = merge(local.common_tags, local.public_subnet_tags)
  private_subnet_tags = merge(local.common_tags, local.private_subnet_tags)
}