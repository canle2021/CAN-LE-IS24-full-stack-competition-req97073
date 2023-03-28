// this file will get all the handlers to process them as a server.
("use strict");
// code should be executed in "strict mode".
const express = require("express");
const morgan = require("morgan");
// Morgan is an HTTP request level Middleware

// import APIs here
const { getProductsData } = require("./handlers/getProducts");
const { createProduct } = require("./handlers/createProduct");
// import APIs here

const PORT = 3000;

const app = express();
// .use() will add a middleware to app()
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE, PACTH"
  );
  // function (req, res, next) will be passed as this format
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // some kinds of respones'headers to the front end
  next();
  // move to next middelware
});
app.use(morgan("tiny"));
// The preset "tiny" provides the minimal output when logging HTTP requests.
// presets like "tiny" in a format string as: morgan(':method :url :status :res[content-length] - :response-time ms');
app.use(express.static("./server/assets"));
// serves static files and is based on serve-static.
app.use(express.json());
// parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.urlencoded({ extended: false }));
// parses incoming requests with URL-encoded payloads and is based on a body parser. The "extended: false" option allows to choose between parsing the URL-encoded data with the querystring library.
app.use("/", express.static(__dirname + "/"));
// use "/" as direction in the url, dirname as a string
// RESTFUL endpoints
app.get(`/api/get-all-products`, getProductsData);
app.post(`/api/create-product`, createProduct);

// RESTFUL endpoints
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "We dont have any endpoint like what you put in.",
  });
});
// any api called outside this "/" will be a 404 error api
app.listen(PORT, () => console.info(`LISTENING ON PORT ${PORT}`));
// make sure this backend is running on the port of 8000.
