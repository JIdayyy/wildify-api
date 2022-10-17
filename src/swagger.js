const swaggerAutogen = require("swagger-autogen")();

const outputFile = "../swagger_output.json";
const endpointsFiles = ["src/api/index.ts"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Wildify REST Api",
    description:
      "This is a simple REST API for Wildify. It is used to create, update, and delete Wildify songs",
  },
  host: "localhost:4000",
  basePath: "/api/v1",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Enter your bearer token in the format **Bearer &lt;token>**",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
