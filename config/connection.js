import Sequelize from 'sequelize';
import 'dotenv/config';
import express from 'express';

let sequelize;

// create db connection
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
}
else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306,
    }
  );
}

export default sequelize;
