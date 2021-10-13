
const mySecret = process.env['MESSAGE_STYLE']
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');

var app = express();

const logger = (req, res, next) =>{
  const method = req.method;
  const path = req.path;
  const ip = req.ip;
  console.log(`${method} ${path} - ${ip}`);
  next();
}
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger);

app.use('/public',express.static('./public'));
app.get('/', (req, res)=>{
 res.sendFile(path.resolve(__dirname, './views/index.html'));
  
})

app.get('/json', (req, res)=>{
//res.json({'message':'Hello json'})

  if (process.env['MESSAGE_STYLE'] === 'uppercase'){
  res.json({'message':'HELLO JSON'})  
  }else{
res.json({'message':'Hello json'})
  }


  
})

app.get('/now', function(req, res, next){
  const currentTime = new Date().toString();
  req.time = currentTime;
  next();
}, (req, res)=>{
  res.json({time: req.time});
})

// Params
app.get('/:word/echo',(req, res) => {
    const { word } = req.params;
    console.log(req.params, word);
    res.json({'echo': word})
})

//Query toString
app.route('/name').get((req, res)=>{
  const {first, last} = req.query;
  const name = `${first} ${last}`;
  res.json({name: name});
}).post((req, res)=>{
  console.log(req.body)
  const {first, last} = req.body;
  const name = `${first} ${last}`;
  console.log(name);
  res.json({name: name});
})
/*
app.get('/name', (req, res)=>{
  const {first, last} = req.query;
  const name = `${first} ${last}`;
  res.json({name: name});
})*/


























 module.exports = app;
