'use strict';

const Controller = require('egg').Controller;
const BigNumber = require('bignumber.js');
class HomeController extends Controller {
  async score() {
    const { data } = this.ctx.request.body;

    this.ctx.model.Watcher.bulkCreate(data);

    this.ctx.body = {
      success: true,
    };
  }

  async getAddressInfo() {
    const address = this.ctx.params.address.toLowerCase();

    const response = await this.ctx.service.etherscan.getTransactions(address);

    if (Number(response.data.status) === 1 && response.data.result.length > 0) {
      const result = response.data.result;
      const transactions = [];
      let cleanIncome = 0;
      let unknownIncome = 0;
      let blackIncome = 0;
      let blackLists = require('../../data.json');
      blackLists = Object.keys(blackLists).map(item => item.toLowerCase());
      const whiteWatchers = this.ctx.model.Watcher.findAll({ where: { score: 0 } }); // 从数据库里拿到所有score等于0的watchers对象
      const blackWatchers = this.ctx.model.Watcher.findAll({ where: { score: 100 } });
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        // 只处理transaction的value大于0的事务
        if (item.value > 0) {
          // 如果是自己发起的事务则不进行处理
          if (item.from.toLowerCase() !== address) {
            const tx = {
              id: item.hash,
              amount: item.value,
            };
            // 过滤所有watchers对象里和当前事务来源地址相同的,用来判断是否是白名单内的数据
            const checkWatchers = whiteWatchers.filter(watcher => {
              return watcher.address.toLowerCase() === item.from.toLowerCase();
            });
            const checkBlackWatchers = blackWatchers.filter(watcher => {
              return watcher.address.toLowerCase() === item.from.toLowerCase();
            });
            // 判断是否在当前黑名单内
            if (checkBlackWatchers.length > 0) {
              blackIncome = new BigNumber(blackIncome).plus(item.value);
              tx.type = 3;
            } else if (checkWatchers.length > 0 || blackLists.includes(item.from.toLowerCase())) { // 如果checkWatchers大于0说明是已知的事务
              cleanIncome = new BigNumber(cleanIncome).plus(item.value);
              tx.type = 2;
            } else {
              unknownIncome = new BigNumber(unknownIncome).plus(item.value);
              tx.type = 1;
            }
            transactions.push(tx);
          }
        }
      }
      console.log(new BigNumber(100).multipliedBy(unknownIncome).dividedBy(new BigNumber(unknownIncome).plus(cleanIncome)));
      const score = blackIncome > 0 ? 100 : new BigNumber(100).multipliedBy(unknownIncome).dividedBy(new BigNumber(unknownIncome).plus(cleanIncome));
      this.ctx.body = {
        score,
        transactions,
      };
    } else {
      this.ctx.body = {
        score: 0,
        transactions: [],
      };
    }
  }
}

module.exports = HomeController;
