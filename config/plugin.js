'use strict';

// had enabled by egg
// exports.static = true;
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.security = {
  domainWhiteList: [ '*' ],
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
