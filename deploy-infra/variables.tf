variable "github_token"         { type = string; sensitive = true }
variable "repo_url"             { type = string }

variable "database_url"         { type = string; sensitive = true }
variable "supabase_url"         { type = string }
variable "supabase_anon_key"    { type = string }

variable "r2_endpoint"          { type = string }
variable "r2_bucket_name"       { type = string }
variable "r2_token"             { type = string; sensitive = true }
variable "r2_account_id"        { type = string }
variable "r2_access_key_id"     { type = string; sensitive = true }
variable "r2_secret_access_key" { type = string; sensitive = true }
variable "r2_public_domain"     { type = string }

variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region to deploy into"
}
