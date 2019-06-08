"use strict";
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    "Album",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      album_type: DataTypes.STRING,
      href: DataTypes.STRING,
      name: DataTypes.STRING,
      release_date: DataTypes.STRING,
      release_date_precision: DataTypes.STRING,
      total_tracks: DataTypes.INTEGER,
      type: DataTypes.STRING,
      uri: DataTypes.STRING
    },
    {
      name: {
        singular: "album",
        plural: "albums"
      }
    }
  );
  Album.associate = function(models) {
    // associations can be defined here
    Album.belongsToMany(models.Artist, { through: "AlbumArtists" });
  };
  return Album;
};
