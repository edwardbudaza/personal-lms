output "bucket_name" {
  value = cloudflare_r2_bucket.this.name
}

output "public_url" {
  value = "https://${var.account_id}.r2.cloudflarestorage.com/${var.bucket_name}"
}
