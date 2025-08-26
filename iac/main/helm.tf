# =============================================================================
# HELM RELEASES CONFIGURATION
# =============================================================================

# =============================================================================
# METRICS SERVER DEPLOYMENT VIA HELM
# =============================================================================
resource "helm_release" "metrics_server" {
  name       = "metrics-server"
  repository = "https://kubernetes-sigs.github.io/metrics-server/"
  chart      = "metrics-server"
  namespace  = "kube-system"

  depends_on = [time_sleep.wait_for_cluster]

  set = [
    {
      name  = "args"
      value = "{--kubelet-insecure-tls,--kubelet-preferred-address-types=InternalIP,Hostname,ExternalIP}"
    }
  ]

  force_update  = false
  replace       = true
  recreate_pods = false

  lifecycle {
    ignore_changes = all # ignore all future changes
  }
}

# =============================================================================
# ARGOCD DEPLOYMENT VIA HELM
# =============================================================================
resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  namespace        = "argocd"
  create_namespace = true

  values = [
    file("../values/argocd.yaml")
  ]

  depends_on = [time_sleep.wait_for_cluster]

  force_update  = false
  replace       = true
  recreate_pods = false

  lifecycle {
    ignore_changes = all # ignore all future changes
  }
}

# =============================================================================
# KUBE PROMETHEUS STACK (MONITORING) VIA HELM
# =============================================================================
resource "helm_release" "monitoring" {
  name             = "monitoring"
  repository       = "https://prometheus-community.github.io/helm-charts"
  chart            = "kube-prometheus-stack"
  namespace        = "monitoring"
  create_namespace = true

  values = [
    file("../values/monitoring.yaml")
  ]

  timeout    = 420
  depends_on = [time_sleep.wait_for_cluster]

  force_update  = false
  replace       = true
  recreate_pods = false

  lifecycle {
    ignore_changes = all # ignore all future changes
  }
}