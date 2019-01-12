'use strict';
const Subscriber = require('./events/index');
module.exports = agent => {
  agent.messenger.on('egg-ready', async () => {
    agent.logger.info('init web3 watcher');
    const ctx = await agent.createAnonymousContext();
    const Op = ctx.app.Sequelize.Op;
    const watchers = await ctx.model.Watcher.findAll({ where: {
      score: {
        [Op.ne]: 100,
      },
    } });

    for (let i = 0; i < watchers.length; i++) {
      const watcher = watchers[i];
      const subsriber = await new Subscriber(agent);
      subsriber.watch(watcher.dataValues.address)
        .then(res => {
          console.log(res);
        }).catch(e => {
          console.log(e);
        });
    }
  });

};
