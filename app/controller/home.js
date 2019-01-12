'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async score() {
    // this.ctx.validate({
    //   data: { type: 'array', required: true },
    // });
    const { data } = this.ctx.request.body;

    this.ctx.model.Watcher.bulkCreate(data);

    this.ctx.body = {
      success: true,
    };
  }
}

module.exports = HomeController;
