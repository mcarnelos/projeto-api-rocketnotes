//agrupa todas as rotas em um único arquivo
const { Router } = require("express")

const usersRouter = require("./users.routes")
const notesRouter = require("./notes.routes")
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router()

routes.use("/users", usersRouter)//sempre que for acessar o /users vai ser redirecionado para o usersRouter
routes.use("/notes", notesRouter)//sempre que for acessar o /notes vai ser redirecionado para o notesRouter
routes.use("/tags", tagsRouter)//sempre que for acessar o /tags vai ser redirecionado para o tagsRouter
routes.use("/sessions", sessionsRouter)//sempre que for acessar o /sessions vai ser redirecionado para o sessionsRouter

module.exports = routes //exportando o routes que contem todas as rotas da aplicação