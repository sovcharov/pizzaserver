# pizzaserver

To try app go to http://52.23.88.1:3339

To install on your machine do following steps:

Assuming you have following installed ob your machine:
ts-node, npm, mysql server.

### Config files folder placed in the same folder where folder with cloned project will be placed.
Name of config files folder: serverconfig

Name of node config file: mynodeconfig.ts
Content:
export class MyNodeConfig {
  public serverPort: number;
  public secure?: boolean;
  public allowedOrigins: string[];
  public xlServiceUrl?: string;
  constructor(){
    this.serverPort = 3339;
    this.allowedOrigins = ['http://localhost:4200', 'http://52.23.88.1:3339'];
  }
}
Add your origin in to allowdOrigins!

Name of MySQL config file: dbconnectmysqlnode.ts
export class MySqlConnection {
  host = 'host';//put you ip or hostname where you MySQL server located
  user = 'user';//put user allowed to access server and db
  password = 'password';//put password
  database = 'pizza';//db
}

### Import db to you MySQL server from file in this repository: db/pizza.sql

###To install app:

git clone 'https://github.com/yahooserg/pizzaserver.git'

npm install

To start:

ts-node pizza.ts

Now you should be able to run you browser and go to: http://yourhost.com:3339

Remember: you server will run on port 3339, you can not change port otherwise your static Angular app won't work.
If you wish to change the port number, you'll have to build angular app with different config, place built into static folder, then change port of this node app in config.
