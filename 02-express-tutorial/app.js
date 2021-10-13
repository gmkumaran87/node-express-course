console.log("Express Tutorial");
const express = require("express");
const path = require("path");

//Data
const { products, people } = require("./data");

//Middleware
const logger = require("./logger");
const authorize = require("./authorize");

//Routers
const peopleRoute = require("./routers/people");

const app = express();

// Using Static files setup
app.use(express.static("./public"));
// Invoking the Middlewares for /api/ routes
app.use("/api/", [logger, authorize]);

//For Post request body parser
app.use(express.json());

// Router setup
app.use("/api/postman/people", peopleRoute);

//Sending the HTML index.html file to the browser and Middleware Logger
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});

// Sending JSON data
app.get("/api/products", (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, price, image } = product;
        return { id, name, price, image };
    });
    res.json(newProducts);
});

// Params - Sending single product
// Sending JSON data
app.get("/api/products/:productId", (req, res) => {
    const { productId } = req.params;

    const newProduct = products.find((product) => {
        return product.id === Number(productId);
    });

    if (newProduct) {
        res.json(newProduct);
    } else {
        res.status(404).send(`<h2>Searched Product - ${productId} is not found...`);
    }
});

// Query string params
app.get("/api/products/v1/query", (req, res) => {
    const { search, limit } = req.query;

    console.log(search, limit, products);

    let searchedProducts = [...products];

    if (search) {
        searchedProducts = searchedProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    }
    if (limit) {
        searchedProducts = searchedProducts.slice(0, Number(limit));
    }
    console.log(`SearchedProducts`, searchedProducts);
    if (searchedProducts.length === 0) {
        return res.status(404).json({ success: true, data: [] });
    }
    res.status(200).json(searchedProducts);
});

app.get("*", (req, res) => {
    res.status(404).send("<h2> Page not found ! </h2>");
});
app.listen(5000, () => {
    console.log("App is listening at 5000...!");
});

/*const http = require("http");
        const { readFileSync } = require("fs");

        const homePage = readFileSync("./navbar-app/index.html");
        const cssPage = readFileSync("./navbar-app/styles.css");
        const jsPage = readFileSync("./navbar-app/browser-app.js");
        const logo = readFileSync("./navbar-app/logo.svg");

        const server = http.createServer((req, res) => {
            const url = req.url;

            if (url === "/") {
                res.writeHead(200, { "content-type": "text/html" });
                res.write(homePage);
                res.end();
            } else if (url === "/about") {
                res.writeHead(200, { "content-type": "text/html" });
                res.write("<h2> About Us </h2>");
                res.end();
            } else if (url === "/styles.css") {
                res.writeHead(200, { "content-type": "text/css" });
                res.write(cssPage);
                res.end();
            } else if (url === "/logo.svg") {
                res.writeHead(200, { "content-type": "image/svg+xml" });
                res.write(logo);
                res.end();
            } else if (url === "/browser-app.jss") {
                res.writeHead(200, { "content-type": "text/javascript" });
                res.write(jsPage);
                res.end();
            }
        });

        server.listen(5000);*/