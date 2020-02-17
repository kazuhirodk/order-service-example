require('dotenv').config();

module.exports = {
  development: {
    database: 'books',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || null,
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  test: {
    database: 'books_test',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
