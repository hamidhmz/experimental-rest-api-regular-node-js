const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const bodyParser = require('body-parser');
const config = require('config');
const helmet = require('helmet');
const cors = require('cors');

const swaggerDocument = YAML.load('./doc/swagger.yaml');
const { userRoutes, postRoutes } = require('./route');
const errorHandler = require('./util/errorHandler');

const mongoDB = config.get('db');
const app = express();
const port = config.get('port');

mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(helmet.hidePoweredBy({ setTo: 'Go' }));
app.use(cors());
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

app.listen(port, () => console.log(`app listening on ${port} port!`));
