const express = require('express');
const router = express.Router();
const connection = require('../server')

// Define routes for Employee
router.get('/orders', (req, res)=> {
    console.log('/orders');
    connection.execute({
        sqlText: 'select * from order_detail',
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

router.get('/:order_id', (req, res) => {
    const order_id = req.params.order_id;
    console.log('id: ' + order_id);
    connection.execute({
        sqlText: 'select * from order_detail where order_id = :1',
        binds: [order_id],
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