// config/swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'A description of your API',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}/api/v1`,
        description: 'API Server',
      },
    ],
  },
  apis: ['../routes/*.ts', '../controllers/*.ts'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;
