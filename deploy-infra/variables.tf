variable "aws_region" {
  default     = "us-east-1"
  description = "AWS region to deploy into"
}

variable "ami" {
  default     = "ami-0c55b159cbfafe1f0" # Ubuntu 22.04 in us-east-1
  description = "AMI ID for EC2"
}

variable "instance_type" {
  default     = "t3.micro"
  description = "EC2 instance type"
}

variable "key_name" {
  description = "SSH key pair name"
  type        = string
}

variable "instance_name" {
  default     = "lms-server"
  description = "Name tag for the EC2 instance"
}

variable "vpc_cidr" {
  default     = "10.0.0.0/16"
  description = "CIDR block for VPC"
}

variable "public_subnet_cidr" {
  default     = "10.0.1.0/24"
  description = "CIDR for the public subnet"
}

variable "instance_role_name" {
  default     = "ec2-lms-role"
  description = "IAM role for EC2 instance"
}
