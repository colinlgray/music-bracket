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
      spotifyId: DataTypes.STRING,
      type: DataTypes.STRING,
      uri: DataTypes.STRING
    },
    {}
  );
  Track.associate = function(models) {
    // associations can be defined here
    Track.hasMany(models.Competitor);
    Track.belongsToMany(models.Artist, { through: "ArtistTracks" });
  };
  return Track;
};
