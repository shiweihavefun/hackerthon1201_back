'use strict';
const querystring = require('querystring');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/test', async ctx => {
    await app.runSchedule('SyncTransactions');

  });

  router.post('/api/score', controller.home.score);
};
