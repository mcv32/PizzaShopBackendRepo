
const express = require('express');
const router = express.Router();
const connection = require('../server')

// Define routes for Employee
router.get('/employees', (req, res)=> {
    console.log('employees');
    connection.execute({
        sqlText: 'select * from employee',
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
        sqlText: 'select * from employee where employee_id = :1',
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


// Define other routes for CRUD operations...

module.exports = router;