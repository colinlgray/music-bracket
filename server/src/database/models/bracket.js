"use strict";
module.exports = (sequelize, DataTypes) => {
  const Bracket = sequelize.define(
    "Bracket",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      creator: DataTypes.STRING,
      isStarted: DataTypes.BOOLEAN
    },
    {
      name: {
        singular: "bracket",
        plural: "brackets"
      }
    }
  );
  Bracket.associate = function(models) {
    Bracket.hasMany(models.Competitor);
  };
  return Bracket;
};
