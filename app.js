const express = require('express');
var connection = require('./server.js');
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

const employee = require('./routes/employee.js')
app.use("/employee", employee);


 /* console.log('Connected to Snowflake!');
  // You can now execute SQL queries using `conn`
  // For example:
  conn.execute({
    sqlText: 'SELECT * from order_detail',
    complete: (err, stmt, rows) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        return;
      }
      console.log('Query result:', rows);
    },
  });

  conn.execute({
    sqlText: 'SELECT order_id, customer_id, sum(price_charged) as total_price from order_detail group by order_id, customer_id',
    complete: (err, stmt, rows) => {
      if (err) {
        console.error('Error executing SQL query: ' + err.message);
        return;
      }
      console.log('Query result:', rows);
    },
  });
});
*/