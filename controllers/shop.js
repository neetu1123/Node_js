
const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Shop',
        path: '/products',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
    });
  };

  exports.getProduct = (req, res, next) => {
    const proId = req.params.productId;
    Product.findById(proId, product => {
      res.render('shop/product-detail', {product: product,
        pageTitle: 'Product Detail',
        path: '/product'
      })
    })
    
  };

  exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    });
  };


exports.getCart = (req,res,next) => {

  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (prodData of products) {
        const cartProductData = cart.products.find(prod => prod.id === prodData.id);
        if(cartProductData) {
          cartProducts.push({productData: prodData , qty: cartProductData.qty})
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Add Product',
        path: '/cart',
        products: cartProducts
      });
    })
  })
}

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
      Cart.addProduct(prodId, product.price)
  } )
  res.redirect('/cart')
  
}


exports.postCartDeleteProduct = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId,product.price)
  res.redirect('/cart')
    
  })
}

exports.getOrders = (req,res,next) => {
    res.render('shop/orders', {
        pageTitle: 'Add Product',
        path: '/orders',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
}

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        pageTitle: 'Add Product',
        path: '/checkout',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
}