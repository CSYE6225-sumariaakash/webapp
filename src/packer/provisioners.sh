#!/bin/bash

sleep 30

sudo apt update -y

sudo apt install git -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash ~/.nvm/nvm.sh
sudo apt install build-essential
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
mkdir /home/ubuntu/node-app
chown ubuntu:ubuntu /home/ubuntu/node-app