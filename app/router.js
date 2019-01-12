'use strict';
const querystring = require('querystring');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/test', async ctx => {
    const watchers = await ctx.model.Watcher.findAll();
    console.log(watchers.filter(item => {
      return item.address === '1';
    }));
  });

  router.post('/api/score', controller.home.score);

  router.get('/api/:address/info', controller.home.getAddressInfo);
};
