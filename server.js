const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./Models/User");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

const app = express();

app.use(express.json());

app.use("/user", require("./routes/User"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});

const options = {
  definition: {
    openapi: "3.0.0",
    info:{
      title:'Users Api Documentation',
      version:'0.1.0',
      description:'This API is a Node.js backend using Express and MongoDB. It offers CRUD operations for user data. The API is documented using Swagger, allowing easy exploration and testing of endpoints. User data includes name, age, email, etc. MongoDB stores the data. Simplifying user data management and integration into applications.', 
      contact:{
        name:'Rituraj',
        url:'abcd.com',
        email:'ritu31b@gmail.com'
      },
    },
    servers: [
      {
        url: "http://localhost:4000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spacs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs));

mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log(`listening on port ${4000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
