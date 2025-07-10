provider "aws" {
  region = "us-east-1"
}

module "iam" {
  source    = "./modules/iam"
  role_name = "amplify-service-role"
}

module "amplify" {
  source                    = "./modules/amplify"
  github_token              = var.github_token
  repo_url                  = var.repo_url
  amplify_service_role_arn  = module.iam.role_arn

  database_url              = var.database_url
  supabase_url              = var.supabase_url
  supabase_anon_key         = var.supabase_anon_key

  r2_endpoint               = var.r2_endpoint
  r2_bucket_name            = var.r2_bucket_name
  r2_token                  = var.r2_token
  r2_account_id             = var.r2_account_id
  r2_access_key_id          = var.r2_access_key_id
  r2_secret_access_key      = var.r2_secret_access_key
  r2_public_domain          = var.r2_public_domain
}
