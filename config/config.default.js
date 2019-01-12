'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1547273212852_4903';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

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

  config.httpclient = {
    httpAgent: {
      timeout: 9999999999,
    },
  };

  config.web3_socket = 'wss://mainnet.infura.io/ws';

  config.etherscan_url = 'http://api.etherscan.io/api';
  config.etherscan_key = '5WQKCTS7RDXFNI89136JKE3HKASE6WPZMA';

  return config;
};
