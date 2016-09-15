'use strict';
module.exports = function(sequelize, DataTypes) {
  var Identity = sequelize.define('Identity', {
    provider: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    userInfo: DataTypes.JSONB,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Post.belongsTo(models.User);
      }
    }
  });
  return Identity;
};
