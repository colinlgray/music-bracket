"use strict";
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    "Track",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      duration: DataTypes.INTEGER,
      explicit: DataTypes.BOOLEAN,
      href: DataTypes.STRING,
      popularity: DataTypes.INTEGER,
      preview_url: DataTypes.STRING,
      type: DataTypes.STRING,
      uri: DataTypes.STRING
    },
    {}
  );
  Track.associate = function(models) {
    // associations can be defined here
    // Track.hasMany(models.Image);
    // Track.hasMany(models.Artist);
  };
  return Track;
};
