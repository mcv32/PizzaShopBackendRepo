const snowflake = require('snowflake-sdk');

const options = {
  account: 'mib46406.us-east-1',
  username: 'marcuscv',
  password: 'Welcome123!',
  database: 'PIZZAPIZZA',
  schema: 'PUBLIC',
  warehouse: 'COMPUTE_WH'
};

// 4.2.3 create the connection to the Snowflake account
const connection = snowflake.createConnection(options);
connection.connect((err, conn) => {
  if (err) {
      console.error('Unable to connect to Snowflake', err);
  } else {
      console.log('Connected to Snowflake account ' + options.account);
  }
});

module.exports = connection;