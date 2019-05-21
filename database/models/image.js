"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      width: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      url: DataTypes.STRING
    },
    {}
  );
  Image.associate = function(models) {
    // Image.belongsTo(models.Track);
  };
  return Image;
};
