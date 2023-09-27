'use strict';
module.exports = (sequelize, DataTypes) => {
  const estudiante = sequelize.define('estudiante', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {});
  estudiante.associate = function(models) {
    // associations can be defined here
  };
  return estudiante;
};