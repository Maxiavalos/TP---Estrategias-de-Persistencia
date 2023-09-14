var express = require("express");
var router = express.Router();
var models = require("../models/estudiante");

// Función para encontrar un estudiante por ID
const findEstudiante = (id, { onSuccess, onNotFound, onError }) => {
  models.estudiante
    .findOne({
      attributes: ["id", "nombre", "telefono", "dni", "carrera"],
      where: { id }
    })
    .then(estudiante => (estudiante ? onSuccess(estudiante) : onNotFound()))
    .catch(() => onError());
};

// GET - Obtener todos los estudiantes
router.get("/", (req, res) => {
  models.estudiante
    .findAll({
      attributes: ["id", "nombre", "telefono", "dni", "carrera"]
    })
    .then(estudiantes => res.send(estudiantes))
    .catch(() => res.sendStatus(500));
});

// POST - Crear un nuevo estudiante
router.post("/", (req, res) => {
  models.estudiante
    .create({
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      dni: req.body.dni,
      carrera: req.body.carrera
    })
    .then(estudiante => res.status(201).send({ id: estudiante.id }))
    .catch(error => {
      console.log(`Error al intentar insertar en la base de datos: ${error}`);
      res.sendStatus(500);
    });
});

// GET - Obtener un estudiante por ID
router.get("/:id", (req, res) => {
  findEstudiante(req.params.id, {
    onSuccess: estudiante => res.send(estudiante),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

// PUT - Actualizar un estudiante por ID
router.put("/:id", (req, res) => {
  const onSuccess = estudiante =>
    estudiante
      .update(
        {
          nombre: req.body.nombre,
          telefono: req.body.telefono,
          dni: req.body.dni,
          carrera: req.body.carrera
        },
        { fields: ["nombre", "telefono", "dni", "carrera"] }
      )
      .then(() => res.sendStatus(200))
      .catch(error => {
        console.log(`Error al intentar actualizar la base de datos: ${error}`);
        res.sendStatus(500);
      });
  findEstudiante(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

// DELETE - Eliminar un estudiante por ID
router.delete("/:id", (req, res) => {
  const onSuccess = estudiante =>
    estudiante
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findEstudiante(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
