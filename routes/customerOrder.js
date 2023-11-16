const express = require('express');
const router = express.Router();
const connection = require('../server')

// Define routes for Employee
router.get('/customerOrders', (req, res)=> {
    console.log('customerOrders');
    connection.execute({
        sqlText: 'select * from customer_order',
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

router.get('/:customer_order_id', (req, res) => {
    const customer_order_id = req.params.customer_order_id;
    console.log('id: ' + customer_order_id);
    connection.execute({
        sqlText: 'select * from customer_order where customer_order_id = :1',
        binds: [customer_order_id],
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


// Define other routes for CRUD operations...

module.exports = router;