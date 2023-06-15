const express = require("express");
const { registerUser, loginUser } = require("../Controller/Controller");
const router = express.Router();

router.use(express.urlencoded({extended:true}));
router.use(express.json());


router.post("/register/user",registerUser);
router.post("/login/user",loginUser);

module.exports = router;