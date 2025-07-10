output "r2_bucket_name" {
  value       = module.r2_bucket.bucket_name
  description = "The name of the Cloudflare R2 bucket"
}

output "r2_bucket_public_url" {
  value       = module.r2_bucket.public_url
  description = "The public URL of the Cloudflare R2 bucket"
}
