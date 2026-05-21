// models/Train.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainSchema = new Schema({
    trainName: {
        type: String
    },
    trainType: {
        type: String
    },
    trainNumber: {
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
}, { collection: "trains" });

const train = mongoose.model('train', TrainSchema);

module.exports = train;