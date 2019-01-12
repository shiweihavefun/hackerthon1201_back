'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/test', async ctx => {

  });

  router.post('/api/score', controller.home.score);

  router.get('/api/:address/info', controller.home.getAddressInfo);
};
