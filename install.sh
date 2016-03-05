# Install script for mylib-gen

sudo apt-get install nodejs-legacy
npm install

node setup.js
chmod +x mylib-gen

sudo ln -s mylib-gen /usr/bin/mylib-gen
