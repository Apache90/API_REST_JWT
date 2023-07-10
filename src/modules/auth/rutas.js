const express = require("express");
const response = require("../../red/response");
const controller = require("./index");

const router = express.Router();

router.get('/login', login)

async function login(req, res, next) {
    try{
        const token = await controller.login(req.body.usuario, req.body.password);
        response.succes(req,res,token,200);
    }catch(err){
        next(err);
    }
}

module.exports = router;
