"use strict";
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    "Track",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      duration: DataTypes.INTEGER,
      explicit: DataTypes.BOOLEAN,
      href: DataTypes.STRING,
      popularity: DataTypes.INTEGER,
      preview_url: DataTypes.STRING,
      type: DataTypes.STRING,
      uri: DataTypes.STRING,
      index: DataTypes.INTEGER
    },
    {}
  );
  Track.associate = function(models) {
    // associations can be defined here
    Track.hasMany(models.Image);
    Track.hasMany(models.Artist);
  };
  return Track;
};
