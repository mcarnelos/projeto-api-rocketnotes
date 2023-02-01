const { Router } = require("express") //importando o express

const NotesController = require("../controllers/NotesController")//importando o controller
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")//importando o middlewares

const notesRoutes = Router()

//instanciando objetos
const notesController = new NotesController()

//passa o middleware de autenticação para todos os verbos http
notesRoutes.use(ensureAuthenticated)

//get
notesRoutes.get("/", notesController.index)
/* POST */
notesRoutes.post("/", notesController.create)
//GET
notesRoutes.get("/:id", notesController.show)
//delete
notesRoutes.delete("/:id", notesController.delete)


module.exports = notesRoutes //exportando para quem quiser usar