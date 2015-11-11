var http=require("http");
var mysql = require("mysql");
var url=require("url");
var postDataObject;
//connection to mysql
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "somePass",
	database: "mysql"
});
connection.connect();

http.createServer(function(request, response) {
	request.on("data", function(postVars) {
		var dataFromPost = "";
		if(request.url!="/favicon.ico") { 
			var dataFromPostTemp = "";
			dataFromPost+=postVars;
			var userName = dataFromPost.split("&")[0].split("=")[1];
			var password1 = dataFromPost.split("&")[1].split("=")[1];
			var date = new Date();
			var formattedDate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();
			postDataObject = {username: userName, password: password1, date: formattedDate};
			connection.query("insert into users_nodejs set ?", postDataObject, 
			function(err, result) {
				if(err) throw err;
			});
		}
	});
	request.on("end", function() {
		response.writeHead(200, {"Location":"e:/js/nodejs/page1.html"});
		response.write("<p style='color:red;text-align:center;font-size:30px;'>A Node JS Server</p>");
		response.end();
	});
}).listen(2000);
console.log("le succès de démarrage du serveur");
