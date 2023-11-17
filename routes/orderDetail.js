const express = require('express');
const router = express.Router();
const connection = require('../server')
const utils = require('../utils');

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

router.get('/orders/:employee', (req, res) => {
    const employee = req.params.employee;
    console.log('id: ' + employee);
    connection.execute({
        sqlText: 'select * from employee inner join order_detail on employee.EMPLOYEE_ID = :1',
        binds: [employee],
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

// orders that counts the number of orders for each zip code for a specified week
router.get('/orders/weeks/zipcode/', (req, res) => {
    const startdate = utils.parseDate(req.query.start) ?? utils.defaultStartDate();
    const enddate = utils.parseDate(req.query.end) ?? utils.defaultEndDate();

    // Creating the 'zipcode' table
    connection.execute({
        sqlText: 'CREATE or replace TABLE zipcode AS SELECT zip_code, time_and_date FROM customer INNER JOIN customer_order ON customer.phone_number = customer_order.phone_number',
        complete: (createTableErr) => {
            if (createTableErr) {
                console.error('Unable to create table', createTableErr);
                res.status(500).json({ error: 'Unable to create table' });
            } else {
                // Selecting data from 'zipcode' table
                connection.execute({
                    sqlText: 'SELECT zip_code, COUNT(*) as total_orders FROM zipcode WHERE time_and_date >= :1 AND time_and_date <= :2 GROUP BY zip_code',
                    binds: [startdate, enddate],
                    complete: (selectDataErr, stmt, rows) => {
                        if (selectDataErr) {
                            console.error('Unable to retrieve order data', selectDataErr);
                            res.status(500).json({ error: 'Unable to retrieve order data' });
                        } else {
                            res.status(200).json(rows);
                        }
                    },
                });
            }
        },
    });
});

// orders that counts the number of orders for each employee for a specified week
router.get('/orders/weeks/employee/', (req, res) => {
    const startdate = utils.parseDate(req.query.start) ?? utils.defaultStartDate();
    const enddate = utils.parseDate(req.query.end) ?? utils.defaultEndDate();

    // Creating the 'zipcode' table
    connection.execute({
        sqlText: 'create or replace table orders as select name,time_and_date from employee inner join order_detail on employee.employee_id = order_detail.employee_id inner join customer_order on order_detail.customer_id = customer_order.phone_number',
        complete: (createTableErr) => {
            if (createTableErr) {
                console.error('Unable to create table', createTableErr);
                res.status(500).json({ error: 'Unable to create table' });
            } else {
                // Selecting data from 'zipcode' table
                connection.execute({
                    sqlText: 'SELECT name,count(*) as total_orders FROM orders WHERE TIME_AND_DATE >= :1 AND TIME_AND_DATE <= :2 group by name',
                    binds: [startdate, enddate],
                    complete: (selectDataErr, stmt, rows) => {
                        if (selectDataErr) {
                            console.error('Unable to retrieve order data', selectDataErr);
                            res.status(500).json({ error: 'Unable to retrieve order data' });
                        } else {
                            res.status(200).json(rows);
                        }
                    },
                });
            }
        },
    });
});

// Define other routes for CRUD operations...

module.exports = router;