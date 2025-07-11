output "ec2_public_ip" {
  value = module.compute.instance_public_ip
}

output "ssh_access_command" {
  value = "ssh -i ~/.ssh/${var.key_name}.pem ubuntu@${module.compute.instance_public_ip}"
}
