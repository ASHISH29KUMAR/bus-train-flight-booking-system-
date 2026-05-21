import React from 'react';

import './TicketPage.css';



export default function TicketPage({ history }) {

    // =========================
    // SIGN OUT
    // =========================
    const handleSignOut = (e) => {

        e.preventDefault();

        sessionStorage.removeItem('authToken');

        localStorage.clear();

        history.push('/');
    };



    // =========================
    // BOOK AGAIN
    // =========================
    const handleBookAgainIcon = (e) => {

        e.preventDefault();

        history.push('/routes');
    };



    // =========================
    // LOCATION DATA
    // =========================
    const getLocationData = () => {

        const from =
            localStorage.getItem('start');

        const to =
            localStorage.getItem('destination');

        return (

            <div>

                <p>
                    From : {from}
                </p>

                <p>
                    To : {to}
                </p>

            </div>
        );
    };



    // =========================
    // PASSENGERS
    // =========================
    const getPassengerName = () => {

        const passData =
            localStorage.getItem('passengerData');

        if (!passData) {

            return (
                <p>
                    No passenger data found
                </p>
            );
        }

        const passengers =
            JSON.parse(passData);

        return passengers.map((p, idx) => (

            <div key={idx}>

                <p className="names">

                    {p.name}

                </p>

            </div>
        ));
    };



    // =========================
    // SEAT NUMBERS
    // =========================
    const getSeatNumbers = () => {

        const noArray =
            localStorage.getItem('reservedSeats');

        if (!noArray) {

            return (
                <p>
                    No seats selected
                </p>
            );
        }

        const seats =
            JSON.parse(noArray);

        return seats.map((seat, idx) => (

            <div key={idx}>

                <p className="seatNo">

                    {seat}

                </p>

            </div>
        ));
    };



    // =========================
    // TRANSACTION ID
    // =========================
    const getIdNumber = () => {

        const transportId =

            localStorage.getItem('selectedTransportId')

            ||

            localStorage.getItem('selectedBusId')

            ||

            'UT-' + Math.floor(Math.random() * 1000000);

        return (

            <p className="idData">

                {transportId}

            </p>
        );
    };



    // =========================
    // DATE
    // =========================
    const getDateValue = () => {

        const dat =
            localStorage.getItem('date');

        return (

            <p>

                On : {dat}

            </p>
        );
    };



    // =========================
    // TRANSPORT TYPE
    // =========================
    const getTransportType = () => {

        const type =
            localStorage.getItem('transportType');

        return (

            <p>

                Transport : {type || 'Bus'}

            </p>
        );
    };



    // =========================
    // TRAIN PREFERENCE
    // =========================
    const renderTrainPreference = () => {

        const pref =
            localStorage.getItem('trainPreference');

        if (!pref) return null;

        const preference =
            JSON.parse(pref);

        const type =
            localStorage.getItem('transportType');

        if (type !== 'train') return null;

        return (

            <div>

                <h3>
                    Train Preference
                </h3>

                <p>
                    Window Preference :
                    {' '}
                    {preference.window
                        ? 'Yes'
                        : 'No'}
                </p>

                <p>
                    Berth :
                    {' '}
                    {preference.berth}
                </p>

            </div>
        );
    };



    // =========================
    // UI
    // =========================
    return (

        <div className="container">

            {/* =========================
                NAVBAR
            ========================= */}
            <div>

                <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">

                    <a
                        href="/#"
                        className="navbar-brand Company-Log"
                    >

                        UT

                    </a>


                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent-3"
                        aria-controls="navbarSupportedContent-3"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >

                        <span className="navbar-toggler-icon"></span>

                    </button>


                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent-3"
                    >

                        <ul className="navbar-nav ml-auto nav-flex-icons ic">

                            <li className="nav-item">

                                <a
                                    href="/#"
                                    className="nav-link waves-effect waves-light"
                                    onClick={handleBookAgainIcon}
                                >

                                    Book Again

                                </a>

                            </li>


                            <li className="nav-item">

                                <a
                                    href="/#"
                                    className="nav-link waves-effect waves-light"
                                    onClick={handleSignOut}
                                >

                                    Sign-Out

                                </a>

                            </li>

                        </ul>

                    </div>

                </nav>

            </div>



            {/* =========================
                TICKET
            ========================= */}
            <div className="tpMain">

                <article className="ticket">

                    {/* HEADER */}
                    <header className="ticket__wrapper">

                        <div className="ticket__header">

                            🎟 UNIQUE TRAVELS

                        </div>

                    </header>



                    {/* DIVIDER */}
                    <div className="ticket__divider">

                        <div className="ticket__notch"></div>

                        <div className="ticket__notch ticket__notch--right"></div>

                    </div>



                    {/* BODY */}
                    <div className="ticket__body">

                        {/* ROUTE */}
                        <section className="ticket__section">

                            <h3>
                                Route Details
                            </h3>

                            {getLocationData()}

                            {getTransportType()}

                            {getDateValue()}

                        </section>



                        {/* SEATS */}
                        <section className="ticket__section">

                            <h3>
                                Seat Numbers
                            </h3>

                            {getSeatNumbers()}

                        </section>



                        {/* PASSENGERS */}
                        <section className="ticket__section">

                            <h3>
                                Passenger Names
                            </h3>

                            {getPassengerName()}

                        </section>



                        {/* TRAIN PREFERENCES */}
                        <section className="ticket__section">

                            {renderTrainPreference()}

                        </section>



                        {/* PAYMENT */}
                        <section className="ticket__section">

                            <h3>
                                Payment Method
                            </h3>

                            <p>
                                Credit Card
                            </p>

                        </section>

                    </div>



                    {/* FOOTER */}
                    <footer className="ticket__footer">

                        <p>
                            Transaction ID
                        </p>

                        {getIdNumber()}

                    </footer>

                </article>

            </div>

        </div>
    );
}