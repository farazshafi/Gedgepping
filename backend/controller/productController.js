import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name : {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const products = await Product.find({...keyword})

    res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.deleteOne();
        res.json("Product Removed")
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create a product
// @route   POST /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "sample brand",
        category: "sample category",
        countInStock: 0,
        numReviews: 0,
        description: "sample description",
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)

})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        brand,
        description,
        image,
        price,
        category,
        countInStock,
    } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description 
        product.image = image
        product.countInStock = countInStock
        product.category = category
        product.brand = brand
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error("Product not found")
    }

})
// @desc    Create new review
// @route   POST /api/products/:id/review
// @access  Private
const createdProductReview = asyncHandler(async (req, res) => {
    const {
      rating,
      comment 
    } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
       const alreadyReviewed = product.reviews.find(singleReview => singleReview.user.toString() === req.user._id.toString())
       if(alreadyReviewed) {
        res.status(404)
        throw new Error ("Product Already Reviewed")
       }
       const review = {
        name : req.user.name,
        rating : Number(rating),
        comment,
        user: req.user._id
       }
       product.reviews.push(review)
       product.numReviews = product.reviews.length
       product.rating = product.reviews.reduce((acc,item)=> item.rating + acc, 0) / product.reviews.length
       await product.save()
       res.status(201).json({message: "Review Added"})
    }else{
        res.status(404)
        throw new Error("Product not found")
    }

})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createdProductReview }