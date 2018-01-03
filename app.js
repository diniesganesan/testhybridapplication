var express = require('express');
var bodyp = require('body-parser');
var path = require('path');
var mongodb = require('mongodb').MongoClient;
var mongojs = require('mongojs');

var ObjectId = mongojs.ObjectId;

var app = express();

//body parser middleware
app.use(bodyp.json());
app.use(bodyp.urlencoded({extended: false}));


//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//create static path
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));



app.get('/', function(req,res){

	//connection to MongoDB
	mongodb.connect("mongodb://localhost:27017/customers", function(err, database_name){
		if(err){
			console.log("error");
		}else{
			//connection to database in MongoDB
			database_name.collection('users', function(err,table){
				
				//connection to collection in database
				database_name.collection('users').find().toArray(function(err, result){
					//console.log(result);
					res.render('index',{
						person:result
					});

				app.post('/newuser', function(req,res){
						console.log(req.body.fname+' '+req.body.lname);	
						table.insert({f_name:req.body.fname,l_name:req.body.lname});
						res.redirect('/');
					});
				app.delete('/delete/:id',function(req,res){
					table.remove({_id:ObjectId(req.params.id)}, function(err,result){
						if(err){
							console.log('not ok');
						}else{
							console.log('ok');
							console.log(req.params.id);
							res.redirect('/');
						}
					});
					
					
					});
				})
			})
		}
	});
});	




app.listen(3000, () => console.log('server started.'));