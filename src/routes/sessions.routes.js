const { Router } = require("express") //importando o express

const SessionsController = require("../controllers/SessionsController") //importando o controller
const sessionsController = new SessionsController() //instancia um novo obj que será armazenado no sessionsController

const sessionsRoutes = Router()
//post
sessionsRoutes.post("/", sessionsController.create)

module.exports = sessionsRoutes //exportando o sessionsRoutes