require('dotenv').config();
const express = require('express');
const router = require('./routes');
const mongoose = require("mongoose");
const logMiddleware = require('./middleware/logMiddleware');
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware');
const cors = require('cors')

const app = express();

const PORT = process.env.API_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/', logMiddleware);
app.use('/api', router);
app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();


