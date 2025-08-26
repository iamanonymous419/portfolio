# =============================================================================
# TERRAFORM AND AWS PROVIDER CONFIGURATION WITH REMOTE BACKEND
# =============================================================================

# =============================================================================
# TERRAFORM CONFIGURATION
# =============================================================================
terraform {
  # =============================================================================
  # TERRAFORM VERSION REQUIREMENT
  # =============================================================================
  required_version = ">= 1.0" # Minimum required Terraform version

  # =============================================================================
  # REQUIRED PROVIDERS CONFIGURATION
  # =============================================================================
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">=5.92.0"
    }

    helm = {
      source  = "hashicorp/helm"
      version = ">=3.0.2"
    }

    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">=2.38.0"
    }
  }

  # =============================================================================
  # REMOTE BACKEND CONFIGURATION - S3 WITH DYNAMODB LOCKING
  # =============================================================================
  backend "s3" {
    bucket         = "remote-bucket-for-portfolio"
    key            = "terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "remote_table"
  }
}