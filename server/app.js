const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const sendError = require('./utils/errorHandler');

dotenv.config({ path: './config.env' });
const database = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(database);

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const cartRouter = require('./routes/cartRoutes');

const app = express();

const corsOptions = {
  origin: 'https://fake-adlibris.herokuapp.com',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());
app.use(xss());
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/cart', cartRouter);
app.use(sendError);

module.exports = app;
