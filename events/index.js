'use strict';
const EventEmitter = require('events');
const Web3 = require('web3');

module.exports = class Subscriber extends EventEmitter {
  constructor(ctx) {
    return (async () => {
      super();
      this.ctx = ctx;
      this.provider = await this.getProvider();
      this.web3 = await new Web3(this.provider);
      return this;
    })();
  }

  async watch(address) {
    return new Promise((resolve, reject) => {
      console.log('watching...');
      this.web3.eth.subscribe('logs', { address }, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
  async resetWeb3() {
    this.provider = await this.getProvider();
    this.web3.setProvider(this.provider);
  }

  async getProvider() {
    return new Web3.providers.WebsocketProvider(this.ctx.config.web3_socket);
  }
};
