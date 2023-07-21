const bcrypt = require("bcrypt-nodejs");

bcrypt.hash("soup", null, null, function(err, hash) {
  console.log(hash);
});

bcrypt.compare("soup", hash, function(err, res) {
  console.log(res);
});
