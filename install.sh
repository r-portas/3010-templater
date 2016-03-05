# Install script for mylib-gen

sudo apt-get install nodejs-legacy
sudo apt-get install npm
npm install

node setup.js
chmod +x mylib-gen

sudo cp mylib-gen /usr/bin/mylib-gen
