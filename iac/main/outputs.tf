# =============================================================================
# OUTPUT VALUES
# =============================================================================

# =============================================================================
# NETWORK INFORMATION
# =============================================================================

# =============================================================================
# VPC ID OUTPUT
# =============================================================================
output "vpc_id" {
  description = "ID of the VPC where the cluster is deployed"
  value       = module.vpc.vpc_id
}

# =============================================================================
# VPC CIDR BLOCK OUTPUT
# =============================================================================
output "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  value       = module.vpc.vpc_cidr_block
}

# =============================================================================
# PRIVATE SUBNETS OUTPUT
# =============================================================================
output "private_subnets" {
  description = "List of IDs of private subnets"
  value       = module.vpc.private_subnets
}

# =============================================================================
# PUBLIC SUBNETS OUTPUT
# =============================================================================
output "public_subnets" {
  description = "List of IDs of public subnets"
  value       = module.vpc.public_subnets
}

# =============================================================================
# CLUSTER INFORMATION
# =============================================================================

# =============================================================================
# CLUSTER ENDPOINT OUTPUT
# =============================================================================
output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

# =============================================================================
# CLUSTER SECURITY GROUP ID OUTPUT
# =============================================================================
output "cluster_security_group_id" {
  description = "Security group ID attached to the EKS cluster"
  value       = module.eks.cluster_security_group_id
}

# =============================================================================
# CLUSTER NAME OUTPUT
# =============================================================================
output "cluster_name" {
  description = "Kubernetes Cluster Name"
  value       = module.eks.cluster_name
}

# =============================================================================
# KUBECTL CONFIGURATION COMMAND OUTPUT
# =============================================================================
output "configure_kubectl" {
  description = "Command to configure kubectl"
  value       = "aws eks update-kubeconfig --region ap-south-1 --name ${module.eks.cluster_name}"
}

# =============================================================================
# CLUSTER OIDC ISSUER URL OUTPUT
# =============================================================================
output "cluster_oidc_issuer_url" {
  description = "The URL on the EKS cluster for the OpenID Connect identity provider"
  value       = module.eks.cluster_oidc_issuer_url
}

# =============================================================================
# ARGOCD ADMIN PASSWORD OUTPUT
# =============================================================================
output "argocd_admin_password" {
  value     = data.kubernetes_secret.argocd_admin.data["password"]
  sensitive = true
}

# =============================================================================
# GRAFANA ADMIN PASSWORD OUTPUT
# =============================================================================
output "grafana_admin_password" {
  value     = data.kubernetes_secret.grafana_admin.data["admin-password"]
  sensitive = true
}

# =============================================================================
# USEFUL COMMANDS
# =============================================================================

# =============================================================================
# USEFUL COMMANDS OUTPUT
# =============================================================================
output "useful_commands" {
  description = "Useful commands for managing the cluster"
  value = {
    # Basic cluster operations
    configure_kubectl = "aws eks update-kubeconfig --region ap-south-1 --name ${module.eks.cluster_name}"
    cluster_info      = "kubectl cluster-info"
    get_nodes         = "kubectl get nodes"
    get_nodes_wide    = "kubectl get nodes -o wide"
    describe_nodes    = "kubectl describe nodes"

    # Pod and service operations
    get_pods_all     = "kubectl get pods -A"
    get_services_all = "kubectl get svc -A"
    get_ingress_all  = "kubectl get ingress -A"
    get_deployments  = "kubectl get deployments -A"

    # Troubleshooting
    get_events   = "kubectl get events -A --sort-by='.lastTimestamp'"
    check_auth   = "kubectl auth can-i '*' '*'"
    version_info = "kubectl version --short"

    # Cluster monitoring
    top_nodes      = "kubectl top nodes"
    top_pods       = "kubectl top pods -A"
    get_namespaces = "kubectl get namespaces"

    # System pods
    kube_system_pods = "kubectl get pods -n kube-system"
    coredns_status   = "kubectl get pods -n kube-system -l k8s-app=kube-dns"

    # AWS specific
    describe_cluster = "aws eks describe-cluster --region ap-south-1 --name ${module.eks.cluster_name}"
    list_nodegroups  = "aws eks list-nodegroups --region ap-south-1 --cluster-name ${module.eks.cluster_name}"
  }
}