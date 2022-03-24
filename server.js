const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.set('vue engine', 'ejs');

const MongoClient = require('mongodb').MongoClient;

var db
MongoClient.connect('mongodb+srv://toto_min4016:krhjh45079735.@cluster0.cxiru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(err, client) {
    if(err) {return console.log(err);}

    db = client.db('todoApp');

    app.post('/add',(req, res) => {
        res.send('전송 완료');
        console.log(req.body.title);
        console.log(req.body.date);
        db.collection('post').insertOne({title: req.body.title, date: req.body.date}, function (err, data) {
            console.log(data);
        })
    });
    app.get('/list', function (req, res) {
        db.collection('post').find().toArray(function (err, data) {
            console.log(data);

            res.render('list.ejs', {posts: data});
        });
        

    });

    app.listen(80, function(){
        console.log('listening on 80');
    });
})



app.get('/pets', function(req, res) {
    res.send('펫 용품을 쇼핑 할 수 있는 페이지입니다.')
});

app.get('/beauty', function(req, res){
    res.send('뷰티 품점.')
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/write', function(req, res){
    res.sendFile(__dirname + '/write.html');
});

