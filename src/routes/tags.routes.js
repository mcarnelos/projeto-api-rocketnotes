const { Router } = require("express") //importando o express

const TagsController = require("../controllers/TagsController")//importando o controller
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")//importando o middlewares

const tagsRoutes = Router()

//instanciando objetos
const tagsController = new TagsController()

//get
tagsRoutes.get("/", ensureAuthenticated, tagsController.index)

module.exports = tagsRoutes //exportando para quem quiser usar