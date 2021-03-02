const properties = require('./properties/properties.json');
const fileNamePathData = require('./data/fileNamePath.json');
const worknoticeData = require('./data/worknotice.json');
const express = require('express');
const app = express();
console.log(properties);
const port = properties.server.port;


app.get("/workNotice/getList/:curPage/:pageSize", (request, response) =>{
	const curPage = request.params.curPage;
	const pageSize = request.params.pageSize;
	const offset = (curPage - 1) * pageSize;
	const resultData = worknoticeData.slice(offset, offset + pageSize);
	response.send(resultData);
});
app.get("/workNotice/noticeDetail/:id", (request, response) =>{
	const id = request.params.id;
	const resultData = worknoticeData.find(item => item.id == id);
	response.send(resultData);
});
app.get("/doc/doclist/:curPage/:pageSize", (request, response) =>{
	response.send("Hello Express");
});
app.get("/docDetail/:id", (request, response) =>{
	response.send("Hello Express");
});
app.get("/", (request, response) =>{
	response.send("Hello Express");
});

app.listen(port, () => {
	console.log(`Express Server Listen : http://localhost:${port}`);
});