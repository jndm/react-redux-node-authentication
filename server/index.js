require('./config/config');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true}, function (err) {
	if(err) {
			console.log('Failed to connect MongoDB');
	}
});

const corsConfig = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
	"optionsSuccessStatus": 204,
	"exposedHeaders": ['x-auth']
}

app.use(morgan('combined'));
app.use(cors(corsConfig));
app.use(bodyParser.json({ type: '*/*'}));
router(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
});