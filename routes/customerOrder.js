const express = require('express');
const router = express.Router();
const connection = require('../server')
const utils = require('../utils')


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

//  who and what time made the order
router.get('/customerOrders/:phone_number', (req, res) => {
    const phone_number = req.params.phone_number;
    console.log('id: ' + phone_number);
    connection.execute({
        sqlText: 'select customer_order_id, Phone_Number,time_and_date as time from customer_order',
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

// orders by week
router.get('/customerOrders/weeks/', (req, res) => {
    const startdate = utils.parseDate(req.query.start) ?? utils.defaultStartDate();
    const enddate = utils.parseDate(req.query.end) ?? utils.defaultEndDate();
    //console.log('start: ' + startdate + ', end: ' + enddate);
    connection.execute({
        sqlText: 'select * from customer_order where date(time_and_date) >= :1 and date(time_and_date) <= :2',
        binds: [startdate, enddate],
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
// 

// delete a customer order
router.delete('/customerOrder/delete/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    connection.execute({
        sqlText: 'DELETE FROM CUSTOMER_ORDER WHERE CUSTOMER_ORDER_ID = :1',
        binds: [orderId],
        complete: (err, stmt, result) => {
            if (err) {
                console.error('Unable to delete customer order', err);
                res.status(500).json({ error: 'Unable to delete customer order' });
            } else {
                if (result.rowsAffected && result.rowsAffected === 1) {
                    res.status(200).json({ message: 'Customer order deleted successfully' });
                } else {
                    res.status(404).json({ error: 'Order not found or no changes applied' });
                }
            }
        },
    });
});

// remove a product no matter the quantity in a customer order
router.delete('/customerOrder/delete/:orderId/:product_id', (req, res) => {
    const orderId = req.params.orderId;
    const product_id = req.params.product_id;

    connection.execute({
        sqlText: 'DELETE FROM CUSTOMER_ORDER WHERE CUSTOMER_ORDER_ID = :1 AND product_id = :2',
        binds: [orderId, product_id],
        complete: (err, stmt, result) => {
            if (err) {
                console.error('Unable to delete customer order', err);
                res.status(500).json({ error: 'Unable to delete customer order' });
            } else {
                if (result.rowsAffected && result.rowsAffected === 1) {
                    res.status(200).json({ message: 'Customer order deleted successfully' });
                } else {
                    res.status(404).json({ error: 'Order not found or no changes applied' });
                }
            }
        },
    });
});

// delete one product from the customer order
router.delete('/customerOrder/delete/:orderId/:product_id/minus', (req, res) => {
    const orderId = req.params.orderId;
    const product_id = req.params.product_id;

    connection.execute({
        sqlText: 'DELETE FROM CUSTOMER_ORDER WHERE CUSTOMER_ORDER_ID = :1 AND product_id = :2 limit 1',
        binds: [orderId, product_id],
        complete: (err, stmt, result) => {
            if (err) {
                console.error('Unable to delete customer order', err);
                res.status(500).json({ error: 'Unable to delete customer order' });
            } else {
                if (result.rowsAffected && result.rowsAffected === 1) {
                    res.status(200).json({ message: 'Customer order deleted successfully' });
                } else {
                    res.status(404).json({ error: 'Order not found or no changes applied' });
                }
            }
        },
    });
});



// Define other routes for CRUD operations...

module.exports = router;