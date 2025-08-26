# =============================================================================
# REMOTE S3 BUCKET CONFIGURATION
# =============================================================================

resource "aws_s3_bucket" "remote_bucket" {
  bucket = var.remote_bucket_name

  tags = {
    Name        = var.remote_bucket_name
    Envirnoment = var.env
  }
}