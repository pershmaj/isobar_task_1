const express = require("express");
const controllers = require("./controllers")
const middleware = require("./middleware")

const router = express.Router();

router.post('/login', controllers.login);

router.post('/movies', middleware.isAuth, controllers.movie);

// router.post('/movies', middleware.isAuth, controllers.movieDetail);

module.exports = router;