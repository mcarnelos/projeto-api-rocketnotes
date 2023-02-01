const { Router } = require("express") //importando o express
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController")//importando o controller
const UserAvatarController = require("../controllers/UserAvatarController")//importando o controller
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")//importando o middlewares

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

//instanciando objetos
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

/* POST */
usersRoutes.post("/", usersController.create)
/* PUT */
usersRoutes.put("/", ensureAuthenticated, usersController.update)
/* PATCH */
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes //exportando para quem quiser usar