// models/Flight.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
    airlineName: {
        type: String
    },
    flightType: {
        type: String
    },
    flightNumber: {
        type: String
    },
    startCity: {
        type: String
    },
    destination: {
        type: String
    },
    departureTime: {
        type: String
    },
    arrivalTime: {
        type: String
    },
    totalSeats: {
        type: String
    },
    availableSeats: {
        type: String
    },
    pricePerSeat: {
        type: String
    }
}, { collection: "flights" });

const flight = mongoose.model('flight', FlightSchema);

module.exports = flight;