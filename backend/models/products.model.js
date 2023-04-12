const mongoose = require('mongoose');

const Dishes = mongoose.model(
    "Dishes",
    new mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        wait: Number,
        image: String
    }),
);

const Drinks = mongoose.model(
    "Drinks",
    new mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        image: String
    })
);

const Asides = mongoose.model(
    "Asides",
    new mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        wait: Number,
        image: String
    })
);

module.exports = {
    Dishes,
    Drinks,
    Asides
};