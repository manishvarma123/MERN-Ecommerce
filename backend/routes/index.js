const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/users/userSignUp")
const userSignInController = require('../controller/users/userSignIn')
const authToken = require('../middleware/authToken')
const userDetailsController = require('../controller/users/userDetails')
const userLogout = require('../controller/users/userLogout')

const updateUser = require('../controller/users/updateUser')
const UploadProductController = require('../controller/products/uploadProduct')
const getProductController = require('../controller/products/getProduct')
const updateProductController = require('../controller/products/updateProduct')
const allUsers = require('../controller/users/allUsers')
const getCategoryProduct = require('../controller/products/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/products/getCategoryWiseProduct')
const getProductDetails = require('../controller/products/getProductDetails')
const addToCartController = require('../controller/users/addToCartController')
const countAddToCartProduct = require('../controller/users/countAddToCartProduct')
const addToCartViewProduct = require('../controller/users/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/users/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/users/deleteAddToCartProduct')
const searchProduct = require('../controller/products/searchProduct')
const filterProductController = require('../controller/products/filterProduct')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

// admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

// product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

// user Add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-cart-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)



module.exports = router