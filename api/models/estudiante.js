'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define('Estudiante', {
    nombre: DataTypes.STRING,
    telefono: DataTypes.STRING,
    dni: DataTypes.STRING,
    carrera: DataTypes.STRING
  }, {});
  Estudiante.associate = function(models) {
    // associations can be defined here
  };
  return Estudiante;
};