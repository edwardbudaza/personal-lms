module "r2_bucket" {
  source            = "./modules/r2_bucket"
  account_id        = var.cloudflare_account_id
  bucket_name       = "course-videos"
  public_bucket     = true
}
