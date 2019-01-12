'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Watcher = app.model.define('watchers', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    blockNumber: STRING(50),
    address: STRING(64),
    score: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return Watcher;
};
