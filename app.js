const express = require('express');
const cors = require('cors')
const models = require('./models');
const expressGraphQL = require('express-graphql').graphqlHTTP
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schemas/schema');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = '`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zfa71.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoDB instance.'))
    .on('error', error => console.log('Error connecting to MongoDB:', error));

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

module.exports = app;