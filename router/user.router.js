const express = require("express");
const router =express.Router()
const { signUpUser, getAllUsers, signInUser, getOneUser } = require("../controller/user.cntroller");

router.route("/signUp").post(signUpUser);
router.route("/allUser").get(getAllUsers);
router.route("/oneuser/:userID").get(getOneUser);
router.route("/signin").post(signInUser)

module.exports =router;