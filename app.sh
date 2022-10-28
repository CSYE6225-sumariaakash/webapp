#!/bin/bash
sleep 30
sudo apt-get update -y
sudo apt-get install zip unzip
sudo apt update && sudo apt install --assume-yes curl
sudo apt-get install nginx -y
# curl -sL https://rpm.nodesource.com/setup_18.x | sudo -E bash -
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt -y install nodejs
sudo apt-get -y install npm
echo "Installing mysql server"
# sudo apt-get install mysql-server -y
# sudo mysql <<EOF
# CREATE DATABASE cloud;
# CREATE USER 'akash'@'localhost' IDENTIFIED BY 'akash';
# GRANT ALL PRIVILEGES ON cloud.* TO 'akash'@'localhost' WITH GRANT OPTION;
# FLUSH PRIVILEGES;
# EOF
echo "Starting mysql server"
# sudo service mysql start
sudo apt-get install -y gcc g++ make
sudo npm i pm2 -g
sleep 10
unzip webapp.zip
echo "after unzip"
pwd
cd webapp/ && npm i
echo "after npm i"
pwd
sleep 80
echo "after 80 sleep"
sudo pm2 start index.js
echo "before pwd after start index.js 80 sleep"
pwd
echo "after pm2 start index.js"
sleep 10
sudo pm2 ls
sleep 10
echo "saving pm2"
sudo pm2 save
sleep 10
echo "after save pm2"
sudo pm2 ls
sudo pm2 startup systemd
pwd
echo "after pm2 ls"
