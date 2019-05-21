"use strict";
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define(
    "artist",
    {
      href: DataTypes.STRING,
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
    // Artist.belongsTo(Models.Track);
  };
  return Artist;
};
