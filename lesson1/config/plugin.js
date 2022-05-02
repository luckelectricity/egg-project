'use strict'

const path = require('path')

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  auth: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-auth'),
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
}
