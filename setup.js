var cmd = "#!/bin/bash\nnode " + __dirname + "/main.js";
fs.writeFileSync('mylib-gen', cmd, 'utf-8');
fs.createReadStream('./mylib-gen').pipe(fs.createWriteStream('/usr/sbin/mylib-gen'));
fs.chmodSync('/usr/sbin/mylib-gen', '777');
