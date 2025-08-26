# =============================================================================
# INPUT VARIABLES
# =============================================================================

variable "remote_bucket_name" {
  description = "this is a var for remote bucket name"
  type        = string
  default     = "remote-bucket-for-portfolio"
}

variable "remote_table_name" {
  description = "this is a var for remote table name"
  type        = string
  default     = "remote_table"
}

variable "region" {
  description = "this is a var for aws region"
  type        = string
  default     = "ap-south-1"
}

variable "env" {
  type        = string
  description = "The deployment environment (e.g., dev, staging, production)"
  default     = "production"
}