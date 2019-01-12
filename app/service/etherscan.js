'use strict';

const Service = require('egg').Service;

class EtherscanService extends Service {
  async find(uid) {
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    return user;
  }

  async getTransactions(address, startblock = 0, endblock = 99999999) {
    // http://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a
    // &startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken
    const data = {
      module: 'account',
      action: 'txlist',
      address,
      startblock,
      endblock,
      sort: 'asc',
      apikey: this.config.etherscan_key,
    };

    const requestURI = this.app.config.etherscan_url;
    const response = await this.ctx.curl(requestURI, {
      dataType: 'json',
      data,
      timeout: 50000,
    });

    return response;
  }
}

module.exports = EtherscanService;
