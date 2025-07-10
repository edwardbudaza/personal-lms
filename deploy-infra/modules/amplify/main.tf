resource "aws_amplify_app" "app" {
  name         = "nextjs-app"
  repository   = var.repo_url
  access_token = var.github_token
  iam_service_role_arn = var.amplify_service_role_arn

  environment_variables = {
    DATABASE_URL                = var.database_url
    NEXT_PUBLIC_SUPABASE_URL   = var.supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY = var.supabase_anon_key

    R2_ENDPOINT         = var.r2_endpoint
    R2_BUCKET_NAME      = var.r2_bucket_name
    R2_TOKEN            = var.r2_token
    R2_ACCOUNT_ID       = var.r2_account_id
    R2_ACCESS_KEY_ID    = var.r2_access_key_id
    R2_SECRET_ACCESS_KEY= var.r2_secret_access_key
    R2_PUBLIC_DOMAIN    = var.r2_public_domain
  }

  enable_branch_auto_build = true
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.app.id
  branch_name = "main"

  environment_variables = aws_amplify_app.app.environment_variables
}
