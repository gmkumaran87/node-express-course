require("dotenv").config();

const connectDb = require("./db/connect");
const Products = require("./models/product");

const jsonProduct = require("./products.json");

const start = async() => {
    try {
        await connectDb(process.env.MONGO_URI);
        console.log(Products);
        await Products.deleteMany(); // Deleting the table records
        await Products.create(jsonProduct);
        console.log("Successfully added the products...");
        process.exit(0); // Exiting the process
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();