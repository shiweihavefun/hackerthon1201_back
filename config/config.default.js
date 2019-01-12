'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1547273212852_4903';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    host: '47.88.156.161',
    port: 3306,
    database: 'hackathon',
    username: 'root',
    password: 'hackathon',
    define: {
      freezeTableName: true,
      underscored: true,
    },
  };

  config.web3_socket = 'wss://rinkeby.infura.io/ws';

  return config;
};
