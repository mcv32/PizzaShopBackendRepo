
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
// Define other routes for CRUD operations...

module.exports = router;















/*const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Define routes for Employee table
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.createEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;*/