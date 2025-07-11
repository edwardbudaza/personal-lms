# -----------------------------------------
# Root main.tf - LMS Production Deployment
# -----------------------------------------

provider "aws" {
  region = var.aws_region
}

module "networking" {
  source = "./modules/networking"
  vpc_cidr = var.vpc_cidr
  public_subnet_cidr = var.public_subnet_cidr
}

module "iam" {
  source = "./modules/iam"
  instance_role_name = var.instance_role_name
}

module "compute" {
  source            = "./modules/compute"
  ami               = var.ami
  instance_type     = var.instance_type
  key_name          = var.key_name
  subnet_id         = module.networking.public_subnet_id
  security_group_id = module.networking.security_group_id
  instance_name     = var.instance_name
  iam_instance_profile = module.iam.instance_profile_name
}


