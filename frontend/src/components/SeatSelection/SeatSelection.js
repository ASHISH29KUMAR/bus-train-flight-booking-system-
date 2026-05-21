import React, { useState } from 'react';

import { FaAngleDoubleDown } from "react-icons/fa";

import './Tab.css';



export default function SeatSelection({ transportType }) {

    // =========================
    // STATES
    // =========================
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [arrowDown, setArrowDown] = useState(false);

    const [passengers, setPassengers] = useState([]);

    const [reservedSeat] = useState([
        "1A",
        "2A",
        "2B",
        "3B",
        "4A",
        "5C",
        "6A",
        "7B",
        "7C",
        "8B",
        "9B",
        "9C"
    ]);

    const [trainPreference, setTrainPreference] = useState({
        window: false,
        berth: "Lower"
    });



    // =========================
    // GENERATE SEATS
    // =========================
    const seats = [];

    for (let row = 1; row <= 10; row++) {

        ['A', 'B', 'C'].forEach(letter => {

            seats.push(`${row}${letter}`);
        });
    }



    // =========================
    // SELECT / UNSELECT SEAT
    // =========================
    const handleSeatSelection = (seat) => {

        // RESERVED
        if (reservedSeat.includes(seat)) {

            return;
        }

        // REMOVE
        if (selectedSeats.includes(seat)) {

            const updatedSeats =
                selectedSeats.filter(
                    s => s !== seat
                );

            setSelectedSeats(updatedSeats);

            setPassengers(
                passengers.filter(
                    p => p.seatNo !== seat
                )
            );
        }

        // ADD
        else {

            setSelectedSeats([
                ...selectedSeats,
                seat
            ]);
        }
    };



    // =========================
    // PASSENGER DATA
    // =========================
    const updatePassenger = (
        seatNo,
        field,
        value
    ) => {

        const passengerExists =
            passengers.find(
                p => p.seatNo === seatNo
            );

        // UPDATE
        if (passengerExists) {

            const updatedPassengers =
                passengers.map((p) => {

                    if (p.seatNo === seatNo) {

                        return {
                            ...p,
                            [field]: value
                        };
                    }

                    return p;
                });

            setPassengers(updatedPassengers);
        }

        // CREATE
        else {

            setPassengers([
                ...passengers,
                {
                    seatNo,
                    [field]: value
                }
            ]);
        }
    };



    // =========================
    // CONFIRM
    // =========================
    const handleSubmitDetails = (e) => {

        e.preventDefault();

        localStorage.setItem(
            'reservedSeats',
            JSON.stringify(selectedSeats)
        );

        localStorage.setItem(
            'passengerData',
            JSON.stringify(passengers)
        );

        localStorage.setItem(
            'transportType',
            transportType
        );

        localStorage.setItem(
            'trainPreference',
            JSON.stringify(trainPreference)
        );

        setArrowDown(true);

        alert('Seats Confirmed');
    };



    // =========================
    // PASSENGER FORMS
    // =========================
    const renderPassengerForms = () => {

        return selectedSeats.map((seat, idx) => (

            <div
                key={idx}
                className="form seatfrm"
            >

                <p className="text-center">

                    Seat No : {seat}

                </p>


                {/* NAME */}
                <input
                    className="form-control seatInp"
                    type="text"
                    placeholder="Passenger Name"
                    onChange={(e) =>
                        updatePassenger(
                            seat,
                            'name',
                            e.target.value
                        )
                    }
                />


                {/* GENDER */}
                <div className="mt-2">

                    <label>

                        <input
                            type="radio"
                            name={`gender-${seat}`}
                            value="Male"
                            onChange={(e) =>
                                updatePassenger(
                                    seat,
                                    'gender',
                                    e.target.value
                                )
                            }
                        />

                        {' '} Male

                    </label>


                    <label className="ml-3">

                        <input
                            type="radio"
                            name={`gender-${seat}`}
                            value="Female"
                            onChange={(e) =>
                                updatePassenger(
                                    seat,
                                    'gender',
                                    e.target.value
                                )
                            }
                        />

                        {' '} Female

                    </label>

                </div>

            </div>
        ));
    };



    // =========================
    // TRAIN PREFERENCES
    // =========================
    const renderTrainPreference = () => {

        if (transportType !== 'train') {

            return null;
        }

        return (

            <div className="train-pref-box">

                <h5>

                    Train Preferences

                </h5>


                {/* WINDOW */}
                <div className="form-check">

                    <input
                        type="checkbox"
                        id="windowSeat"
                        className="form-check-input"
                        onChange={(e) =>
                            setTrainPreference({
                                ...trainPreference,
                                window: e.target.checked
                            })
                        }
                    />

                    <label
                        htmlFor="windowSeat"
                        className="form-check-label"
                    >

                        Prefer Window Seat

                    </label>

                </div>



                {/* BERTH */}
                <div className="mt-3">

                    <label>

                        Berth Preference

                    </label>

                    <select
                        className="form-control"
                        onChange={(e) =>
                            setTrainPreference({
                                ...trainPreference,
                                berth: e.target.value
                            })
                        }
                    >

                        <option value="Lower">
                            Lower
                        </option>

                        <option value="Middle">
                            Middle
                        </option>

                        <option value="Upper">
                            Upper
                        </option>

                    </select>

                </div>


                <p className="mt-3 text-muted">

                    Seats will be assigned
                    automatically based on
                    availability.

                </p>

            </div>
        );
    };



    // =========================
    // RENDER SEATS
    // =========================
    const renderSeats = () => {

        return seats.map((seat, idx) => {

            const reserved =
                reservedSeat.includes(seat);

            const selected =
                selectedSeats.includes(seat);

            return (

                <div
                    key={idx}
                    className="seatBox"
                >

                    <input
                        type="checkbox"
                        id={seat}
                        checked={selected}
                        disabled={reserved}
                        onChange={() =>
                            handleSeatSelection(seat)
                        }
                    />

                    <label
                        htmlFor={seat}
                        className={
                            reserved
                                ? 'reservedSeat'
                                : selected
                                    ? 'selectedSeat'
                                    : 'availableSeat'
                        }
                    >

                        {seat}

                    </label>

                </div>
            );
        });
    };



    // =========================
    // UI
    // =========================
    return (

        <div className="ss">

            <div className="row">

                {/* =========================
                    LEFT SIDE
                ========================= */}
                <div className="column1">

                    {
                        transportType === 'train'

                            ? renderTrainPreference()

                            :

                            <div className="plane">

                                <div className="seatGrid">

                                    {renderSeats()}

                                </div>

                            </div>
                    }

                </div>



                {/* =========================
                    RIGHT SIDE
                ========================= */}
                <div className="column2">

                    <div className="seatInfo">

                        {/* SELECTED */}
                        <h5>

                            Selected Seats

                        </h5>

                        <p>

                            {
                                selectedSeats.length > 0

                                    ? selectedSeats.join(', ')

                                    : 'No seats selected'
                            }

                        </p>


                        {/* FORMS */}
                        {renderPassengerForms()}


                        {/* BUTTON */}
                        <button
                            onClick={handleSubmitDetails}
                            className="btn btn-info seatBT"
                        >

                            Confirm Details

                        </button>


                        {/* ARROW */}
                        <div
                            className={
                                arrowDown
                                    ? 'activeArrow2'
                                    : 'nonActive'
                            }
                        >

                            <FaAngleDoubleDown />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}