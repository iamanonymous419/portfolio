# =============================================================================
# AWS LOAD BALANCER CONTROLLER CONFIGURATION
# =============================================================================

# =============================================================================
# CLUSTER READINESS DELAY
# =============================================================================
resource "time_sleep" "wait_for_cluster" {
  depends_on = [module.eks]

  create_duration = "15s"
}

# =============================================================================
# ALB CONTROLLER IAM POLICY
# =============================================================================
resource "aws_iam_policy" "alb_controller" {
  name        = "AWSLoadBalancerControllerIAMPolicy"
  description = "Policy for ALB Controller"
  policy      = file("../iam_policy.json")
}

# =============================================================================
# ALB CONTROLLER IAM ROLE
# =============================================================================
resource "aws_iam_role" "alb_controller" {
  name = "AmazonEKSLoadBalancerControllerRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = module.eks.oidc_provider_arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "${module.eks.oidc_provider}:sub" = "system:serviceaccount:kube-system:aws-load-balancer-controller"
          }
        }
      }
    ]
  })
  depends_on = [time_sleep.wait_for_cluster]
}

# =============================================================================
# ALB CONTROLLER KUBERNETES SERVICE ACCOUNT
# =============================================================================
resource "kubernetes_service_account" "alb_controller" {
  metadata {
    name      = "aws-load-balancer-controller"
    namespace = "kube-system"
    annotations = {
      "eks.amazonaws.com/role-arn" = aws_iam_role.alb_controller.arn
    }
  }
}

# =============================================================================
# ALB CONTROLLER IAM ROLE POLICY ATTACHMENT
# =============================================================================
resource "aws_iam_role_policy_attachment" "alb_controller_attach" {
  role       = aws_iam_role.alb_controller.name
  policy_arn = aws_iam_policy.alb_controller.arn
}

# =============================================================================
# ALB CONTROLLER HELM RELEASE
# =============================================================================
resource "helm_release" "alb_controller" {
  name       = "aws-load-balancer-controller"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  namespace  = "kube-system"

  depends_on = [
    kubernetes_service_account.alb_controller,
    aws_iam_role_policy_attachment.alb_controller_attach
  ]

  replace = true

  set = [
    {
      name  = "clusterName"
      value = module.eks.cluster_name
    },
    {
      name  = "serviceAccount.create"
      value = "false"
    },
    {
      name  = "serviceAccount.name"
      value = "aws-load-balancer-controller"
    },
    {
      name  = "region"
      value = var.region # or data.aws_region.current.name
    },
    {
      name  = "vpcId"
      value = module.vpc.vpc_id
    }
  ]

  lifecycle {
    ignore_changes = all # ignore all future changes
  }
}