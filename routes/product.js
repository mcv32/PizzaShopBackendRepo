const express = require('express');
const router = express.Router();
const connection = require('../server')

// Define routes for Customer
router.get('/products', (req, res)=> {
    console.log('products');
    connection.execute({
        sqlText: 'select * from product',
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


router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log('id: ' + id);
    connection.execute({
        sqlText: 'select * from product where id = :1',
        binds: [id],
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