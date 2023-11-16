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

module.exports = router;