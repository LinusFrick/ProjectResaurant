const { verifySignUp } = require('../middleware');
const authJwt = require('../middleware/authJwt');
const controller = require("../controllers/auth.controller");
const generateToken = require("../config/token");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token');

    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.get("/api/auth/token", (req, res) => {
    const token = generateToken('6431ef1b07fa5982fa1eca49'); // Replace with the user ID
    res.json({ token });
  });
  
  // app.post('/api/products', [authJwt.verifyToken], createProduct);

  // app.get('/api/products', getAllProducts);

  // app.get('/api/products/:id', getProductById);

  // app.put('/api/products/:id', authJwt.verifyToken, updateProduct);

  // app.delete('/api/products/:id', authJwt.verifyToken, deleteProduct);
};
