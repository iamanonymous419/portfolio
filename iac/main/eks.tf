# =============================================================================
# EKS CLUSTER CONFIGURATION
# =============================================================================

# =============================================================================
# EKS CLUSTER MODULE
# =============================================================================
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0" # Using latest major version

  cluster_name    = local.cluster_name
  cluster_version = var.kubernetes_version

  vpc_id = module.vpc.vpc_id
  # subnet_ids = module.vpc.public_subnets # enable them when in prod or use private subnets ude nat gateway in prod 
  subnet_ids = module.vpc.private_subnets
  # control_plane_subnet_ids = module.vpc.public_subnets
  control_plane_subnet_ids = module.vpc.private_subnets

  depends_on = [module.vpc]

  # =============================================================================
  # EKS AUTO MODE CONFIGURATION - SIMPLIFIED NODE MANAGEMENT
  # =============================================================================
  cluster_compute_config = {
    enabled    = true
    node_pools = ["general-purpose"]
  }

  # =============================================================================
  # KMS ENCRYPTION CONFIGURATION
  # =============================================================================
  create_kms_key                  = true
  kms_key_description             = "EKS cluster ${local.cluster_name} encryption key"
  kms_key_deletion_window_in_days = 7

  # =============================================================================
  # CLUSTER ENDPOINT ACCESS CONFIGURATION
  # =============================================================================
  # Enabling public access to the cluster API
  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = true

  # =============================================================================
  # CLUSTER ADMIN PERMISSIONS CONFIGURATION
  # =============================================================================
  # This is the new way to grant initial admin access in newer module versions
  enable_cluster_creator_admin_permissions = true

  # =============================================================================
  # RESOURCE TAGGING
  # =============================================================================
  tags = merge(
    {
      Name = local.cluster_name
    },
    local.common_tags
  )
}