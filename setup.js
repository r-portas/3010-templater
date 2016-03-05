var fs = require('fs.extra');

var cmd = "#!/bin/bash\nnode " + __dirname + "/main.js";
fs.writeFileSync('mylib-gen', cmd, 'utf-8');
fs.chmodSync('mylib-gen', '777');
fs.copy(__dirname + '/mylib-gen', '/usr/bin/mylib-gen', {replace: true}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Added to path.");
  }
});
