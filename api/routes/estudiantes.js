var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res, next) => {
  models.estudiante.findAll({
    attributes: ["id", "nombre", "apellido", "dni", "id_carrera"],
    include: [{ as: "Estudiante-Carrera", model: models.carrera, attributes: ["id", "nombre"] }],
  }).then((estudiantes) => res.send(estudiantes)).catch((error) => {
    return next(error);
  });
});

router.post("/", (req, res) => {
  models.estudiante
    .create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dni: req.body.dni,
      id_carrera: req.body.id_carrera,
    })
    .then((estudiante) => res.status(201).send({ id: estudiante.id }))
    .catch((error) => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send("Bad request: existe otro estudiante con el mismo DNI");
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
});

const findEstudiante = (id, { onSuccess, onNotFound, onError }) => {
  models.estudiante
    .findOne({
      attributes: ["id", "nombre", "apellido", "dni", "id_carrera"],
      where: { id },
    })
    .then((estudiante) => (estudiante ? onSuccess(estudiante) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findEstudiante(req.params.id, {
    onSuccess: (estudiante) => res.send(estudiante),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = (estudiante) =>
    estudiante
      .update(
        { nombre: req.body.nombre, apellido: req.body.apellido, dni: req.body.dni },
        { fields: ["nombre", "apellido", "dni"] }
      )
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send("Bad request: existe otro estudiante con el mismo DNI");
        } else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`);
          res.sendStatus(500);
        }
      });
  findEstudiante(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = (estudiante) =>
    estudiante
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findEstudiante(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;
