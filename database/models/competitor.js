"use strict";
module.exports = (sequelize, DataTypes) => {
  const Competitor = sequelize.define(
    "Competitor",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      index: {
        type: DataTypes.INTEGER
      },
      roundsWon: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  Competitor.associate = function(models) {
    // associations can be defined here
    Competitor.belongsTo(models.Bracket);
    Competitor.belongsTo(models.Track);
  };
  return Competitor;
};
