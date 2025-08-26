# =============================================================================
# ROUTE53 RECORDS
# =============================================================================

# =============================================================================
# SUBDOMAIN ALIAS RECORDS
# =============================================================================
resource "aws_route53_record" "app_alias" {
  for_each = toset(var.subdomains)

  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "${each.key}.${data.aws_route53_zone.primary.name}"
  type    = "A"

  alias {
    name                   = data.aws_lb.eks_alb.dns_name
    zone_id                = data.aws_lb.eks_alb.zone_id
    evaluate_target_health = true
  }

  depends_on = [data.aws_lb.eks_alb]
}

# =============================================================================
# ROOT DOMAIN ALIAS RECORD
# =============================================================================
resource "aws_route53_record" "root_domain" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = data.aws_route53_zone.primary.name
  type    = "A"

  alias {
    name                   = data.aws_lb.eks_alb.dns_name
    zone_id                = data.aws_lb.eks_alb.zone_id
    evaluate_target_health = true
  }

  depends_on = [data.aws_lb.eks_alb]
}

# =============================================================================
# WWW DOMAIN ALIAS RECORD
# =============================================================================
resource "aws_route53_record" "www_domain" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "www.${data.aws_route53_zone.primary.name}"
  type    = "A"

  alias {
    name                   = data.aws_lb.eks_alb.dns_name
    zone_id                = data.aws_lb.eks_alb.zone_id
    evaluate_target_health = true
  }

  depends_on = [data.aws_lb.eks_alb]
}