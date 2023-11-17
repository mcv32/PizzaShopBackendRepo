
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

// get an employee by a specified id
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

// add an employee
router.post('/employee/add', (req, res) => {
    const name = req.body.name;
    const status = req.body.status; // Assuming status is provided in the request body

    // Assuming validation of required fields and proper data exists

    connection.execute({
        sqlText: 'INSERT INTO EMPLOYEE (NAME, STATUS) VALUES (:1, :2)',
        binds: [name, status],
        complete: (err, stmt, result) => {
            if (err) {
                console.error('Unable to add employee', err);
                res.status(500).json({ error: 'Unable to add employee' });
            } else {
                if (result.rowsAffected && result.rowsAffected === 1) {
                    res.status(200).json({ message: 'Employee added successfully' });
                } else {
                    res.status(400).json({ error: 'Failed to add employee' });
                }
            }
        },
    });
});

// change an employee status
router.put('/employee/status/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;
    const newStatus = req.body.status; // Assuming the request body contains the new status

    connection.execute({
        sqlText: 'UPDATE EMPLOYEE SET STATUS = :1 WHERE EMPLOYEE_ID = :2',
        binds: [newStatus, employeeId],
        complete: (err, stmt, result) => {
            if (err) {
                console.error('Unable to update employee status', err);
                res.status(500).json({ error: 'Unable to update employee status' });
            } else {
                if (result.rowsAffected && result.rowsAffected === 1) {
                    res.status(200).json({ message: 'Employee status updated successfully' });
                } else {
                    res.status(404).json({ error: 'Employee not found or no changes applied' });
                }
            }
        },
    });
});

// delete an employee
router.delete('/employee/delete/:id', (req, res) => {
    const id = req.params.id;

    connection.execute({
        sqlText: 'DELETE FROM CUSTOMER_ORDER WHERE EMPLOYEE_ID = :1',
        binds: [id],
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