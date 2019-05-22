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
      creator: DataTypes.STRING
    },
    {}
  );
  Bracket.associate = function(models) {
    // associations can be defined here
    Bracket.hasMany(models.Track);
  };
  return Bracket;
};
