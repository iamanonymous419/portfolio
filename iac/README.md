# Portfolio Infrastructure as Code (Terraform)

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Amazon EKS](https://img.shields.io/badge/Amazon%20EKS-FF9900?style=for-the-badge&logo=amazon-eks&logoColor=white)
![Amazon VPC](https://img.shields.io/badge/Amazon%20VPC-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Route 53](https://img.shields.io/badge/Route%2053-FF9900?style=for-the-badge&logo=amazon-route53&logoColor=white)

This repository contains Terraform configurations for deploying a complete portfolio infrastructure on AWS, including EKS cluster, VPC, monitoring stack, and ArgoCD for GitOps deployment.

## Architecture Overview

The infrastructure includes:

- **VPC**: Custom VPC with public/private subnets
- **EKS Cluster**: Managed Kubernetes cluster
- **Security Groups**: Network security configurations
- **AWS Load Balancer Controller**: For ingress management
- **ArgoCD**: GitOps deployment tool
- **Monitoring Stack**: Prometheus, Grafana, and AlertManager
- **Metrics Server**: For HPA and resource monitoring
- **Route53**: Domain management and DNS records

## Prerequisites

- AWS CLI configured with appropriate permissions
- Terraform >= 1.0
- kubectl
- helm
- Domain registered in Route53 (if using custom domain)

## Project Structure

```
iac/
├── remote/          # Remote backend setup (S3 + DynamoDB)
├── main/           # Main infrastructure code
├── values/         # Helm chart values
│   ├── argocd.yaml
│   └── monitoring.yaml
└── README.md
```

## Deployment Steps

### Step 1: Initialize Remote Backend

First, set up the S3 backend for storing Terraform state:

```bash
cd remote
terraform init
terraform plan
terraform apply
```

### Step 2: Deploy Core Infrastructure

Navigate to the main directory and initialize Terraform with the remote backend:

```bash
cd ../main
terraform init
```

### Step 3: Deploy VPC and EKS Cluster

Deploy the foundational infrastructure:

```bash
# Plan the VPC and EKS deployment
terraform plan -target=module.vpc -target=module.eks

# Apply the VPC and EKS resources
terraform apply -target=module.vpc -target=module.eks
```

Verify the state:

```bash
terraform state list
```

### Step 4: Configure Security Groups

Apply security group rules for load balancer access:

```bash
terraform apply \
  -target=aws_security_group_rule.health_checks_to_lb \
  -target=aws_security_group_rule.internet_to_lb_http \
  -target=aws_security_group_rule.internet_to_lb_https
```

### Step 5: Deploy Kubernetes Components

Install ArgoCD, AWS Load Balancer Controller, and monitoring stack:

```bash
# Plan the Kubernetes components
terraform plan \
  -target=aws_iam_policy.alb_controller \
  -target=aws_iam_role.alb_controller \
  -target=aws_iam_role_policy_attachment.alb_controller_attach \
  -target=kubernetes_service_account.alb_controller \
  -target=helm_release.alb_controller \
  -target=helm_release.argocd \
  -target=helm_release.monitoring \
  -target=helm_release.metrics_server

# Apply the Kubernetes components
terraform apply \
  -target=aws_iam_policy.alb_controller \
  -target=aws_iam_role.alb_controller \
  -target=aws_iam_role_policy_attachment.alb_controller_attach \
  -target=kubernetes_service_account.alb_controller \
  -target=helm_release.alb_controller \
  -target=helm_release.argocd \
  -target=helm_release.monitoring \
  -target=helm_release.metrics_server
```

### Step 6: Configure Domain Mapping

Map your domains to the load balancer:

```bash
# Apply domain records for main website
terraform apply -target=aws_route53_record.app_alias -auto-approve
terraform apply -target=aws_route53_record.root_domain -auto-approve
terraform apply -target=aws_route53_record.www_domain -auto-approve

# Note: Additional subdomains (argocd, grafana, prometheus, alertmanager)
# should be configured in your domain.tf or through ingress annotations
```

### Step 7: Alternative Full Deployment

**⚠️ Use at your own risk**: Deploy everything at once:

```bash
terraform apply
```

### Step 8: Get Outputs and Credentials

Retrieve important information:

```bash
# Get all outputs
terraform output

# Get ArgoCD admin password
terraform output -raw argocd_admin_password

# Get Grafana admin password
terraform output -raw grafana_admin_password
```

### Step 9: Configure kubectl and Deploy Applications

Connect to the EKS cluster:

```bash
aws eks update-kubeconfig --region ap-south-1 --name portfolio-cluster
```

Deploy applications via ArgoCD:

```bash
kubectl apply -f ../../argocd/project/project.yml
kubectl apply -f ../../argocd/application/app.yml
```

### Domain Verification and Ingress

Verify that all your subdomains are properly configured:

```bash
# Check DNS resolution
nslookup iamanonymous.in
nslookup www.iamanonymous.in
nslookup argocd.iamanonymous.in
nslookup grafana.iamanonymous.in
nslookup prometheus.iamanonymous.in
nslookup alertmanager.iamanonymous.in

# Check ingress configurations
kubectl get ingress -A
kubectl describe ingress -n argocd
kubectl describe ingress -n monitoring
```

### SSL Certificate Verification

Ensure SSL certificates are properly issued:

```bash
# Check certificate status
kubectl get certificates -A
kubectl describe certificate -n argocd
kubectl describe certificate -n monitoring
```

## Accessing Services

After deployment, you can access the following services:

### Main Application

- **Portfolio Website**: https://iamanonymous.in
- **Portfolio Website (www)**: https://www.iamanonymous.in

### DevOps & Monitoring Tools

- **ArgoCD**: https://argocd.iamanonymous.in
  - Username: `admin`
  - Password: Get from `terraform output -raw argocd_admin_password`

- **Grafana**: https://grafana.iamanonymous.in
  - Username: `admin`
  - Password: Get from `terraform output -raw grafana_admin_password`

- **Prometheus**: https://prometheus.iamanonymous.in
  - Direct access to Prometheus metrics and queries

- **AlertManager**: https://alertmanager.iamanonymous.in
  - Alert management and notification configuration

### Getting Service Credentials

After deployment, retrieve the admin passwords:

```bash
# Get ArgoCD admin password
terraform output -raw argocd_admin_password

# Get Grafana admin password
terraform output -raw grafana_admin_password
```

### Service Health Check

Verify all services are accessible:

```bash
# Check ingress resources
kubectl get ingress -A

# Check service status
kubectl get svc -A

# Check pod status for all services
kubectl get pods -n argocd
kubectl get pods -n monitoring
kubectl get pods -n kube-system
```

## Cleanup/Destroy

### Manual Load Balancer Cleanup

Before destroying the infrastructure, manually delete the load balancer:

```bash
# List load balancers
aws elbv2 describe-load-balancers --query 'LoadBalancers[?contains(LoadBalancerName, `portfolio`)].LoadBalancerArn' --output text

# Delete the load balancer (replace ARN with actual value)
aws elbv2 delete-load-balancer --load-balancer-arn <LOAD_BALANCER_ARN>
```

### Terraform Destroy

Destroy the infrastructure in reverse order:

```bash
# Destroy domain records first
terraform destroy -target=aws_route53_record.app_alias
terraform destroy -target=aws_route53_record.root_domain
terraform destroy -target=aws_route53_record.www_domain

# Destroy Kubernetes components
terraform destroy \
  -target=helm_release.argocd \
  -target=helm_release.monitoring \
  -target=helm_release.metrics_server \
  -target=helm_release.alb_controller

# Destroy remaining infrastructure
terraform destroy
```

### Clean up Remote Backend (Optional)

```bash
cd ../remote
terraform destroy
```

## Troubleshooting

### Common Commands

Update kubeconfig:

```bash
aws eks update-kubeconfig --region ap-south-1 --name portfolio-cluster
```

### Helm Management

List all Helm releases:

```bash
helm list -A
```

Uninstall Helm releases:

```bash
helm uninstall argocd -n argocd
helm uninstall monitoring -n monitoring
helm uninstall metrics-server -n kube-system
helm uninstall aws-load-balancer-controller -n kube-system
```

### Domain and Ingress Issues

If you can't access the services through their domains:

```bash
# Check ingress controller status
kubectl get pods -n kube-system | grep aws-load-balancer-controller

# Check ingress resources and their status
kubectl get ingress -A
kubectl describe ingress <ingress-name> -n <namespace>

# Check load balancer status
aws elbv2 describe-load-balancers --region ap-south-1

# Verify DNS records
dig iamanonymous.in
dig argocd.iamanonymous.in
dig grafana.iamanonymous.in
```

### Service Access Issues

If services are not accessible:

```bash
# Check service endpoints
kubectl get endpoints -A

# Port forward for direct access (troubleshooting)
kubectl port-forward svc/argocd-server -n argocd 8080:443
kubectl port-forward svc/monitoring-grafana -n monitoring 3000:80
kubectl port-forward svc/monitoring-prometheus-server -n monitoring 9090:80
kubectl port-forward svc/monitoring-alertmanager -n monitoring 9093:80
```

### Certificate Issues

If SSL certificates are not working:

```bash
# Check cert-manager pods (if using cert-manager)
kubectl get pods -n cert-manager

# Check certificate requests
kubectl get certificaterequests -A

# Check certificate challenges
kubectl get challenges -A
```

### Kubernetes Debugging

Check all resources across namespaces:

```bash
kubectl get all -A
kubectl get pods -A
kubectl get ingress -A
```

Check specific namespace resources:

```bash
kubectl get all -n monitoring
kubectl get ingress -n monitoring
```

### Service Account Issues

If you encounter service account issues:

```bash
kubectl delete serviceaccount aws-load-balancer-controller -n kube-system
```

### Terraform State Management

Refresh Terraform state:

```bash
terraform refresh
```

View Terraform output in JSON format:

```bash
terraform output -json
```

## Important Notes

1. **Region**: This configuration is set for `ap-south-1`. Update the region in terraform files if deploying elsewhere.

2. **Domain Configuration**:
   - Main domain: `iamanonymous.in`
   - Subdomains configured: `argocd`, `grafana`, `prometheus`, `alertmanager`, `www`
   - Ensure all subdomains are properly configured in your Route53 hosted zone
   - SSL certificates should be automatically provisioned for HTTPS access

3. **Service Access**:
   - All services are accessible via HTTPS with their respective subdomains
   - Admin credentials are generated during deployment and available via terraform output
   - Services may take 5-10 minutes to be fully accessible after deployment

4. **Costs**: This infrastructure will incur AWS charges. Monitor your usage and destroy resources when not needed.

5. **Security**: Review security group rules and IAM policies before deployment.

6. **Backup**: Always backup your Terraform state file and important configurations.

7. **DNS Propagation**: Allow time for DNS changes to propagate globally (up to 48 hours in some cases).

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review Terraform and AWS documentation
3. Check CloudWatch logs for detailed error messages
4. Verify IAM permissions and resource quotas

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**⚠️ Warning**: This infrastructure creates billable AWS resources. Always run `terraform destroy` when done testing to avoid unexpected charges.
