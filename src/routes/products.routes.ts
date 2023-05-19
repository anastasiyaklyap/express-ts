import express from 'express'
import * as ProductController from './../controllers/products.controller'

const router = express.Router()

router.get('/products', ProductController.getAllProducts)
router.get('/products/:id', ProductController.getProductById)
router.post('/products', ProductController.createProduct)
router.put('/products/:id', ProductController.updateProduct)
router.delete('/products/:id', ProductController.deleteProduct)

export default router
