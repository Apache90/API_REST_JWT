const express = require("express");
const response = require("../../red/response");
const controller = require("./index");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", add);
router.delete("/", del);

async function getAll(req, res, next) {
  try {
    const items = await controller.getAll();
    response.succes(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  try {
    const items = await controller.get(req.params.id);
    response.succes(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function add(req, res, next) {
  try {
    const items = await controller.add(req.body);
    if (req.body.id == 0) {
      mensaje = "Item Agregado";
    } else {
      mensaje = "Item Actualizado";
    }
    response.succes(req, res, mensaje, 201);
  } catch (err) {
    next(err);
  }
}

async function del(req, res, next) {
  try {
    const items = await controller.del(req.body);
    response.succes(req, res, "Item Eliminado", 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
