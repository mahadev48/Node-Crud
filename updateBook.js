var express = require('express');
var app = express();
var fs = require('fs');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:true});
router.use(urlencodedParser);

router.post('/updateBook/:id',function(req,res){
	
	let bookId = req.params.id;
	let bookname = req.body;
	res.json(bookname);
	
	var jsonObj = [];
	//console.log("Book ID: "+bookId);
	
	var data = fs.readFileSync('./book.json');
	jsonObj = JSON.parse(data);
	//console.log("jsonObj: "+jsonObj);
	
	for(var i=0; i<jsonObj.length; i++){
		if(jsonObj[i].id == bookId){
			jsonObj[i] = bookname;
		}
	}
	var finalData = JSON.stringify(jsonObj);
	fs.writeFile('./book.json',finalData, function(err){
		if(err){
			return console.error(err);
		}	
	});
	
	res.json(finalData);
});

module.exports = router;

/* var server = app.listen(8082,'0.0.0.0',function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s",host,port);
}); */