const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDefinition');

const options = {
  swaggerDefinition,
  apis: ['./routes/company.js', './routes/employee.js', './routes/menuItem.js', './routes/order.js', './routes/authorize.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;