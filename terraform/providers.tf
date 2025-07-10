terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }
}

provider "cloudflare" {
  #api_token = var.cloudflare_api_token != null ? var.cloudflare_api_token : env.CLOUDFLARE_API_TOKEN
}
