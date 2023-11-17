const express = require('express');
var connection = require('./server.js');
var utils = require('./utils')

const app = express();

// Start the server
const port = 3000
app.listen(port, () => {
    console.log("Server running on port " + port);
});

app.use(express.json())
app.get("/", (req, res, next) => {
  console.log(req.method + ': ' + req.path);
  // 4.2.3 Connect to Snowflake and return query result
  connection.execute({
      sqlText: 'select * from order_detail',
      complete: (err, stmt, rows) => {
          if (err) {
              console.error('Unable to retrieve franchises', err);
              res.status(500).json({ error: 'Unable to retrieve franchises' });
          } else {
              res.status(200).json(rows);
          }
      },
  });
});

// routes
const employee = require('./routes/employee.js')
app.use("/employee", employee);

const customer = require('./routes/customer.js')
app.use("/customer", customer);

const product = require('./routes/product.js')
app.use("/product", product);

const customer_order = require('./routes/customerOrder.js')
app.use("/customerOrder", customer_order);

const order_detail = require('./routes/orderDetail.js')
app.use("/orderDetail", order_detail);