
const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/products',
      hasProducts: rows.length > 0,
      activeShop: true,
      productCSS: true
    });
  }).catch(err => console.log(err))
    
  };

  exports.getProduct = (req, res, next) => {
    const proId = req.params.productId;
    Product.findById(proId).then(([product])=> {{
      res.render('shop/product-detail', {product: product[0],
        pageTitle: 'Product Detail',
        path: '/product'
      })
    }}).catch(err => console.log(err))
   
  };

  exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    }).catch(err => console.log(err))
      
    
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