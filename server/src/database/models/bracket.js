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
      name: { type: DataTypes.STRING, defaultValue: "Untitled Bracket" },
      description: DataTypes.STRING,
      creator: DataTypes.STRING,
      creationState: DataTypes.STRING,
      challongeUrl: DataTypes.STRING,
      challongeId: DataTypes.INTEGER
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
