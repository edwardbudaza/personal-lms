output "instance_public_ip" {
  value = aws_instance.lms_server.public_ip
}
