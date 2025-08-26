# =============================================================================
# REMOTE TERRAFORM CONFIGURATION
# =============================================================================

terraform {
  required_version = ">= 1.0" # Minimum required Terraform version

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.92.0"
    }
  }
}

