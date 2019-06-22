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
      imageUrl: {
        type: DataTypes.STRING
      },
      roundsWon: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING
      },
      spotifyId: {
        type: DataTypes.STRING
      }
    },
    {
      name: {
        singular: "competitor",
        plural: "competitors"
      }
    }
  );
  Competitor.associate = function(models) {
    // associations can be defined here
    Competitor.belongsTo(models.Bracket);
  };
  return Competitor;
};
