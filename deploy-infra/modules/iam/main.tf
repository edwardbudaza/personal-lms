resource "aws_iam_role" "ec2_role" {
  name = var.instance_role_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ec2_policy_attach" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly" # Allows pulling container images from ECR (optional)
}

resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "${var.instance_role_name}-profile"
  role = aws_iam_role.ec2_role.name
}
