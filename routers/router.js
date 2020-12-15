const express = require('express');
const router = express.Router();
const CategoryRouter = require('./CategoryRouter')
const ProductRouter = require('./ProductRouter')

router.use('/products', ProductRouter);
router.use('/categories', CategoryRouter);