import express, { Request, Response, NextFunction } from 'express';
// var cors: any = require('cors');
import auth from './middleware/auth';
import userRoute from './routes/user.routes'
import memberRoute from './routes/member.routes'
import db from './models';
// import cronJob from './controllers/service/cron'
// import e from 'express';
import commonController from './controllers/common/common.controller';
// import cronJob from './controllers/service/cronJobs'
// const { toHex, fromHex } = require('tron-format-address')
import userController from './controllers/user.controller';
import userCodeController from './controllers/service/user.code.controller';
const ethers = require('ethers')
const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/');
require('dotenv').config();
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express";
import path from 'path';




const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple Book API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://13.239.30.115:4000/api/v1/",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],


  },
  apis: ["./controllers/*.ts", "./routes/*.ts"],
};
const specs = swaggerJsdoc(options);



var cron = require('node-cron');
// const { report } = require('process');
const app = express();
var cors: any = require("cors");
app.use(cors());



const server = require('http').createServer(app);
const port = process.env.PORT || 4001;

app.use("/servicephotos", express.static(path.join(__dirname, 'servicephotos')));
app.use("/photos", express.static(path.join(__dirname, 'photos')));


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
app.get("/", function (req, res) {
  res.send("Response from the GET request")
});

app.use(express.json());
app.use("/servicephotos", express.static(__dirname + "/servicephotos"));
// app.use('/kycImages', express.static(__dirname + '/kycImages'));

// app.use(require('body-parser').urlencoded({ extended: true }));
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/member', auth, memberRoute);
// app.use('/api/v1/member', auth, memberRoute);

app.get("/api/v1/welcome", auth, (req, res) => {
  res.status(200).send("data get successfully ");
});
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use((err: any, req: Request, res: Response, next: any) => {
  const status = err.status || 500;
  res.status(status).json({ error: { message: err } });
});
db.sequelize.sync().then(() => {
  server.listen(port, async () => {
    console.log('App Started', port);


  })
});


