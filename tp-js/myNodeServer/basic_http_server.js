//modules to load:
var express = require('express');
var app = express();

//route principale:
app.get('/', function(req, res , next) {
    res.setHeader('Content-Type', 'text/html');
    res.write("<html> <body>");
    res.write('<h2>welcome to basic_http_server</h2>');
    res.write('<!-- <a href="addition?a=5&b=6">5+6</a><br/> -->');
	res.write("<form method='get' action='addition'>");
	res.write("a:<input name='a'/><br/>");
	res.write("b:<input name='b'/><br/>");
	res.write("<input type='submit' value='calculer a+b'/>");
	res.write("</form>");
    res.write("</body></html>");
    res.end();
});

//route pour addition?a=5&b=6
app.get('/addition', function(req, res , next) {
    a = Number(req.query.a);b = Number(req.query.b);
    resAdd = a+b;
    res.setHeader('Content-Type', 'text/html');
    res.write("<html> <body>");
    res.write('a=' + a + '<br/>');res.write('b=' + b + '<br/>');
    res.write('a+b=' + resAdd + '<br/>');
	res.write('<a href="/">nouveau calcul</a>');
    res.write("</body></html>");
    res.end();
});

app.listen(8282 , function () {
    console.log("http://localhost:8282");
});