const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');

const todoRouter = require('./server/api/routes/todo');
const mongoURI = config.get('mongoURI');

const start = async () => {
  try {
    await mongoose.connect(mongoURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
    );
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
};

start();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use(express.static(__dirname + '/dist/todo'));


app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/todo/index.html'));
});



app.use('/api', todoRouter);


// Start the app by listening on the default Heroku port
const serverPort = process.env.PORT || 8080;
app.listen(serverPort, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server is listening on ${serverPort}`);
});
