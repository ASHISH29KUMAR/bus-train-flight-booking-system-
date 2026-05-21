var express = require('express');

var router = express.Router();


// =========================
// MODELS
// =========================
var Bus = require('../models/Buses');

var Flight = require('../models/Flight');

var Train = require('../models/Train');



/* ======================================================
   BUS ROUTES
====================================================== */


/* =========================
   SEARCH BUS
========================= */
router.post('/bus/search', async (req, res) => {

    try {

        const buses = await Bus.find({

            startCity: req.body.startCity,

            destination: req.body.destination

        });

        res.status(200).json({

            status: true,

            count: buses.length,

            buses

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            status: false,

            message: 'Error while searching buses'

        });
    }
});



/* =========================
   GET BUS BY ID
========================= */
router.post('/bus/id', async (req, res) => {

    try {

        const bus = await Bus.findById(req.body.bId);

        if (!bus) {

            return res.status(404).json({

                status: false,

                message: 'Bus not found'

            });
        }

        res.status(200).json({

            status: true,

            bus

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            status: false,

            message: 'Error while searching bus by ID'

        });
    }
});



/* =========================
   ADD NEW BUS
========================= */
router.post('/bus/add', async (req, res) => {

    try {

        const newBus = new Bus({

            companyName: req.body.companyName,

            busType: req.body.busType,

            busNumber: req.body.busNumber,

            startCity: req.body.startCity,

            destination: req.body.destination,

            totalSeats: req.body.totalSeats,

            availableSeats: req.body.availableSeats,

            pricePerSeat: req.body.pricePerSeat

        });

        const savedBus = await newBus.save();

        res.status(201).json({

            status: true,

            message: 'Bus added successfully',

            bus: savedBus

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            status: false,

            message: 'Error while adding bus'

        });
    }
});



/* ======================================================
   FLIGHT ROUTES
====================================================== */


/* =========================
   SEARCH FLIGHT
========================= */
router.post('/flight/search', async (req, res) => {

    try {

        const flights = await Flight.find({

            startCity: req.body.startCity,

            destination: req.body.destination

        });

        res.status(200).json({

            status: true,

            count: flights.length,

            flights

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            status: false,

            message: 'Error while searching flights'

        });
    }
});



/* =========================
   GET FLIGHT BY ID
========================= */
router.post('/flight/id', async (req, res) => {

    try {

        const flight = await Flight.findById(req.body.fId);

        if (!flight) {

            return res.status(404).json({

                status: false,

                message: 'Flight not found'

            });
        }

        res.status(200).json({

            status: true,

            flight

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            status: false,

            message: 'Error while searching flight by ID'

        });
    }
});



/* =========================
   ADD NEW FLIGHT
========================= */
router.post('/flight/add', async (req, res) => {

    try {

        const newFlight = new Flight({

            airlineName: req.body.airlineName,

            flightType: req.body.flightType,

            flightNumber: req.body.flightNumber,

            startCity: req.body.startCity,

            destination: req.body.destination,

            departureTime: req.body.departureTime,

            arrivalTime: req.body.arrivalTime,

            totalSeats: req.body.totalSeats,

            availableSeats: req.body.availableSeats,

            pricePerSeat: req.body.pricePerSeat

        });

        const savedFlight = await newFlight.save();

        res.status(201).json({

            status: true,

            message: 'Flight added successfully',

            flight: savedFlight

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            status: false,

            message: 'Error while adding flight'

        });
    }
});



/* ======================================================
   TRAIN ROUTES
====================================================== */


/* =========================
   SEARCH TRAIN
========================= */
router.post('/train/search', async (req, res) => {

    try {

        const trains = await Train.find({

            startCity: req.body.startCity,

            destination: req.body.destination

        });

        res.status(200).json({

            status: true,

            count: trains.length,

            trains

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            status: false,

            message: 'Error while searching trains'

        });
    }
});



/* =========================
   GET TRAIN BY ID
========================= */
router.post('/train/id', async (req, res) => {

    try {

        const train = await Train.findById(req.body.tId);

        if (!train) {

            return res.status(404).json({

                status: false,

                message: 'Train not found'

            });
        }

        res.status(200).json({

            status: true,

            train

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            status: false,

            message: 'Error while searching train by ID'

        });
    }
});



/* =========================
   ADD NEW TRAIN
========================= */
router.post('/train/add', async (req, res) => {

    try {

        const newTrain = new Train({

            trainName: req.body.trainName,

            trainType: req.body.trainType,

            trainNumber: req.body.trainNumber,

            startCity: req.body.startCity,

            destination: req.body.destination,

            departureTime: req.body.departureTime,

            arrivalTime: req.body.arrivalTime,

            totalSeats: req.body.totalSeats,

            availableSeats: req.body.availableSeats,

            pricePerSeat: req.body.pricePerSeat

        });

        const savedTrain = await newTrain.save();

        res.status(201).json({

            status: true,

            message: 'Train added successfully',

            train: savedTrain

        });

    }
    catch (err) {

        console.log(err);

        res.status(500).json({

            status: false,

            message: 'Error while adding train'

        });
    }
});



/* ======================================================
   TEST ROUTE
====================================================== */
router.get('/', (req, res) => {

    res.json({

        status: true,

        message: 'Booking Route Working'

    });

});



module.exports = router;