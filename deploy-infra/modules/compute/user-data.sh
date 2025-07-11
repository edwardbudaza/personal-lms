#!/bin/bash

# Update packages and install essentials
apt update -y && apt upgrade -y
apt install -y nginx docker.io curl ufw

# Enable and start services
systemctl enable nginx
systemctl start nginx

systemctl enable docker
systemctl start docker

# Add ubuntu user to docker group for non-root docker usage
usermod -aG docker ubuntu

# Setup UFW firewall to allow SSH and HTTP/HTTPS
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Configure Nginx as reverse proxy to your app running on port 3000
cat <<EOF > /etc/nginx/sites-available/learn.nibl.ink
server {
    listen 80;
    server_name learn.nibl.ink;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site and reload nginx
ln -s /etc/nginx/sites-available/learn.nibl.ink /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
