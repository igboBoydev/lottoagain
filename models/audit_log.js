var Sequelize = require('sequelize');

var AuditLog = (sequelize, type) => {
  return sequelize.define('audit_logs', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.INTEGER,
    description: Sequelize.STRING,
  })
}

module.exports = AuditLog;