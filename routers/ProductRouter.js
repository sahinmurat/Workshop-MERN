const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.post('/addProduct', ProductController.addProduct);
router.get('/getProduct/:id', ProductController.getProduct);
router.post('/updateProduct', ProductController.updateProduct);
router.post('/deleteProduct/:id', ProductController.deleteProduct);
router.get('/', ProductController.getProducts);
