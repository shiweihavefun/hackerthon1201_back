'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/test', async ctx => {
    ctx.model.Watcher.create({
      address: '0x000000',
      score: 0,
    });
  });
};
