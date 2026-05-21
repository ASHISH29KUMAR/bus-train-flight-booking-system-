import React, { useState } from 'react';

import './Routeselector.css';

import * as apiCall from './routeApifunc';

import BusList from '../BusList/BusList';



export default function Routeselector({ transportType }) {

    // =========================
    // STATES
    // =========================
    const [dataInp, setData] = useState([]);

    const [startCity, setStartCity] = useState('');

    const [destination, setDestination] = useState('');

    const [travelDate, setTravelDate] = useState('');

    const [loading, setLoading] = useState(false);



    // =========================
    // FROM CITY
    // =========================
    const handleFromCity = (e) => {

        const value = e.target.value;

        setStartCity(value);

        localStorage.setItem('start', value);
    };



    // =========================
    // TO CITY
    // =========================
    const handleToCity = (e) => {

        const value = e.target.value;

        setDestination(value);

        localStorage.setItem('destination', value);
    };



    // =========================
    // DATE
    // =========================
    const handleDate = (e) => {

        const value = e.target.value;

        setTravelDate(value);

        localStorage.setItem('date', value);
    };



    // =========================
    // GET ROUTES
    // =========================
    const getRoutes = async (e) => {

        e.preventDefault();

        // VALIDATION
        if (!startCity || !destination) {

            alert('Please select cities');

            return;
        }

        if (!transportType) {

            alert('Please select transport type');

            return;
        }

        try {

            setLoading(true);

            console.log("REQUEST => ", {
                transportType,
                startCity,
                destination
            });

            const response =
                await apiCall.getRoutesFromApi(
                    transportType,
                    startCity,
                    destination
                );

            console.log("FULL RESPONSE => ", response);

            console.log("RESPONSE DATA => ", response.data);


            // =========================
            // BUS
            // =========================
            if (transportType === 'bus') {

                setData(response.data.buses || []);
            }


            // =========================
            // FLIGHT
            // =========================
            else if (transportType === 'flight') {

                setData(response.data.flights || []);
            }


            // =========================
            // TRAIN
            // =========================
            else if (transportType === 'train') {

                setData(response.data.trains || []);
            }

            setLoading(false);

        }
        catch (err) {

            console.log("ERROR => ", err);

            if (err.response) {

                console.log(
                    "BACKEND ERROR => ",
                    err.response.data
                );
            }

            setLoading(false);

            alert('Error while fetching routes');
        }
    };



    // =========================
    // RENDER LIST
    // =========================
    const renderTransportList = () => {

        if (loading) {

            return (
                <h4 className="text-center mt-4">
                    Loading...
                </h4>
            );
        }

        if (dataInp.length === 0) {

            return (
                <h5 className="text-center mt-4">
                    No routes found
                </h5>
            );
        }

        return (

            <BusList
                value={dataInp}
                transportType={transportType}
            />

        );
    };



    // =========================
    // UI
    // =========================
    return (

        <div className="rdc">

            <div className="main-container">

                <form
                    className="form-inline"
                    onSubmit={getRoutes}
                >

                    {/* FROM */}
                    <select
                        className="selectpicker form-control mr-2"
                        onChange={handleFromCity}
                        value={startCity}
                    >

                        <option value="">
                            FROM
                        </option>

                        <option value="Chennai">
                            Chennai
                        </option>

                        <option value="Bangalore">
                            Bangalore
                        </option>

                        <option value="Hyderabad">
                            Hyderabad
                        </option>

                        <option value="Vijayawada">
                            Vijayawada
                        </option>

                    </select>



                    {/* TO */}
                    <select
                        className="selectpicker form-control mr-2"
                        onChange={handleToCity}
                        value={destination}
                    >

                        <option value="">
                            TO
                        </option>

                        <option value="Hyderabad">
                            Hyderabad
                        </option>

                        <option value="Coimbatore">
                            Coimbatore
                        </option>

                        <option value="Visakhapatnam">
                            Visakhapatnam
                        </option>

                        <option value="Bangalore">
                            Bangalore
                        </option>

                        <option value="Chennai">
                            Chennai
                        </option>

                        <option value="Vijayawada">
                            Vijayawada
                        </option>

                    </select>



                    {/* DATE */}
                    <input
                        type="date"
                        className="form-control mr-2"
                        onChange={handleDate}
                        value={travelDate}
                    />



                    {/* BUTTON */}
                    <input
                        type="submit"
                        className="btn btn-primary btn-md getRoute"
                        value={`Search ${transportType}`}
                    />

                </form>



                {/* RESULTS */}
                <div className="mt-4">

                    {renderTransportList()}

                </div>

            </div>

        </div>
    );
}