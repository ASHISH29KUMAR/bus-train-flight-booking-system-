import Payment from "payment";



// =========================
// REMOVE NON-NUMBERS
// =========================
function clearNumber(value = "") {

    return value.replace(/\D+/g, "");

}



/* ======================================================
   FORMAT CREDIT CARD NUMBER
====================================================== */
export function formatCreditCardNumber(value) {

    if (!value) {

        return value;
    }

    const issuer =
        Payment.fns.cardType(value);

    const clearValue =
        clearNumber(value);

    let nextValue = "";


    switch (issuer) {

        // =========================
        // AMEX
        // =========================
        case "amex":

            nextValue =

                `${clearValue.slice(0, 4)} ` +

                `${clearValue.slice(4, 10)} ` +

                `${clearValue.slice(10, 15)}`;

            break;



        // =========================
        // DINERS CLUB
        // =========================
        case "dinersclub":

            nextValue =

                `${clearValue.slice(0, 4)} ` +

                `${clearValue.slice(4, 10)} ` +

                `${clearValue.slice(10, 14)}`;

            break;



        // =========================
        // DEFAULT
        // =========================
        default:

            nextValue =

                `${clearValue.slice(0, 4)} ` +

                `${clearValue.slice(4, 8)} ` +

                `${clearValue.slice(8, 12)} ` +

                `${clearValue.slice(12, 16)}`;

            break;
    }

    return nextValue.trim();
}



/* ======================================================
   FORMAT CVC
====================================================== */
export function formatCVC(

    value,

    prevValue,

    allValues = {}

) {

    const clearValue =
        clearNumber(value);

    let maxLength = 3;


    // =========================
    // AMEX SUPPORT
    // =========================
    if (allValues.number) {

        const issuer =
            Payment.fns.cardType(allValues.number);

        maxLength =
            issuer === "amex"
                ? 4
                : 3;
    }

    return clearValue.slice(0, maxLength);
}



/* ======================================================
   FORMAT EXPIRATION DATE
====================================================== */
export function formatExpirationDate(value) {

    const clearValue =
        clearNumber(value);


    // =========================
    // MM/YY
    // =========================
    if (clearValue.length >= 3) {

        return (

            `${clearValue.slice(0, 2)}` +

            `/${clearValue.slice(2, 4)}`

        );
    }

    return clearValue;
}



/* ======================================================
   FORMAT FORM DATA
====================================================== */
export function formatFormData(data) {

    if (!data) {

        return [];
    }

    return Object.keys(data).map(

        (key) => `${key}: ${data[key]}`

    );
}