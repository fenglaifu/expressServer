const properties = require('./properties/properties.json');
const fileNamePathData = require('./data/fileNamePath.json');
const worknoticeData = require('./data/worknotice.json');
//var proxy = require('http-proxy-middleware');
const express = require('express');
const app = express();
console.log(properties);
const port = properties.server.port;

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.sendStatus(200);
    else next();
});
//app.use('/', proxy({ target: 'http://127.0.0.1:3000', changeOrigin: true }));
app.get("/api/workNotice/getDataList", (request, response) =>{
	console.log(request.query);
	const curPage = Number(request.query.curPage);
	const pageSize = Number(request.query.pageSize);
	const offset = (curPage - 1) * pageSize;
	console.log("curPage: " + curPage + ", pageSize: " + pageSize + ", offset: " + offset);
	const resultData = worknoticeData.slice(offset, offset + pageSize);
	
	response.send({data: resultData, total: worknoticeData.length});
});
app.get("/api/workNotice/noticeDetail/:id", (request, response) =>{
	const id = request.params.id;
	const resultData = worknoticeData.find(item => item.id == id);
	response.send(resultData);
});
app.get("/api/doc/doclist/:curPage/:pageSize", (request, response) =>{
	response.send("Hello Express");
});
app.get("/api/docDetail/:id", (request, response) =>{
	response.send("Hello Express");
});
app.get("/", (request, response) =>{
	response.send("Hello Express");
});

app.listen(port, () => {
	console.log(`Express Server Listen : http://localhost:${port}`);
});