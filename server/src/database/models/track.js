"use strict";
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    "Track",
    {
      id: {
        type: DataTypes.STRING,
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
      uri: DataTypes.STRING
    },
    {
      name: {
        singular: "track",
        plural: "tracks"
      }
    }
  );
  Track.associate = function(models) {
    // associations can be defined here
    Track.hasMany(models.Competitor);
    Track.belongsToMany(models.Artist, { through: "ArtistTracks" });
    Track.belongsToMany(models.Album, { through: "AlbumTracks" });
  };
  return Track;
};
