"use strict";
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define(
    "Artist",
    {
      href: DataTypes.STRING,
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      uri: DataTypes.STRING
    },
    {
      name: {
        singular: "artist",
        plural: "artists"
      }
    }
  );
  Artist.associate = function(models) {
    Artist.belongsToMany(models.Track, { through: "ArtistTracks" });
    Artist.belongsToMany(models.Album, { through: "AlbumArtists" });
  };
  return Artist;
};