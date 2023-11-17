const express = require('express');
const router = express.Router();
const connection = require('../server')

// Define routes for Customer
router.get('/customers', (req, res)=> {
    console.log('customers');
    connection.execute({
        sqlText: 'select * from customer',
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Unable to retrieve order data', err);
                res.status(500).json({ error: 'Unable to retrieve order data' });
            } else {
                res.status(200).json(rows);
            }
        },
    });
});


router.get('/:phone_number', (req, res) => {
    const phone_number = req.params.phone_number;
    console.log('phone_number: ' + phone_number);
    connection.execute({
        sqlText: 'select * from customer where phone_number = :1',
        binds: [phone_number],
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Unable to retrieve order data', err);
                res.status(500).json({ error: 'Unable to retrieve order data' });
            } else {
                res.status(200).json(rows);
            }
        },
    });
});

// add a customer
router.post('/customer/add', (req, res) => {
    const phoneNumber = req.body.phone_number;
    const zipCode = req.body.zip_code;
    const city = req.body.city;
    const state = req.body.state;
    const streetAddress = req.body.street_address;

    // Assuming validation of required fields and proper data exists

    connection.execute({
        sqlText: 'INSERT INTO CUSTOMER (PHONE_NUMBER, ZIP_CODE, CITY, STATE, ST_ADDRESS) VALUES (:1, :2, :3, :4, :5)',
        binds: [phoneNumber, zipCode, city, state, streetAddress],
        complete: (err, stmt, result) => {
            if (err) {
                console.error('Unable to add customer', err);
                res.status(500).json({ error: 'Unable to add customer' });
            } else {
                if (result.rowsAffected && result.rowsAffected === 1) {
                    res.status(200).json({ message: 'Customer added successfully' });
                } else {
                    res.status(400).json({ error: 'Failed to add customer' });
                }
            }
        },
    });
});


module.exports = router;