var fs = require('fs');

var cmd = "#!/bin/bash\nnode " + __dirname + "/main.js";
fs.writeFileSync('mylib-gen', cmd, 'utf-8');
