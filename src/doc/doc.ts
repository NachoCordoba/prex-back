import express, { Router } from "express";
import SwaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const route : Router = express.Router();
const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Prex Backend Challenge",
        version: "0.1.0",
        description:
          "Node.js File Sharing System",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Ignacio Cordoba",
          url: "https://github.com/NachoCordoba",
          email: "nachocordoba05@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./**/*.routes.ts", "./**/*.dto.ts"],
  };
  
const specs = swaggerJsDoc(options);

route.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(specs, { explorer: true }))

export default route;