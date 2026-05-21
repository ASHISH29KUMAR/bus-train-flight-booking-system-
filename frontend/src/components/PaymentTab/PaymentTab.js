import React from 'react';

import Card from 'react-credit-cards';

import jwt_decode from 'jwt-decode';

import './PaymentTab.css';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from './utils';

import 'react-credit-cards/es/styles-compiled.css';



export default class PaymentTab extends React.Component {

    state = {

        number: '',

        name: '',

        expiry: '',

        cvc: '',

        focused: '',

        token: null
    };



    // =========================
    // COMPONENT DID MOUNT
    // =========================
    componentDidMount() {

        const tok =
            sessionStorage.getItem('authToken');

        if (tok) {

            const decoded = jwt_decode(tok);

            this.setState({
                token: decoded.user
            });
        }
    }



    // =========================
    // INPUT FOCUS
    // =========================
    handleInputFocus = ({ target }) => {

        this.setState({

            focused: target.name

        });
    };



    // =========================
    // INPUT CHANGE
    // =========================
    handleInputChange = ({ target }) => {

        if (target.name === 'number') {

            target.value =
                formatCreditCardNumber(target.value);
        }

        else if (target.name === 'expiry') {

            target.value =
                formatExpirationDate(target.value);
        }

        else if (target.name === 'cvc') {

            target.value =
                formatCVC(target.value);
        }

        this.setState({

            [target.name]: target.value

        });
    };



    // =========================
    // PAYMENT
    // =========================
    moveToTicketPage = (e) => {

        e.preventDefault();

        localStorage.setItem(
            'paymentData',
            JSON.stringify(this.state.token)
        );

        alert('Payment Successful');

        window.location.href = '/getTicket';
    };



    // =========================
    // PASSENGERS
    // =========================
    renderPassengers = () => {

        const passData =
            localStorage.getItem('passengerData');

        if (!passData) return null;

        const passengers =
            JSON.parse(passData);

        return passengers.map((p, idx) => (

            <div key={idx}>

                <p className="usrName">

                    {p.name}

                </p>

            </div>
        ));
    };



    // =========================
    // SEATS
    // =========================
    renderSeatNumbers = () => {

        const seatArray =
            localStorage.getItem('reservedSeats');

        if (!seatArray) return null;

        const seats =
            JSON.parse(seatArray);

        return seats.map((seat, idx) => (

            <div key={idx}>

                <p className="usrName">

                    {seat}

                </p>

            </div>
        ));
    };



    // =========================
    // TOTAL
    // =========================
    getSumTotal = () => {

        const seatArray =
            localStorage.getItem('reservedSeats');

        if (!seatArray) {

            return {
                subtotal: 0,
                tax: 0,
                total: 0
            };
        }

        const seats =
            JSON.parse(seatArray);

        const count = seats.length;

        const transportType =
            localStorage.getItem('transportType');

        let ticketPrice = 1000;

        // BUS
        if (transportType === 'bus') {

            ticketPrice = 1000;
        }

        // TRAIN
        else if (transportType === 'train') {

            ticketPrice = 850;
        }

        // FLIGHT
        else if (transportType === 'flight') {

            ticketPrice = 4500;
        }

        const subtotal =
            ticketPrice * count;

        const tax = 150;

        const total =
            subtotal + tax;

        return {
            subtotal,
            tax,
            total
        };
    };



    render() {

        const {
            name,
            number,
            expiry,
            cvc,
            focused
        } = this.state;


        const totals =
            this.getSumTotal();


        return (

            <div className="paym">

                <div className="row">

                    {/* =========================
                        LEFT SIDE
                    ========================= */}
                    <div className="cl-1">

                        <div className="App-payment">

                            <p className="pPayment">

                                Enter Credit Card Details

                            </p>


                            <Card
                                number={number}
                                name={name}
                                expiry={expiry}
                                cvc={cvc}
                                focused={focused}
                            />


                            <form className="credit-form">

                                {/* CARD NUMBER */}
                                <div className="form-group">

                                    <input
                                        type="tel"
                                        name="number"
                                        className="frm-ctrl"
                                        placeholder="Card Number"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />

                                </div>



                                {/* NAME */}
                                <div className="form-group">

                                    <input
                                        type="text"
                                        name="name"
                                        className="frm-ctrl"
                                        placeholder="Name"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />

                                </div>



                                {/* EXPIRY */}
                                <div className="form-group">

                                    <input
                                        type="tel"
                                        name="expiry"
                                        className="frm-ctrl"
                                        placeholder="MM/YY"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />

                                </div>



                                {/* CVC */}
                                <div className="form-group">

                                    <input
                                        type="tel"
                                        name="cvc"
                                        className="frm-ctrl cvc"
                                        placeholder="CVC"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />

                                </div>



                                {/* PAY BUTTON */}
                                <button
                                    onClick={this.moveToTicketPage}
                                    className="btn btn-light btCustom"
                                >

                                    PAY

                                </button>

                            </form>

                        </div>

                    </div>



                    {/* =========================
                        RIGHT SIDE
                    ========================= */}
                    <div className="columnTwo">

                        <h3>

                            Unique Travels

                        </h3>


                        <div>

                            <h5>

                                BOOKING DETAILS

                            </h5>

                            <hr className="hr3" />


                            <div className="row">

                                {/* LEFT LABELS */}
                                <div className="col-6 pt">

                                    <p className="hdng">
                                        Date
                                    </p>

                                    <p className="hdng">
                                        From
                                    </p>

                                    <p className="hdng">
                                        To
                                    </p>

                                    <p className="hdng">
                                        Passengers
                                    </p>

                                    {this.renderPassengers()}

                                    <hr className="hr3" />

                                    <p className="hdng">
                                        Seat Numbers
                                    </p>

                                    <p className="hdng">
                                        Ticket Price
                                    </p>

                                    <p className="hdng">
                                        Tax
                                    </p>

                                    <p className="hdng">
                                        Total
                                    </p>

                                </div>



                                {/* RIGHT VALUES */}
                                <div className="col-6">

                                    <p className="usrName">
                                        {localStorage.getItem('date')}
                                    </p>

                                    <p className="usrName">
                                        {localStorage.getItem('start')}
                                    </p>

                                    <p className="usrName">
                                        {localStorage.getItem('destination')}
                                    </p>

                                    <div>
                                        {this.renderSeatNumbers()}
                                    </div>

                                    <hr className="hr3" />

                                    <p className="usrName">
                                        ₹ {totals.subtotal}
                                    </p>

                                    <p className="usrName">
                                        ₹ {totals.tax}
                                    </p>

                                    <p className="usrName">
                                        ₹ {totals.total}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}