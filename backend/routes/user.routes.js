const authJwt = require('../middleware/authJwt');
const DishController = require('../controllers/dishes.controller')
const DrinkController = require('../controllers/drinks.controller');
const AsideController = require('../controllers/asides.controller');
const CartController = require('../controllers/cart.controller');
const OrderController = require('../controllers/order.controller');

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/products/dishes', DishController.createDish);
    app.get('/api/products/dishes', DishController.getAllDish);
    app.get('/api/products/dishes/:id', DishController.getDishById);
    app.put('/api/products/dishes/:id', authJwt.verifyToken, DishController.updateDish);
    app.delete('/api/products/dishes/:id', authJwt.verifyToken, DishController.deleteDish);

    app.post('/api/products/drinks', DrinkController.createDrink);
    app.get('/api/products/drinks', DrinkController.getAllDrink);
    app.get('/api/products/drinks/:id', DrinkController.getDrinkById);
    app.put('/api/products/drinks/:id', authJwt.verifyToken, DrinkController.updateDrink);
    app.delete('/api/products/drinks/:id', authJwt.verifyToken, DrinkController.deleteDrink);

    app.post('/api/products/asides', AsideController.createAside);
    app.get('/api/products/asides', AsideController.getAllAside);
    app.get('/api/products/asides/:id', AsideController.getAsideById);
    app.put('/api/products/asides/:id', authJwt.verifyToken, AsideController.updateAside);
    app.delete('/api/products/asides/:id', authJwt.verifyToken, AsideController.deleteAside);

    app.post('/api/user/cart', CartController.addItemToCart);
    app.get('/api/user/cart/:userId/items', CartController.getItemsInCart);
    app.get('/api/user/cart/:userId', CartController.getCartById);
    app.put('/api/users/cart/:userId/items/:itemId', CartController.updateItemInCart);
    app.delete('/api/users/cart/:userId/items/:itemId', CartController.removeItemFromCart);
    
    app.post('api/orders', OrderController.createOrder)
};
