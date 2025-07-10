variable "account_id" {
  description = "Cloudflare account ID"
  type        = string
}

variable "bucket_name" {
  description = "R2 bucket name"
  type        = string
}

variable "public_bucket" {
  description = "Whether the bucket is publicly readable"
  type        = bool
  default     = false
}
