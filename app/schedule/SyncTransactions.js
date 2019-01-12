'use strict';

const Subscription = require('egg').Subscription;

class SyncTransactions extends Subscription {

  static get schedule() {
    return {
      interval: '1m', // 表示一分钟执行一次
      type: 'all',
    };
  }
  async subscribe() {
    const watchers = await this.ctx.model.Watcher.findAll({
      where: {
        score: 0,
      },
    });
    for (let i = 0; i < watchers.length; i++) {
      const watcher = watchers[i];
      await this.getTransactions(watcher.dataValues.address, watcher.dataValues.blockNumber);
    }

  }

  async getTransactions(address, startblock = 0) {
    const data = {
      address,
      module: 'account',
      action: 'txlist',
      startblock,
      endblock: 99999999,
      page: 1,
      offset: 50,
      sort: 'sort',
      apikey: this.app.config.etherscan_key,
    };

    const requestURI = this.app.config.etherscan_url;

    const response = await this.ctx.curl(requestURI, {
      dataType: 'json',
      data,
    });

    let whiteLists = require('../../data.json');
    whiteLists = Object.keys(whiteLists).map(item => item.toLowerCase());

    if (Number(response.data.status) === 1 && response.data.result.length > 0) {
      for (let i = 0; i < response.data.result.length; i++) {
        const item = response.data.result[i];
        if (!whiteLists.includes(item.from.toLowerCase()) && item.from.toLowerCase() === address.toLowerCase()) {
          console.log('在白名单里');
          await this.ctx.model.Watcher.destroy({ where: {
            address,
          } });
          break;
        }

        if (i === response.data.result.length - 1) {
          await this.ctx.model.Watcher.update({
            blockNumber: response.data.result.blockNumber,
          }, { where: {
            address,
          } });
        }

      }
    }
  }

  async getTransactionCount(address) {
    const data = {
      address,
      module: 'proxy',
      action: 'eth_getTransactionCount',
      tag: 'latest',
      apikey: this.app.config.etherscan_key,
    };

    const requestURI = this.app.config.etherscan_url;

    const response = await this.ctx.curl(requestURI, {
      dataType: 'json',
      data,
    });

    return response;
  }
}

module.exports = SyncTransactions;
