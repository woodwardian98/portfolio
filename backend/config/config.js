require('dotenv').config();

const connectionUrl = process.env.DATABASE_URL || `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}`;

const config = {
  url: connectionUrl,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      // rejectUnauthorized: false // For self-signed certs
    }
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};

module.exports = {
  development: config,
  test: config,
  production: config,
};