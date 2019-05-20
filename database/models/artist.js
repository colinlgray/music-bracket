"use strict";
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define(
    "artist",
    {
      href: DataTypes.STRING,
      id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: false },
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      uri: DataTypes.STRING
    },
    {}
  );
  Artist.associate = function(models) {
    // associations can be defined here
  };
  return Artist;
};
