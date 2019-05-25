"use strict";
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define(
    "Artist",
    {
      href: DataTypes.STRING,
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      uri: DataTypes.STRING,
      spotifyId: DataTypes.STRING
    },
    {}
  );
  Artist.associate = function(models) {
    Artist.belongsTo(models.Track);
  };
  return Artist;
};
