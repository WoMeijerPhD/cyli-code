var fs = require("fs");

module.exports = {
	cert: fs.readFileSync(__dirname + "/large-files/localhost.cert"),
	key: fs.readFileSync(__dirname + "/large-files/localhost.key"),
};