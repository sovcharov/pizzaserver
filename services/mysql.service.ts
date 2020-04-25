import * as mysql from 'mysql';
import { MySqlConnection } from './../../serverconfig/dbconnectmysqlnode';
let mySqlConnection = new MySqlConnection;

export class MySqlService {

  constructor() {

  }

  getMenu(callback) {
    let items = [];
    let error: any = false;
    let query = `call getMenu();`;

    let connection = mysql.createConnection(mySqlConnection);
    let request = connection.query(query);

    request
      .on('error', function(err) {
        error = err;
      })
      .on('result', function(row) {
        items[items.length] = row;
      })
      .on('end', function() {
        if (error) {
          callback({result: false, error: error});
        } else {
          items.splice(items.length - 1, 1);
          callback({result: true, data: items});
        };
      });
    connection.end();
  }

  getOrders(user, callback) {
    let items = [];
    let error: any = false;
    let query = `call getOrders('${user}');`;

    let connection = mysql.createConnection(mySqlConnection);
    let request = connection.query(query);

    request
      .on('error', function(err) {
        error = err;
      })
      .on('result', function(row) {
        items[items.length] = row;
      })
      .on('end', function() {
        if (error) {
          callback({result: false, error: error});
        } else {
          items.splice(items.length - 1, 1);
          callback({result: true, data: items});
        };
      });
    connection.end();
  }

  getOrder(order, callback) {
    let items = [];
    let error: any = false;
    let query = `call getOrder('${order}');`;

    let connection = mysql.createConnection(mySqlConnection);
    let request = connection.query(query);

    request
      .on('error', function(err) {
        error = err;
      })
      .on('result', function(row) {
        items[items.length] = row;
      })
      .on('end', function() {
        if (error) {
          callback({result: false, error: error});
        } else {
          items.splice(items.length - 1, 1);
          callback({result: true, data: items});
        };
      });
    connection.end();
  }

  saveOrder(order, callback) {
    let items = [];
    let error: any = false;
    let query = `call saveOrder('${order.user}', '${order.currecny}', '${order.usdPerCurrency}', '${order.amountPaid}', '${order.shippingCost}', '${order.address}', '${order.phone}');`;

    let connection = mysql.createConnection(mySqlConnection);
    let request = connection.query(query);

    request
      .on('error', function(err) {
        error = err;
      })
      .on('result', function(row) {
        items[items.length] = row;
      })
      .on('end', function() {
        if (error) {
          callback({result: false, error: error});
        } else {
          items.splice(items.length - 1, 1);
          callback({result: true, data: items});
        };
      });
    connection.end();
  }

  saveOrderItem(item, orderid, callback) {
    let items = [];
    let error: any = false;
    let query = `call saveOrderItem('${item}');`;

    let connection = mysql.createConnection(mySqlConnection);
    let request = connection.query(query);

    request
      .on('error', function(err) {
        error = err;
      })
      .on('result', function(row) {
        items[items.length] = row;
      })
      .on('end', function() {
        if (error) {
          callback({result: false, error: error});
        } else {
          items.splice(items.length - 1, 1);
          callback({result: true, data: items});
        };
      });
    connection.end();
  }
}
