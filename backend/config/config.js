require('dotenv').config();
console.log(process.env.DB_NAME)
module.exports={
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "ssl": 'true'
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "sst",
    "password": 'gIQnRpf6CmZVR1ys',
    "database": "sst",
    "host": "13.239.30.115",
    "dialect": "mysql"
  }
}
